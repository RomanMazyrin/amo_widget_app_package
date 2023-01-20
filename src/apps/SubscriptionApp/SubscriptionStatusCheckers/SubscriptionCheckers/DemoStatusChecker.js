import SubscriptionStatusChecker from './SubscriptionStatusChecker';

export default class DemoStatusChecker extends SubscriptionStatusChecker {
    getStatusText() {
        return `{{demo}} ${this.getFormattedDate()}`;
    }
}
