export default class SubscritionStatusInfoModel {
    constructor({
        $subscriptionStatus, expiredText, notExpiredText, renderStatusInfo,
    }) {
        this.$subscriptionStatus = $subscriptionStatus;
        this.expiredText = expiredText;
        this.notExpiredText = notExpiredText;
        this.renderStatusInfo = renderStatusInfo;
    }
}
