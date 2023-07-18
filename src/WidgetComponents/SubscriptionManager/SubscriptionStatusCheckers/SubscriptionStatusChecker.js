import StatusChecker from './StatusChecker';

const formatDate = (dateStr) => {
    const d = dateStr.toString();
    return d.length < 2 ? `0${d}` : d;
};

export default class SubscriptionStatusChecker extends StatusChecker {
    constructor(subscriptionTimestamp) {
        super();
        this.subscriptionStatus = parseInt(subscriptionTimestamp, 10);
    }

    getFormattedDate() {
        const date = new Date(this.subscriptionStatus * 1000);
        const dateStr = `${formatDate(date.getDate())}.${formatDate(
            date.getMonth() + 1,
        )}.${formatDate(date.getFullYear())}`;
        return dateStr;
    }

    getStatusText() {
        return `{{lang.components.subscription_manager.statuses_texts.subscription}} ${this.getFormattedDate()}`;
    }
}
