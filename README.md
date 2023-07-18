# Amocrm widget framework

Библиотека предназначенная для того, чтобы ускорить и облегчить разработку виджетов для amoCRM.

## Содержание
- [Установка](#установка)
- [Использование в проекте](#использование-в-проекте)
- [Как устроена и работает библиотека](#как-устроена-и-работает-библиотека)
- [Пример конфигурации](#пример-конфигурации)
- [Компоненты](#компоненты)
  - [Что такое компонент](#что-такое-компонент)
  - [Конфигурация компонента](#конфигурация-компонента)
  - [Готовые компоненты библиотеки](#готовые-компоненты-библиотеки)
  - [Создание своего компонента](#создание-своего-компонента)
- [События виджета]()

## Установка

Установка производится с помощью менеджера пакетов [npm](https://www.npmjs.com/)

```bash
npm install --save amocrm_widget_framework
```

## Использование в проекте

Конечный файл библиотеки собирается в формате UMD, что означает, что вы можете использовать его с любой модульной системой. Здесь и далее все инструкции будут показаны на примере модулей ES6.

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

Но так же можно подключать данную библиотеку через AMD (define/require), CommonJS (require) и даже напрямую на странице (будет доступна как глобальная переменная ```amocrm_widget_lib```).

## Как устроена и работает библиотека

В основе библиотеки лежит функция ```createWidget(config)```. Данная функция создает на основе переданной в нее конфигурации функцию-конструктор виджета, которая затем экспортируется в файле script.js.

Конфигурация виджета содержит следующее:

1. Компоненты виджета (components)
1. Обработчики событий виджета (events)

При инициализации виджета внутри amoCRM (то бишь при создании экземпляра виджета) происходит несколько вещей:

1. Создаются экземпляры компонентов переданные в конфигурации. Данные экземпляры подписываются на события виджета.
1. Переданные в конфигурации обработчики событий (events) так же подписываются на события виджета.
1. Создается набор коллбеков. Внутри коллбеков происходит всего лишь вызов определенного события, соответствующего коллбеку, и внутрь события передается название события и инстанс виджета.

## Пример конфигурации

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
};
```

## Компоненты

### Что такое компонент

Компонент в рамках данной библиотеки - это сущность, которая инициализируется один раз при создании виджета, подписывается на его события и затем реагирует на срабатывание событий. Инстанс компонента доступен из инстанса виджета через метод ```component(componentName)```.

```javascript
const sm = widget.component('subscriptionManager');
const status = await sm.getStatus();
```

При создании инстанса компонента (при создании экземпляра виджета) в конструктор компонента первым аргументом передается экземпляр самого виджета, и вторым аргументом набор параметров указанных в конфигурации под ключом ```params```.

### Конфигурация компонента

Конфигурация компонента состоит из трех вещей:

1. Ключ компонента в конфигруации. По данному ключу данный компонент затем будет доступен при вызове его из виджета ```widget.component('subscriptionManager')```.
1. Параметр ```class```. В данный параметр следуюет передавать класс, который наследуется от класса WidgetComponent.
1. Параметр ```params```. Данный параметр является объектом, который передается в конструктор компонента вторым аргументом в том же виде, в котором он представлен в конфигурации.

**Пример конфигурации отдельного компонента:**

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

При инициализации виджета, будет создан экземпляр класса SettingsFooterComponent, указанный под ключом ```class```. При создании экземпляра в него будет передан инстанс виджета и объект, который содержится под ключом ```params```. В дальнейшем можно будет обращаться к данному компоненту через ```widget.component('settingsFooter')```.

### Готовые компоненты библиотеки

- [VideoInstruction](docs/Components/VideoInstruction.md)
- SettingsContactForm
- SettingsButtons
- SubscriptionManager
- SettingsPhoneField
- SettingsSaver
- SettingsSaver
- SettingsFooter

Подробная инструкция по каждому отдельному компоненту доступна по ссылкам.

### Создание своего компонента

1. Создать класс компонента. Унаследовать его от ```WidgetComponent```
1. Переопределить метод ```getWidgetEventsCallbacks()```.

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

3. Для дальнейшего использования в проекте необходимо добавить новый компонент в конфигурацию при создании через ```createWidget```

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

## События виджета

