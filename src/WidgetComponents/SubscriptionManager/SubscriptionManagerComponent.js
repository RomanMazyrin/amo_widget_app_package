import { createEvent, createStore } from 'effector';
import Notificator from '../../helpers/Notificator';
import Request from '../../helpers/Request';
import SettingsPanelHelpers from '../../helpers/SettingsPanelHelpers';
import TemplateRenderHelpers from '../../helpers/TemplateRenderHelpers';
import WidgetLifecycleEvents from '../../WidgetLifecycleEvents';
import WidgetComponent from '../WidgetComponent';
import SubscriptionStatus from './SubscriptionStatus';
import SubscriptionStatusSettingsPanelModel from './SubscriptionStatusSettingsPanel/SubscriptionStatusSettingsPanelModel';
import SubscriptionStatusSettingsView from './SubscriptionStatusSettingsPanel/SubscriptionStatusSettingsView';

export default class SubscriptionManagerComponent extends WidgetComponent {
    constructor(widget, { statusUrl = '' }) {
        super(widget);
        this.statusUrl = statusUrl;
        this.subscriptionStatus = null;
        this.setSubscriptionStatus = createEvent();
        this.$subscriptionStatus = createStore(null).on(
            this.setSubscriptionStatus,
            (_, status) => status,
        );
        this.notificator = null;
    }

    getWidgetEventsCallbacks() {
        return {
            [WidgetLifecycleEvents.EVENT_INIT]: this.init.bind(this),
            [WidgetLifecycleEvents.EVENT_SETTINGS]: this.settings.bind(this),
        };
    }

    initNotificator() {
        if (!this.notificator) {
            this.notificator = new Notificator({
                header: this.widget.i18n('widget.name'),
            });
        }
    }

    async fetchStatus() {
        const response = await Request.get(this.statusUrl, {
            amo_subdomain: this.widget.system().domain,
        });
        const responseData = response.data;
        const status = new SubscriptionStatus(responseData);
        this.setSubscriptionStatus(status);
        return status;
    }

    getStatus() {
        if (!this.subscriptionStatus) {
            this.subscriptionStatus = this.fetchStatus();
        }
        return this.subscriptionStatus;
    }

    async init() {
        this.initNotificator();
        const subscriptionStatus = await this.getStatus();
        if (subscriptionStatus) {
            if (subscriptionStatus.getIsExpired()) {
                this.notificator.showMessage(
                    'error',
                    TemplateRenderHelpers.renderWithWidgetData(
                        subscriptionStatus.getStatusText(),
                        this.widget,
                    ),
                );
            }
            if (!subscriptionStatus.getIsDataFilled()) {
                this.notificator.showMessage(
                    'error',
                    TemplateRenderHelpers.renderWithWidgetData(
                        '{{lang.components.subscription_manager.need_to_fill_settings_error}}',
                        this.widget,
                    ),
                );
            }
        }
    }

    async settings() {
        this.initNotificator();
        await this.getStatus();
        const props = {
            model: new SubscriptionStatusSettingsPanelModel({
                $subscriptionStatus: this.$subscriptionStatus,
                widget: this.widget,
            }),
        };
        SettingsPanelHelpers.appendReactComponentInDescriptionBlock(SubscriptionStatusSettingsView, props, 'subscription-status');
    }
}
