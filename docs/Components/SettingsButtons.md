# Settings Buttons Component

## Description

Component for the only goal - to render buttons in settings window.

## Configuration params

- buttons - array with buttons configuration objects. There are actually two types of buttons: ```link``` and ```button```. See the example below.

## Configuration example

```javascript
const config = {
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
                        onClick: ({ widget }) => {
                            new Modal({
                                content: '<div id="setting-panel"></div>',
                                closeOnOverlayClick: true,
                                containerStyle: {
                                    height: '800px',
                                },
                            });
                        },
                    },
                },
            ],
        },
    },
}
```