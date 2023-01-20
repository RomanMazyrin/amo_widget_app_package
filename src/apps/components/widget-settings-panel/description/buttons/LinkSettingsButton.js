import { createEffect, createStore, sample } from 'effector';
import SettingsButtonModel from './SettingsButtonModel';

export default class LinkSettingsButton extends SettingsButtonModel {
    constructor({ link, ...baseParams }) {
        super(baseParams);
        this.$link = createStore(link);
        this.$renderedLink = createStore(null);

        this.openLinkFx = createEffect(async (l) => {
            const w = window.open(l, '_blank');
            w.focus();
        });

        sample({
            source: [this.$link, this.$renderer],
            fn: ([l, r]) => {
                if (r) {
                    return r(l);
                }
                return l;
            },
            target: this.$renderedLink,
        });

        sample({
            source: this.$renderedLink,
            clock: this.onClick,
            target: this.openLinkFx,
        });
    }
}
