# Settings Contact Form Component

## Description

Component for the only goal - to render special block inside settings window, which contains buttons and forms to make an easy contact with widget developers.

## Configuration params

- text - text to be rendered in component title. Can include template tags with reference to lang files.
- contactButtons - buttons to be rendered in buttons list. Look at example below;
- callbackForm - params for callback form. Look at example below.

## Configuration example

```javascript
const config = {
    class: SettingsContactForm,
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
            url: `${INTEGRATION_MAIN_URL}/help-order`,
        },
    }
}
```



```json
//Widget's file i18n/en.json

{
    // ...
    "components": {
        // ...
        "settings_contact_form": {
            "text": "Any questions? Contact us via links below or leave your phone and we will call you back!",
            "buttons": {
                "telegram": {
                    "text": "Telegram Bot",
                    "username": "mazyrin"
                },
                "whatsapp": {
                    "text": "Whats App",
                    "phone": "79258449201"
                },
                "email": {
                    "text": "E-mail",
                    "email": "info@delta-sales-crm.com"
                },
                "site": {
                    "text": "Site",
                    "link": "https://delta-sales-crm.com"
                }
            },
            "callback_form": {
                "success_text": "We will contact you soon!",
                "fail_text": "Something went wrong...",
                "send_button_text": "Call me!",
                "phone_field_placeholder": "+1 (555) 555-55-55"
            }
        },
        // ...
    }
}

```