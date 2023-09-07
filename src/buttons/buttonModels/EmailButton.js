import LinkButton from './LinkButton';

export default class EmailButton extends LinkButton {
    constructor({ email, ...base } = {}) {
        super(base);
        this.href = `mailto:${email}`;
    }
}
