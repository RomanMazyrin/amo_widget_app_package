import { createEffect, sample } from 'effector';
import SettingsButtonModel from './SettingsButtonModel';

export default class PrimarySettingsButton extends SettingsButtonModel {
    constructor({ onClick, ...baseParams }) {
        super(baseParams);

        this.actionFx = createEffect(async (e) => {
            onClick(e);
        });

        sample({
            clock: this.onClick,
            target: this.actionFx,
        });
    }
}
