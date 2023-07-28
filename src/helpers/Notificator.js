import Toastify from 'toastify-js/src/toastify';
import 'toastify-js/src/toastify.css';

const BASE_STYLE = {
    'font-size': '16px',
};

const TYPE_STYLES = {
    error: {
        background: 'red',
    },
};

export default class Notificator {
    constructor({ header }) {
        this.header = header;
    }

    showMessage(type, text) {
        const typeStyle = TYPE_STYLES[type] ?? {};
        Toastify({
            text: `<b style="font-weight:900">${this.header}</b>: ${text}`,
            gravity: 'bottom',
            position: 'right',
            duration: 15000,
            style: { ...BASE_STYLE, ...typeStyle },
            escapeMarkup: false,
        }).showToast();
    }
}
