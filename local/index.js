import SettingsButtonsComponent from "../src/WidgetComponents/SettingsButtons/SettingsButtonsComponent";
import createWidget from "../src/createWidget";
import WidgetMock from "./WidgetMock";


(async () => {

    const INTEGRATION_MAIN_URL = 'https://mazdata.ru';

    const config = {
        components: {
            settingsButtons: {
                class: SettingsButtonsComponent,
                params: {
                    buttons: [
                        {
                            type: 'link',
                            params: {
                                text: '{{lang.components.settings_buttons.auth_btn}}',
                                href: `${INTEGRATION_MAIN_URL}/oauth?amo_subdomain={{system.domain}}`,
                                style: {
                                    backgroundColor: 'green',
                                    color: 'white',
                                    width: '350px',
                                },
                                target: '_blank',
                                classname: 'button-input',
                            },
                        },
                        {
                            type: 'button',
                            params: {
                                text: '{{lang.components.settings_buttons.settings_btn}}',
                                style: {
                                    width: '350px',
                                    marginLeft: '0px',
                                    marginTop: '7px',
                                },
                                classname: 'button-input button-input_blue',
                                onClick: (e, widget) => {
                                    console.log(e);
                                    console.log(widget.component('settingsButtons'));
                                },
                            },
                        },
                    ],
                },
            },
        },
    };

    const widget = createWidget(config);
    widget.prototype = new WidgetMock('deltasales');
    (new widget()).callbacks.settings();

    
})();