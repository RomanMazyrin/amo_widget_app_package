# Settings Footer Component

## Description

This component is used to render footer with some contact information in settings panel.

## Configuration params

- siteDomain
- fromYear
- email
- text

## Configuration example

```javascript
const config = {
    components: {
        // ...
        settingsFooter: {
            class: SettingsFooterComponent,
            params: {
                siteDomain: '{{lang.components.settings_footer.site_domain}}',
                fromYear: '2013',
                email: '{{lang.components.settings_footer.email}}',
                text: '{{lang.components.settings_footer.text}}',
            },
        },
        // ...
    }
}
```

## Lang file structure

Since this component show some texts in settings panel you have to include those text labels in lang files, which will be substitute automatically.

```json
"components": {
    // ...
    "settings_footer": {
        "text": "Got any questions? Text us on email or on site",
        "site_domain": "delta-sales-crm.com",
        "email": "info@delta-sales-crm.com"
    },
    // ...
}
```
