import TemplateRenderHelpers from '../../../helpers/TemplateRenderHelpers';

export default class SubscriptionStatusSettingsPanelModel {
    constructor({ $subscriptionStatus, widget }) {
        this.$subscriptionStatus = $subscriptionStatus;
        this.widget = widget;
    }

    renderStatusText(status) {
        return TemplateRenderHelpers.renderWithWidgetData(
            status.getStatusText(),
            this.widget,
        );
    }
}
