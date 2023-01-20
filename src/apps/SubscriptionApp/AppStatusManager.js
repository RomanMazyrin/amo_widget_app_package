import { createEffect, createStore, sample } from 'effector';
import SubscriptionStatus from './SubscriptionStatusCheckers/SubscriptionStatus';

export default class AppStatusManager {
    constructor(backendClient) {
        this.subscriptionStatus = null;
        this.backendClient = backendClient;

        this.$appStatus = createStore(null);

        this.fetchStatusFx = createEffect(async () => {
            const status = await this.refreshStatus();
            return status;
        });

        sample({
            clock: this.fetchStatusFx.doneData,
            target: this.$appStatus,
        });
    }

    async getCanAppBeRun() {
        const appStatus = await this.getStatus();
        return !appStatus.getIsExpired()
        && appStatus.getIsDataFilled()
        && appStatus.getIsInstalled();
    }

    async refreshStatus() {
        const axiosResponseObj = await this.backendClient.get('get-integration-status');
        const serverResponseBody = axiosResponseObj.data;
        this.subscriptionStatus = new SubscriptionStatus(serverResponseBody);
        return this.subscriptionStatus;
    }

    async getStatus() {
        if (!this.subscriptionStatus) {
            await this.refreshStatus();
        }
        return this.subscriptionStatus;
    }
}
