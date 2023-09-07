import LinkButton from './LinkButton';

export default class TelegramButton extends LinkButton {
    constructor({ username, ...base } = {}) {
        super(base);
        this.href = `https://t.me/${username}`;
    }
}
