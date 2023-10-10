# Amocrm widget framework

Library to make amoCRM widgets development easier and faster. Includes often used components that are essential for widget core functionality.

<br>

## Built with

![webpack](https://img.shields.io/badge/webpack-2b3a42?logo=webpack)
![react](https://img.shields.io/badge/react-2b3a42?logo=react)
![esLint](https://img.shields.io/badge/esLint-4B32C3?logo=eslint)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm)
![jest](https://img.shields.io/badge/jest-C21325?logo=jest)
![babel](https://img.shields.io/badge/babel-F9DC3E?logo=babel&logoColor=black)

<br>

## Table of contents
- [Install](#Install)
- [Using](#Using)
- [How it works](#how-the-library-works)
- [Configuration example](#configuration-example)
- [Components](#components)
  - [What is a component](#what-is-a-component)
  - [Component's configuration](#component's-configuration)
  - [Built-in library components](#built-in-library-components )
  - [Custom component creating](#custom-component-creating)
- [Widget events](#widget-events)
  - [Widget events list](#widget-events-list)
  - [Event handler arguments](#event-handler-arguments)


## Install

Installation by NPM package manager [npm](https://www.npmjs.com/)

```bash
npm install --save amocrm_widget_framework
```

You must include react in your project as well. Usually react is installed automatically as peer-dependency during ```npm install``` process. However, you must include React in your project explicitly, either in ES6 modules via ```import``` statement or in ```require``` function as a dependency or directly include react on a web page as third-party package.

## Using

Destination main file of the lib is built in UMD format. That means you can use this lib with any module system you are used to work with. All the next documentation examples are shown for ES6 modules.

```js
import {
    createWidget,
    SettingsButtonsComponent,
    SettingsContactFormComponent,
    SettingsPhoneFieldComponent,
    SubscriptionManagerComponent,
    VideoInstructionComponent,
    SettingsSaverComponent,
    SettingsFooterComponent,
} from 'amocrm_widget_framework';
```

But you can import this lib via  AMD (define/require), CommonJS (require) and even include destination script direct on a web page and use components via global variable ```amocrm_widget_lib```).

## How the library works

There is a core function inside the lib ```createWidget(config)```. That function creates and returns another constructor-function founded on the passed configuration. Result constructor-function has to be imported in script.js file.

Widget configuration includes:

1. Widget components (components)
1. Widget lifecycle events handlers (events)

During the widget initialization inside amoCRM (i. e. widget instance is being creating) some things happen:

1. Instances of components from the configuration is being creating. Those instances subscribes on widget events after that.
1. Events handlers from configuration subscribes on widget events as well.
1. All neccessary callbacks is being creating in the widget instance attribute 'callbacks'. The only thing happens inside those callbacks is to call the exact event corresponpding to that callback and pass the event name and widget instance inside that event.

## Configuration example

```javascript
const config = {
    components: {
        videoInstruction: {
            class: VideoInstructionComponent,
        },
        settingsContactForm: {
            class: SettingsContactFormComponent,
            params: {
                text: '{{lang.components.settings_contact_form.text}}',
                contactButtons: [
                    {
                        type: 'telegram',
                        params: {
                            text: '{{lang.components.settings_contact_form.buttons.telegram.text}}',
                            username: '{{lang.components.settings_contact_form.buttons.telegram.username}}',
                        },
                    },
                    {
                        type: 'whatsapp',
                        params: {
                            text: '{{lang.components.settings_contact_form.buttons.whatsapp.text}}',
                            phone: '{{lang.components.settings_contact_form.buttons.whatsapp.phone}}',
                        },
                    },
                    {
                        type: 'email',
                        params: {
                            text: '{{lang.components.settings_contact_form.buttons.email.text}}',
                            email: '{{lang.components.settings_contact_form.buttons.email.email}}',
                        },
                    },
                    {
                        type: 'link',
                        params: {
                            text: '{{lang.components.settings_contact_form.buttons.site.text}}',
                            href: '{{lang.components.settings_contact_form.buttons.site.link}}',
                        },
                    },
                ],
                callbackForm: {
                    successText: '{{lang.components.settings_contact_form.callback_form.success_text}}',
                    failText: '{{lang.components.settings_contact_form.callback_form.fail_text}}',
                    sendButtonText: '{{lang.components.settings_contact_form.callback_form.send_button_text}}',
                    phoneFieldPlaceholder: '{{lang.components.settings_contact_form.callback_form.phone_field_placeholder}}',
                    url: 'https://webhook.site/eb5e4c54-99a4-4ced-a5af-b87084b6fdaf',
                },
            },
        },
        settingsButtons: {
            class: SettingsButtonsComponent,
            params: {
                buttons: [
                    {
                        type: 'link',
                        params: {
                            text: '{{lang.components.settings_buttons.auth_btn}}',
                            href: 'https://mazdata.ru/all-client-leads-integration/oauth?amo_subdomain={{system.domain}}',
                            style: {
                                backgroundColor: 'green',
                                color: 'white',
                                width: '350px',
                            },
                            classname: 'button-input',
                        },
                    },
                ],
            },
        },
        subscriptionManager: {
            class: SubscriptionManagerComponent,
            params: {
                statusUrl: 'https://mazdata.ru/google-drive-integration/get-integration-status',
            },
        },
        settingsPhoneField: {
            class: SettingsPhoneFieldComponent,
            params: {
                phoneFieldOpts: {
                    initialCountry: 'RU',
                    preferredCountries: ['RU', 'UA', 'BY', 'KZ'],
                },
            },
        },

        settingsSaver: {
            class: SettingsSaverComponent,
            params: {
                url: 'https://webhook.site/eb5e4c54-99a4-4ced-a5af-b87084b6fdaf',
            },
        },

        settingsFooter: {
            class: SettingsFooterComponent,
            params: {
                siteDomain: 'deltasales.ru',
                fromYear: '2013',
                email: "info@deltasales.ru",
                text: '{{lang.components.settings_footer.text}}'
            }
        }
    },

    events: {
        [WidgetLifecycleEvents.EVENT_INIT]: (eventName, widget) => {
            // do something on INIT event;
        }
    }
};
```

## Components

### What is a component?

By "component" inside this lib we mean some instance that initializes once during the widget creation, subscribes on widget events and handles events triggers after that. Components instances are available by calling widget method ```component(componentName)```.

```javascript
const sm = widget.component('subscriptionManager');
const status = await sm.getStatus();
```

During the component creation (which happens in the middle of widget instance creating process) two arguments are passed in the component constructor. The first - instance of the widget itself. The second - set of parametees from configuration under the ```params``` key.

In one word, component is a thing which:

1. Has to be instantiated only once.
1. Has to be available globally within widget.
1. Can (but not must) subscribe on widget events and execute handlers on those events.

### Component's configuration

Component's configuration consists of 3 main parts:

1. Components's key in configuration. That key is neccessary for further component getting from the widget by ```widget.component('keyFromConfiguration')``` method.
1. Parameter ```class```. This parameter accepts class that is inherited from WidgetComponent class.
1. Parameter ```params```. This parameter is an object which is passed to the component's constructor in the exact same structure it is presented in configuration.

**Component configuration example:**

```javascript
settingsFooter: {
    class: SettingsFooterComponent,
    params: {
        siteDomain: 'deltasales.ru',
        fromYear: '2013',
        email: "info@deltasales.ru",
        text: '{{lang.components.settings_footer.text}}'
    }
}
```

The instance of class SettingsFooterComponent will be created on widget initialization. While instance is being creating it accepts widget instance and an object under the key ```params```. In further you can retrieve component instance by calling  ```widget.component('settingsFooter')```.

### Built-in library components

- [VideoInstruction](docs/Components/VideoInstruction.md)
- SettingsContactForm
- SettingsButtons
- SubscriptionManager
- SettingsPhoneField
- SettingsSaver
- SettingsSaver
- SettingsFooter

Detailed instructions of each component are available on links.

### Custom component creating

1. Create component class. Inherit it from ```WidgetComponent```
1. Override the method ```getWidgetEventsCallbacks()```.

```javascript
import WidgetLifecycleEvents from 'amocrm_widget_framework';
import WidgetComponent from 'amocrm_widget_framework';

class MyOwnComponent extends WidgetComponent {
    constructor(widget, params) {
        super(widget);
        //this.params = params; etc...;
    }

    getWidgetEventsCallbacks() {
        return {
            [WidgetLifecycleEvents.EVENT_SETTINGS]: this.settings.bind(this),
        };
    }

    settings(eventName, widget) {
        // Do something when settings event will be triggered;
    }
}
```

3. For further using you have to add your new component in the configuration of ```createWidget``` method;

```javascript
const config = {
    components: {
        //...
        myOwnComponentName: {
            class: MyOwnComponent,
            params: {
                someParamName: 'Hi there!'
            }
        },
        //...
    }
};
```

## Widget events

AmoCRM widgets are working on callbacks runnig system. You can deep dive into that in the [major documentation] on the official amoCRM site(https://www.amocrm.ru/developers/content/integrations/script_js).

But we want different components (which often are not related with each other) to listen same events. For that purposes the "Events" mechanism was developed. When particular callback is called the widget just emit the "event" and those listeners which are subscribed on that event run their functional.

There is an object ```events``` to subscribe on the particular widget events in the [configuration](#configuration-example).

Keys of that object are events names, and values are callbacks for those events.

> **Important!** Components handle events first, and only then ```events```.

There are two ways to subscribe on events:

1. Create custom component with callbacks on particular events, pass component to configuration.
1. Create callbacks in the ```events``` object;

### Widget events list

- EVENT_RENDER - Emited on render() callback
- EVENT_INIT - Emited on init() callback
- EVENT_SETTINGS - Emited on settings() callback
- EVENT_DP - Emited on dpSettings() callback
- EVENT_TAB - Emited on loadPreloadedData() callback
- EVENT_SAVE - Emited on onSave() callback

All this events exists as constants in the object ```WidgetLifecycleEvents```

### Event handler arguments

When handler handle event it accepts two arguments:

1. Event name (from the [list above](#widget-events-list))
1. Widget instance.
