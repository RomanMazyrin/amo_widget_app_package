import BackendClient from '../../BackendClient';
import BaseApp from '../BaseApp';
import PhoneField from '../components/PhoneField';
import HelpForm from '../components/widget-settings-panel/description/HelpForm';
import HelpFormModel from '../components/widget-settings-panel/description/HelpFormModel';
import AppStatusManager from './AppStatusManager';
import SubscritionStatusInfoModel from './react-components/settings-description/models/SubscritionStatusInfoModel';
import SubscriptionStatusInfo from './react-components/settings-description/SubscriptionStatusInfo';

export default class SubscriptionApp extends BaseApp {
    constructor(widget, {
        integrationBaseUrl, ...base
    }) {
        super(widget, { ...base });

        this.backendClient = new BackendClient(integrationBaseUrl, this.amoDomain);
        this.appStatusManager = new AppStatusManager(this.backendClient);

        this.appStatusManager.$appStatus.watch((subscriptionStatus) => {
            if (subscriptionStatus) {
                if (subscriptionStatus.getIsExpired()) {
                    this.notificator.showMessage(
                        'error',
                        this.renderStatusInfo(subscriptionStatus),
                    );
                }
                if (!subscriptionStatus.getIsDataFilled()) {
                    this.notificator.showMessage(
                        'error',
                        this.i18n('errors.need_to_fill_settings_error'),
                    );
                }
            }
        });

        this.helpFormModel = new HelpFormModel({
            backendClient: this.backendClient,
            successText: this.i18n('settings_panel.help_form.success_msg'),
            submitButtonText: this.i18n('settings_panel.help_form.submit_button_text'),
            titleText: this.i18n('settings_panel.help_form.title_text'),
            contacts: this.i18n('settings_panel.help_form.contacts'),
        });

        this.subscriptionStatusInfoModel = new SubscritionStatusInfoModel({
            $subscriptionStatus: this.appStatusManager.$appStatus,
            expiredText: this.i18n('subscription_status_messages.subscription_info_model.expired_text'),
            notExpiredText: this.i18n('subscription_status_messages.subscription_info_model.not_expired_text'),
            renderStatusInfo: this.renderStatusInfo.bind(this),
        });

        this.settingsDescriptionModel.setExtraComponents([
            { Component: HelpForm, model: this.helpFormModel },
            { Component: SubscriptionStatusInfo, model: this.subscriptionStatusInfoModel },
        ]);

        this.appStatusManager.fetchStatusFx();
    }

    bindSaveButtonsClickHandlers(buttonsList, phoneFieldOpts = {}) {
        const buttonsListArray = buttonsList instanceof NodeList ? buttonsList : [buttonsList];

        const phoneField = new PhoneField(document.querySelector(".widget_settings_block__controls__[name='phone']"), phoneFieldOpts, {
            errorMsg: this.i18n('errors.need_to_fill_phone_field'),
            errorInputStyle: {
                border: 'solid red 1px',
            },
        });

        buttonsListArray.forEach((button) => {
            button.addEventListener('click', (e) => {
                const isPhoneValid = phoneField.validate();

                if (!isPhoneValid) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                const data = {};
                document.querySelectorAll('#widget_settings__fields_wrapper input').forEach((input) => {
                    data[input.getAttribute('name')] = input.value;
                });

                data.email = data.amouser;
                data.phone = phoneField.getNumber();

                this.backendClient.post('save-settings', data).finally(this.fetchAppStatusFx);

                return true;
            });
        });
    }

    async runIfStatusOk(callback) {
        const canBeRan = await this.appStatusManager.getCanAppBeRun();
        if (canBeRan) {
            callback();
        }
    }

    run() {
        this.runIfStatusOk(() => {
            this.callbacks.run(this);
        });
    }

    renderSettings() {
        if (this.callbacks.settings) {
            this.callbacks.settings(this);
        }
    }

    digitalPipeline() {
        if (this.callbacks.dpSettings) {
            this.callbacks.dpSettings(this);
        }
    }

    renderEntityTab() {
        if (this.callbacks.tab) {
            this.callbacks.tab(this);
        }
    }

    renderBaseSettings() {
        super.renderBaseSettings();
        this.bindSaveButtonsClickHandlers(document.querySelectorAll('.install-widget__button, .js-widget-save'), {
            initialCountry: 'RU',
            preferredCountries: ['RU', 'UA', 'BY', 'KZ'],
        });
    }

    renderStatusInfo(subscriptionStatus) {
        return this.renderTmpl(
            subscriptionStatus.getStatusText(),
            this.i18n('subscription_status_messages'),
        );
    }
}
