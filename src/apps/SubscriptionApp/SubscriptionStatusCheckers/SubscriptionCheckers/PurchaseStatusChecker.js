import StatusChecker from './StatusChecker';

export default class PurchaseStatusChecker extends StatusChecker {
    constructor(status) {
        super();
        this.subscriptionStatus = status;
    }

    getStatusText() {
        if (this.subscriptionStatus === 'purchased') {
            return '{{purchased}}';
        }
        return '{{not_purchased}}';
    }
}
