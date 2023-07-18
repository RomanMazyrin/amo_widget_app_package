import SettingsPanelHelpers from '../../helpers/SettingsPanelHelpers';
import TemplateRenderHelpers from '../../helpers/TemplateRenderHelpers';
import WidgetLifecycleEvents from '../../WidgetLifecycleEvents';
import WidgetComponent from '../WidgetComponent';
import ContactFormModel from './ContactFormModel';
import ContactFormView from './ContactFormView';

export default class SettingsContactFormComponent extends WidgetComponent {
    constructor(widget, contactFormConfig) {
        super(widget);
        this.contactFormConfig = contactFormConfig;
    }

    getWidgetEventsCallbacks() {
        return {
            [WidgetLifecycleEvents.EVENT_SETTINGS]: this.settings.bind(this),
        };
    }

    settings() {
        const renderedConfig = TemplateRenderHelpers.deepRenderObjectWithWidgetData(
            this.contactFormConfig,
            this.widget,
        );

        if (renderedConfig.callbackForm) {
            renderedConfig.callbackForm.extraRequestData = {
                ...this.widget.system(),
                amo_subdomain: this.widget.system().domain,
                ...(renderedConfig.callbackForm.extraRequestData ?? {}),
            };
        }

        const props = {
            model: new ContactFormModel(renderedConfig),
        };
        SettingsPanelHelpers.appendReactComponentInDescriptionBlock(ContactFormView, props, 'contact-form');
    }
}
