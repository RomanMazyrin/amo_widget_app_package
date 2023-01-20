import { createEvent, createStore, sample } from 'effector';

export default class SettingsDescriptionModel {
    constructor({
        description = '',
        videoInstructionLink = null,
        videoInstructionTitle = null,
        buttons = [],
        extraComponents = [],
    }) {
        this.description = createStore(description);
        this.videoInstructionLink = createStore(videoInstructionLink);
        this.videoInstructionTitle = createStore(videoInstructionTitle);
        this.buttons = buttons;
        this.extraComponents = createStore(extraComponents);

        this.setExtraComponents = createEvent();

        sample({
            clock: this.setExtraComponents,
            target: this.extraComponents,
        });
    }
}
