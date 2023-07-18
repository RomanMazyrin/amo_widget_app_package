import DemoStatusChecker from './SubscriptionStatusCheckers/DemoStatusChecker';
import FreeStatusChecker from './SubscriptionStatusCheckers/FreeStatusChecker';
import PurchaseStatusChecker from './SubscriptionStatusCheckers/PurchaseStatusChecker';
import SubscriptionStatusChecker from './SubscriptionStatusCheckers/SubscriptionStatusChecker';

const StatusCheckers = {
    purchase: PurchaseStatusChecker,
    subscription: SubscriptionStatusChecker,
    free: FreeStatusChecker,
    demo: DemoStatusChecker,
};

export default class SubscriptionStatus {
    constructor({
        subscription_type: subscriptionType,
        subscription_date_timestamp: subscriptionsDateTimestamp,
        is_expired: isExpired,
        is_installed: isInstalled,
        user_data_filled_status: hasUserFilledData,
    }) {
        this.subscriptionType = subscriptionType;
        this.subscriptionDate = subscriptionsDateTimestamp;
        this.isExpired = isExpired;
        this.isInstalled = isInstalled;
        this.hasUserFilledData = hasUserFilledData;

        const StatusCheckerClass = StatusCheckers[this.subscriptionType];
        if (StatusCheckerClass) {
            this.statusChecker = new StatusCheckerClass(this.subscriptionDate);
        } else {
            this.statusChecker = new FreeStatusChecker();
        }
    }

    getIsExpired() {
        return this.isExpired;
    }

    getStatusText() {
        return this.statusChecker.getStatusText();
    }

    getIsDataFilled() {
        return this.hasUserFilledData;
    }

    getIsInstalled() {
        return this.isInstalled;
    }
}
