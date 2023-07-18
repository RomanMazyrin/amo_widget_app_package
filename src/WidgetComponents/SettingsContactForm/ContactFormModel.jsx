import React from 'react';
import ButtonsListView from '../../buttons/ButtonsListView';
import CallbackFormModel from './CallbackFormModel';
import CallbackFormView from './CallbackFormView';
import ContactButtonModelsFactory from './ContactButtonModelsFactory';
import TitleView from './TitleView';

export default class ContactFormModel {
    constructor({ text = null, contactButtons = [], callbackForm = {} } = {}) {
        if (text) {
            this.TitleView = <TitleView text={text} />;
        }
        if (contactButtons) {
            const contactsButtonsListFactory = new ContactButtonModelsFactory();
            const buttonsList = contactsButtonsListFactory.createFromConfigsArray(contactButtons);
            this.ContactButtonsView = <ButtonsListView buttons={buttonsList} />;
        }
        if (callbackForm) {
            const callbackFormModel = new CallbackFormModel(callbackForm);
            this.CallbackFormView = <CallbackFormView model={callbackFormModel} />;
        }
    }
}
