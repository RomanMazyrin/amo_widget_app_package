import SettingsPanelHelpers from '../../helpers/SettingsPanelHelpers';
import TemplateRenderHelpers from '../../helpers/TemplateRenderHelpers';
import WidgetLifecycleEvents from '../../WidgetLifecycleEvents';
import WidgetComponent from '../WidgetComponent';
import ButtonModelFactory from '../../buttons/ButtonModelFactory';
import ButtonsListView from '../../buttons/ButtonsListView';

export default class SettingsButtonsComponent extends WidgetComponent {
    constructor(widget, { buttons = [] } = {}) {
        super(widget);
        this.buttons = buttons;
        this.buttonModelsFactoryClass = new ButtonModelFactory(this.widget);
    }

    getWidgetEventsCallbacks() {
        return {
            [WidgetLifecycleEvents.EVENT_SETTINGS]: this.settings.bind(this),
        };
    }

    settings() {
        const renderedButtonsConfig = TemplateRenderHelpers.deepRenderObjectWithWidgetData(
            this.buttons,
            this.widget,
        );
        const props = {
            buttons: this.buttonModelsFactoryClass.createFromConfigsArray(renderedButtonsConfig),
        };
        SettingsPanelHelpers.appendReactComponentInDescriptionBlock(ButtonsListView, props, 'action-buttons');
    }
}
