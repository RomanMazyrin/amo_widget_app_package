import React from 'react';
import PropTypes from 'prop-types';
import ContactFormModel from './ContactFormModel';

function ContactFormView({ model }) {
    const { TitleView, ContactButtonsView, CallbackFormView } = model;
    const componentContainerStyle = {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#8e44ad',
        width: '100%',
        boxSizing: 'border-box',
    };

    return (
        <div style={componentContainerStyle}>
            {TitleView || null}
            {ContactButtonsView || null}
            {CallbackFormView || null}
        </div>
    );
}

ContactFormView.propTypes = {
    model: PropTypes.instanceOf(ContactFormModel).isRequired,
};

export default ContactFormView;
