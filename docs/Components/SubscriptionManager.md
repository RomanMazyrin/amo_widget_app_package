# Subscription Manager Component

## Description

This component is used when widget has subscription model of using. Including this component in your widget you can check is widget expired or not, and according to that execute one or another logic

Two main default things widget does:

1. Fetch subscription status and if widget is expired than show popup with notification.
1. Render subsciption status in settings panel;

## Configuration params

- statusUrl - URL used to fetch subscription status. Component passes amo_subdomain param of current account while request.

## Server response structure

Server which responses on statusUrl must return next data, so this component could read, parse and use it:

- subscription_type - could be one of next options: 'free', 'purchase', 'subscription', 'demo'
- subscription_date_timestamp - either timestamp integer or string 'purchased' if subscription_type is 'purchase'
- is_expired - boolean
- is_installed - boolean
- user_data_filled_status - boolean

## Configuration example

```javascript
const config = {
    components: {
        subscriptionManager: {
            class: SubscriptionManagerComponent,
            params: {
                statusUrl: "https://mazdata.ru/widget-name-integration/get-integration-status"
            }
        },
    }
}
```

## Lang file structure

Since this component show some texts in settings panel or in popup you have to include those text labels in lang files, which will be substitute automatically. Correct structure is nececcary because path to those text labels is hardcoded inside component.

```json
"components": {
    // ...
    "subscription_manager": {
        "statuses_texts": {
            "demo": "Trial period till",
            "free": "Widget is free",
            "purchased": "Widget has been purchased",
            "not_purchased": "Widget has not been purchased",
            "subscription": "Widget is available till"
        },
        "need_to_fill_settings_error": "You have to fill phone in settings panel"
    },
    // ...
}
```

## Using component from another component

```javascript

const status = await widget.component('subscriptionManager').getStatus();

if (status.getIsExpired()) {
    console.log("Widget is expired!");
    console.log(status.getStatusText());
} else {
    runSomeAction();
}
```
