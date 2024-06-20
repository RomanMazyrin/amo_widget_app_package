# Settings Saver Component

## Description

This component is used to send data from settings panel to external server after save

## Configuration params

- url

## What data is sent after save?

All data from inputs plus system data from widget. Example:

phone: 89264409975
widget_params: {"show_all_leads":true}
show_all_leads: on
widget_active: Y
area: settings
displayed_count: 0
displayed_count_by_area[widgetsSettings]: 1
displayed_count_by_area[card_sdk]: 1
amouser: info@deltasales.ru
amouser_id: 108250
amohash: 
domain: allclientleadsintegrationdeltasales.amocrm.ru
subdomain: allclientleadsintegrationdeltasales
server: https://widgets.amocrm.ru
email: info@deltasales.ru
amo_subdomain: allclientleadsintegrationdeltasales.amocrm.ru

## Configuration example

```javascript
const config = {
    components: {
        // ...
         settingsSaver: {
            class: SettingsSaverComponent,
            params: {
                url: `${INTEGRATION_MAIN_URL}/save-settings`,
            },
        },
        // ...
    }
}
```