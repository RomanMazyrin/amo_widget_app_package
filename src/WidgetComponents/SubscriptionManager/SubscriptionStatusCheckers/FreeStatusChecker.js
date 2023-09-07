import StatusChecker from './StatusChecker';

export default class FreeStatusChecker extends StatusChecker {
    static statusText = '{{lang.components.subscription_manager.statuses_texts.free}}';

    getStatusText() {
        return this.constructor.statusText;
    }
}
