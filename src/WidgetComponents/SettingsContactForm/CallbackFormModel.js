import {
    createEffect, createEvent, createStore, sample,
} from 'effector';
import Request from '../../helpers/Request';

export default class CallbackFormModel {
    constructor({
        successText = '',
        failText = '',
        sendButtonText = '',
        phoneFieldPlaceholder = '',
        url = '',
        extraRequestData = {},
    }) {
        this.successText = createStore(successText);
        this.failText = createStore(failText);
        this.sendButtonText = createStore(sendButtonText);
        this.phoneFieldPlaceholder = createStore(phoneFieldPlaceholder);

        this.formPhoneValue = createStore('');
        this.formSentSuccessfully = createStore(false);
        this.formSentWithError = createStore(false);

        sample({
            source: this.formSentSuccessfully,
            filter: (successfulState) => successfulState,
            fn: () => false,
            target: [this.formSentWithError, this.failText],
        });

        sample({
            source: this.formSentWithError,
            filter: (errorState) => errorState,
            fn: () => false,
            target: this.formSentSuccessfully,
        });

        this.onFormSubmitted = createEvent();
        this.onChangePhoneInput = createEvent();

        this.formPhoneValue.on(this.onChangePhoneInput, (prev, e) => e.currentTarget.value);

        this.sendFormFxHandler = async (phone) => {
            const resultParams = {
                ...extraRequestData,
                phone,
            };
            Request.post(url, resultParams);
        };

        this.sendFormFx = createEffect(this.sendFormFxHandler);

        sample({
            clock: this.onFormSubmitted,
            source: this.formPhoneValue,
            target: this.sendFormFx,
        });

        sample({
            clock: this.sendFormFx.doneData,
            fn: () => true,
            target: this.formSentSuccessfully,
        });

        sample({
            clock: this.sendFormFx.failData,
            fn: () => true,
            target: this.formSentWithError,
        });

        this.onFormSubmitted.watch((e) => e.preventDefault());
    }
}
