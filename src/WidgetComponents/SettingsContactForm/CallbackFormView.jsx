import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useStore } from 'effector-react';
import CallbackFormModel from './CallbackFormModel';

function CallbackFormView({ model }) {
    const successText = useStore(model.successText);
    const failText = useStore(model.failText);
    const phoneFieldPlaceholder = useStore(model.phoneFieldPlaceholder);
    const formPhoneValue = useStore(model.formPhoneValue);

    const sendButtonText = useStore(model.sendButtonText);

    const isFormPending = useStore(model.sendFormFx.pending);
    const formSentSuccessfully = useStore(model.formSentSuccessfully);
    const formSentWithError = useStore(model.formSentWithError);

    const formContainerStyle = {
        display: 'block',
        textAlign: 'center',
        marginTop: '10px',
        width: '350px',
    };

    const formStyle = {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        width: '100%',
    };

    const submitButtonStyle = {
        background: isFormPending ? '' : 'yellow',
        width: '40%',
    };

    const formInputStyle = {
        width: '60%',
    };

    const submitButtonClassNames = classNames({
        'button-input': true,
        'button-input-disabled': isFormPending,
    });

    const formMessageStyle = {
        fontWeight: '900',
        padding: '10px',
        width: '200px',
        display: 'inline-block',
        marginTop: '10px',
        color: 'white',
    };

    const errorMessageStyle = {
        ...formMessageStyle,
        background: 'red',
    };

    const successMessageStyle = {
        ...formMessageStyle,
        background: '#27ae60',
    };

    return (
        <div style={formContainerStyle}>
            { formSentSuccessfully ? (
                <div style={successMessageStyle}>
                    {successText}
                </div>
            )
                : (
                    <form onSubmit={model.onFormSubmitted} style={formStyle}>
                        <input type="text" className="text-input" style={formInputStyle} name="phone" placeholder={phoneFieldPlaceholder} onChange={model.onChangePhoneInput} value={formPhoneValue} />
                        <button className={submitButtonClassNames} style={submitButtonStyle} type="submit" disabled={isFormPending}>{sendButtonText}</button>
                    </form>
                )}

            { formSentWithError
                ? (
                    <div style={errorMessageStyle}>
                        {failText}
                    </div>
                )
                : null}
        </div>
    );
}

CallbackFormView.propTypes = {
    model: PropTypes.instanceOf(CallbackFormModel).isRequired,
};

export default CallbackFormView;
