import { createEvent, createStore, sample } from 'effector';

export default class SettingsButtonModel {
    constructor({ text, backgroundColor, textColor }) {
        this.$text = createStore(text);
        this.$renderedText = createStore('');
        this.$backgroundColor = createStore(backgroundColor);
        this.$textColor = createStore(textColor);
        this.$isHidden = createStore(false);

        this.onClick = createEvent();

        this.$renderer = createStore(null);
        this.setRenderer = createEvent();

        sample({
            clock: this.setRenderer,
            target: this.$renderer,
        });

        sample({
            source: [this.$text, this.$renderer],
            fn: ([t, r]) => {
                if (r) {
                    return r(t);
                }
                return t;
            },
            target: this.$renderedText,
        });
    }
}
