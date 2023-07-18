import WidgetLifecycleEvents from '../../WidgetLifecycleEvents';
import WidgetComponent from '../WidgetComponent';
import PhoneField from './PhoneField';

export default class SettingsPhoneFieldComponent extends WidgetComponent {
    constructor(widget, { langPath = null, phoneFieldOpts = {}, phoneFieldName = 'phone' } = {}) {
        super(widget);
        this.langPath = langPath ?? 'components.settings_phone_field';
        this.phoneFieldOpts = phoneFieldOpts;
        this.phoneFieldName = phoneFieldName;
    }

    getWidgetEventsCallbacks() {
        return {
            [WidgetLifecycleEvents.EVENT_SETTINGS]: this.settings.bind(this),
        };
    }

    settings() {
        const buttonsListArray = document.querySelectorAll('.install-widget__button, .js-widget-save');
        const phoneInput = document.querySelector(`.widget_settings_block__controls__[name='${this.phoneFieldName}']`);
        if (!phoneInput) {
            return;
        }
        const phoneField = new PhoneField(
            phoneInput,
            this.phoneFieldOpts,
            {
                errorMsg: this.widget.i18n(`${this.langPath}.need_to_fill`),
                errorInputStyle: {
                    border: 'solid red 1px',
                },
            },
        );

        buttonsListArray.forEach((button) => {
            button.addEventListener('click', (e) => {
                const isPhoneValid = phoneField.validate();
                if (!isPhoneValid) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                return true;
            });
        });
    }
}
