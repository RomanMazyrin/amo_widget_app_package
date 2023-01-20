import {
    createEffect, createEvent, createStore, sample,
} from 'effector';

export default class HelpFormModel {
    constructor({
        titleText = '',
        submitButtonText = '',
        successText = '',
        contacts = {},
        extraRequestData = {},
        backendClient,
    }) {
        this.titleText = createStore(titleText);
        this.contacts = createStore(contacts);
        this.submitButtonText = createStore(submitButtonText);
        this.extraRequestData = extraRequestData;
        this.formPhoneValue = createStore('');
        this.backendClient = backendClient;

        this.successText = createStore(successText);
        this.errorText = createStore(null);
        this.formSentSuccessfully = createStore(false);
        this.formSentWithError = createStore(false);

        sample({
            source: this.formSentSuccessfully,
            filter: (successfulState) => successfulState,
            fn: () => false,
            target: [this.formSentWithError, this.errorText],
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
            const response = await this.backendClient.post('help-order', {
                ...this.extraRequestData,
                phone,
            });
            return response;
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

        this.errorText.on(this.sendFormFx.failData, () => 'Error...');

        this.onFormSubmitted.watch((e) => e.preventDefault());
    }
}
