import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useStore } from 'effector-react';
import HelpFormModel from './HelpFormModel';

function HelpForm({ model }) {
    const successText = useStore(model.successText);
    const errorText = useStore(model.errorText);
    const titleText = useStore(model.titleText);
    const contacts = useStore(model.contacts);
    const formPhoneValue = useStore(model.formPhoneValue);

    const contactPhone = contacts.phone ? contacts.phone : null;
    const contactTelegram = contacts.telegram ? contacts.telegram : null;

    const submitButtonText = useStore(model.submitButtonText);

    const isFormPending = useStore(model.sendFormFx.pending);
    const formSentSuccessfully = useStore(model.formSentSuccessfully);
    const formSentWithError = useStore(model.formSentWithError);

    const componentContainerStyle = {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#8e44ad',
    };

    const titleStyle = {
        color: 'white',
        marginBottom: '10px',
        fontWeight: '900',
    };

    const contactButtonsContainerStyle = {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    };

    const contactButtonStyle = {
        margin: '5px 0',
        width: '100%',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
    };

    const telegramContactButtonStyle = {
        ...contactButtonStyle,
        background: '#28a3e2',
        color: 'white',
        border: 'none',
    };

    const formContainerStyle = {
        display: 'block',
        textAlign: 'center',
        marginTop: '10px',
        width: '100%',
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

    const contactsActionsStyle = {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
    };

    return (
        <div style={componentContainerStyle}>
            <div style={titleStyle}>
                {titleText}
            </div>

            <div style={contactsActionsStyle}>
                <div style={contactButtonsContainerStyle}>
                    {contactPhone ? <a href={`tel:${contactPhone}`} target="_blank" rel="noreferrer" style={{ width: '100%' }}><button style={contactButtonStyle} className="button-input" type="button">{contactPhone}</button></a> : null}
                    {contactTelegram ? <a href={`https://t.me/${contactTelegram.username}`} target="_blank" rel="noreferrer" style={{ width: '100%' }}><button type="button" style={telegramContactButtonStyle} className="button-input">{contactTelegram.label}</button></a> : null}
                </div>

                <div style={formContainerStyle}>
                    { formSentSuccessfully ? (
                        <div style={successMessageStyle}>
                            {successText}
                        </div>
                    )
                        : (
                            <form onSubmit={model.onFormSubmitted} style={formStyle}>
                                <input type="text" className="text-input" style={formInputStyle} name="phone" placeholder="+7 (999) 555-55-55" onChange={model.onChangePhoneInput} value={formPhoneValue} />
                                <button className={submitButtonClassNames} style={submitButtonStyle} type="submit" disabled={isFormPending}>{submitButtonText}</button>
                            </form>
                        )}

                    { formSentWithError
                        ? (
                            <div style={errorMessageStyle}>
                                {errorText}
                            </div>
                        )
                        : null}
                </div>
            </div>
        </div>
    );
}

HelpForm.propTypes = {
    model: PropTypes.instanceOf(HelpFormModel).isRequired,
};

export default HelpForm;
