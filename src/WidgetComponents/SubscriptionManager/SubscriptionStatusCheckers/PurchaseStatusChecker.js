import StatusChecker from './StatusChecker';

export default class PurchaseStatusChecker extends StatusChecker {
    constructor(status) {
        super();
        this.subscriptionStatus = status;
    }

    getStatusText() {
        if (this.subscriptionStatus === 'purchased') {
            return '{{lang.components.subscription_manager.statuses_texts.purchased}}';
        }
        return '{{lang.components.subscription_manager.statuses_texts.not_purchased}}';
    }
}
