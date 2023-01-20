import toastr from 'toastr';
import 'toastr/toastr.scss';

export default class Notificator {
    constructor({ widgetName }) {
        this.widgetName = widgetName;
    }

    showMessage(type, text) {
        toastr[type](text, this.widgetName, {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            onclick: null,
            showDuration: '300',
            hideDuration: '1000',
            timeOut: '5000',
            extendedTimeOut: '1000',
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: 'slideDown',
            hideMethod: 'slideUp',
        });
    }
}
