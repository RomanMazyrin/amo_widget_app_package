import StatusChecker from './StatusChecker';

export default class FreeStatusChecker extends StatusChecker {
    static statusText = '{{free}}';

    getStatusText() {
        return this.constructor.statusText;
    }
}
