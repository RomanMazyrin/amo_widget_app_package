import SettingsPanelHelpers from '../../helpers/SettingsPanelHelpers';
import TemplateRenderHelpers from '../../helpers/TemplateRenderHelpers';
import WidgetLifecycleEvents from '../../WidgetLifecycleEvents';
import WidgetComponent from '../WidgetComponent';
import SettingsFooterView from './SettingsFooterView';

export default class SettingsFooterComponent extends WidgetComponent {
    constructor(widget, config) {
        super(widget);
        this.config = config;
    }

    getWidgetEventsCallbacks() {
        return {
            [WidgetLifecycleEvents.EVENT_SETTINGS]: this.settings.bind(this),
        };
    }

    settings() {
        const renderedConfig = TemplateRenderHelpers.deepRenderObjectWithWidgetData(
            this.config,
            this.widget,
        );

        SettingsPanelHelpers.appentReactComponent(
            '#widget_settings__fields_wrapper',
            SettingsFooterView,
            renderedConfig,
            'widget-footer',
        );
    }
}
