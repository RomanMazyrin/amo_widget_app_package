import BaseApp from '../BaseApp';

export default class SimpleApp extends BaseApp {
    run() {
        if (this.callbacks.run) {
            this.callbacks.run(this);
        }
    }

    renderSettings() {
        if (this.callbacks.settings) {
            this.callbacks.settings(this);
        }
    }

    digitalPipeline() {
        if (this.callbacks.dpSettings) {
            this.callbacks.dpSettings(this);
        }
    }

    renderEntityTab() {
        if (this.callbacks.tab) {
            this.callbacks.tab(this);
        }
    }
}
