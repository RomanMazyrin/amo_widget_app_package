# Settings Phone Field Component

## Description

This component is used to turn text input in setting panel into field with phone validation. That's the only purpose of this component.

## Configuration params

- langPath - path in lang file to the component text labels. Default is 'components.settings_phone_field';
- phoneFieldOpts - params for [intl-tel-input library](https://github.com/jackocnr/intl-tel-input?tab=readme-ov-file#initialisation-options)
- phoneFieldName - field name render to. Must be one of the fields from manifest.json.
- cssFilePath - file path to css file, which is necessary for correct phone field styling. Css file must be [this](https://github.com/jackocnr/intl-tel-input/blob/master/build/css/intlTelInput.css)

## Configuration example

```javascript
const config = {
    components: {
        settingsPhoneField: {
            class: SettingsPhoneFieldComponent,
            params: {
                phoneFieldOpts: {
                    initialCountry: 'RU',
                    preferredCountries: ['RU', 'UA', 'BY', 'KZ'],
                },
                cssFilePath: '{{rootPath}}/assets/css/intlTelInput.css',
            },
        },
    }
}
```

## Lang file structure

Since this component show some texts in settings panel you have to include those text labels in lang files, which will be substitute automatically.

```json
"components": {
    // ...
    "settings_phone_field": {
        "need_to_fill": "Field must be fulfilled"
    },
    // ...
}
```
