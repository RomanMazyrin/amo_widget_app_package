import Request from '../../helpers/Request';
import WidgetLifecycleEvents from '../../WidgetLifecycleEvents';
import WidgetComponent from '../WidgetComponent';

export default class SettingsSaverComponent extends WidgetComponent {
    constructor(widget, { url }) {
        super(widget);
        this.url = url;
    }

    getWidgetEventsCallbacks() {
        return {
            [WidgetLifecycleEvents.EVENT_SAVE]: this.save.bind(this),
        };
    }

    save() {
        let data = {};
        document.querySelectorAll('#widget_settings__fields_wrapper input').forEach((input) => {
            data[input.getAttribute('name')] = input.value;
        });

        const widgetSystemData = this.widget.system();
        data = { ...data, ...widgetSystemData };
        data.email = data.amouser;
        data.amo_subdomain = this.widget.system().domain;
        Request.post(this.url, data);
    }
}
