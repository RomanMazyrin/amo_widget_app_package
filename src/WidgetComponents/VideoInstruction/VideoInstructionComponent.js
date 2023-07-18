import SettingsPanelHelpers from '../../helpers/SettingsPanelHelpers';
import WidgetLifecycleEvents from '../../WidgetLifecycleEvents';
import WidgetComponent from '../WidgetComponent';
import VideoInstructionView from './VideoInstructionView';

export default class VideoInstructionComponent extends WidgetComponent {
    constructor(widget, { langPath = null } = {}) {
        super(widget);
        this.langPath = langPath ?? 'components.video_instruction';
    }

    getWidgetEventsCallbacks() {
        return {
            [WidgetLifecycleEvents.EVENT_SETTINGS]: this.settings.bind(this),
        };
    }

    settings(eventName, widget) {
        const props = {
            link: widget.i18n(`${this.langPath}.link`),
            title: widget.i18n(`${this.langPath}.title`),
        };
        SettingsPanelHelpers.appendReactComponentInDescriptionBlock(VideoInstructionView, props, 'video-instruction');
    }
}
