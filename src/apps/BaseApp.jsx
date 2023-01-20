import React from 'react';
import { createRoot } from 'react-dom/client';
import Notificator from '../notificator/Notificator';
import SettingsDescription from './components/widget-settings-panel/description/SettingsDescription';
import SettingsDescriptionModel from './components/widget-settings-panel/description/SettingsDescriptionModel';
import SettingsFooter from './components/widget-settings-panel/footer/SettingsFooter';
import SettingsFooterModel from './components/widget-settings-panel/footer/SettingsFooterModel';
import random from '../utils/random';

export default class BaseApp {
    constructor(widget, {
        settingsButtons = [], description = '', styleFiles = [], callbacks = {},
    }) {
        this.widget = widget;
        const widgetSystemParams = this.widget.system();
        this.amoDomain = widgetSystemParams.domain;

        this.notificator = new Notificator({
            widgetName: this.i18n('widget.name'),
        });

        this.settingsFooterModel = new SettingsFooterModel({
            ...this.i18n('settings_panel.settings_footer'),
        });

        settingsButtons.forEach((btnModel) => {
            btnModel.setRenderer(
                (text) => this.renderTmpl(text, this.i18n('settings_panel.buttons')),
            );
        });

        this.settingsDescriptionModel = new SettingsDescriptionModel({
            description,
            videoInstructionLink: this.i18n('settings_panel.video_instruction_link'),
            videoInstructionTitle: this.i18n('settings_panel.video_instruction_title'),
            buttons: settingsButtons,
        });

        this.callbacks = callbacks;

        styleFiles.forEach(this.loadStyle.bind(this));
    }

    run() {
        throw new Error(`Method cannot be called from ${this.constructor}. Must be redefined in child class`);
    }

    renderSettings() {
        throw new Error(`Method cannot be called from ${this.constructor}. Must be redefined in child class`);
    }

    digitalPipeline() {
        throw new Error(`Method cannot be called from ${this.constructor}. Must be redefined in child class`);
    }

    renderEntityTab() {
        throw new Error(`Method cannot be called from ${this.constructor}. Must be redefined in child class`);
    }

    renderDescription(rootElement) {
        const descriptionBlock = createRoot(rootElement);
        descriptionBlock.render(<SettingsDescription model={this.settingsDescriptionModel} />);
    }

    renderFooter() {
        const footerDescription = document.getElementById('widget_settings__fields_wrapper');
        const footerInfoBlock = document.createElement('footer-info');
        footerDescription.appendChild(footerInfoBlock);
        createRoot(footerInfoBlock).render(
            <SettingsFooter model={this.settingsFooterModel} />,
        );
    }

    renderBaseSettings() {
        this.renderDescription(document.querySelector('.widget_settings_block__descr'));
        this.renderFooter();
    }

    i18n(key, defaultValue = '') {
        try {
            return this.widget.i18n(key);
        } catch (e) {
            return defaultValue;
        }
    }

    renderTmpl(tmpl = '', data = {}) {
        return this.widget.render(
            { data: tmpl },
            data,
        );
    }

    static renderReact(rootElement, Component) {
        const root = createRoot(rootElement);
        root.render(Component);
    }

    renderReact(rootElement, Component) {
        this.constructor.renderReact(rootElement, Component);
    }

    renderReactRightPanel(Component) {
        const elementId = random.randomStr(8);
        this.widget.render_template(
            {
                caption: {
                    class_name: 'js-an-invoice-caption',
                },
                body: '',
                render: `<div id=${elementId}></div>`,
            },
            {
                name: this.widget.widgetName,
                w_code: this.widget.widgetName,
            },
        );
        this.renderReact(document.getElementById(elementId), Component);
    }

    loadStyle(src, onload = () => {}) {
        const link = document.createElement('link');
        const widgetRootPath = this.widget.params.path;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = this.renderTmpl(src, {
            rootPath: widgetRootPath,
        });
        link.onload = onload;
        document.head.appendChild(link);
    }

    static createWidgetApp(appParams = {}) {
        const APP_CLASS = this;
        function AppConstructor() {
            const self = this;
            self.app = null;
            this.callbacks = {
                render() {
                    if (self.app === null) {
                        self.app = new APP_CLASS(self, appParams);
                    }
                    self.app.run(self.app);
                    return true;
                },
                init() {
                    return true;
                },
                bind_actions() {
                    return true;
                },
                settings() {
                    if (self.app === null) {
                        self.app = new APP_CLASS(self, appParams);
                    }
                    self.app.renderBaseSettings();
                    self.app.renderSettings(self.app);
                    return true;
                },
                onSave() {
                    return true;
                },
                destroy() {
                },
                loadPreloadedData() {
                    if (self.app === null) {
                        self.app = new APP_CLASS(self, appParams);
                    }
                    self.app.renderEntityTab(self.app);
                    return Promise.resolve({});
                },
                loadElements() {
                    return Promise.resolve({});
                },
                linkCard() {
                    return Promise.resolve({});
                },
                searchDataInCard() {
                    return Promise.resolve({});
                },
                dpSettings() {
                    if (self.app === null) {
                        self.app = new APP_CLASS(self, appParams);
                    }
                    self.app.digitalPipeline(self.app);
                },
            };
        }
        return AppConstructor;
    }
}
