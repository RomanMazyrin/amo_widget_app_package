import SubscriptionStatusChecker from './SubscriptionStatusChecker';

export default class DemoStatusChecker extends SubscriptionStatusChecker {
    getStatusText() {
        return `{{lang.components.subscription_manager.statuses_texts.demo}} ${this.getFormattedDate()}`;
    }
}
