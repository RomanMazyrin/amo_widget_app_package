import WidgetMock from "./WidgetMock";
import components from "../src/index";
import 'intl-tel-input/build/css/intlTelInput.css';

(async () => {

    const widgetMock = new WidgetMock('testdeltasales');

    const Widget = components.SubscriptionApp.createWidgetApp({
        description: "Hello test",
        integrationBaseUrl: "https://mazdata.ru/double-search-integration",
        callbacks: {
            tab: async (app) => {
                // const integrations = await fetchData();
                // app.renderReact(document.getElementById(app.getWidgetId()), <IntegrationsList />, integrations);
            },
            run: (app) => {
                console.log('I m running!');
            },
            settings: (app) => {
                console.log("settings render completed");
            }
        },
        settingsButtons: [
            new components.LinkSettingsButton({
                text: "{{ auth_btn.text }}",
                link: '{{ auth_btn.link }}',
                backgroundColor: 'blue',
                textColor: 'white'
            })
        ]
    });

    Widget.prototype = widgetMock;

    const w = new Widget();

    w.callbacks.render();
    w.callbacks.init();
    w.callbacks.bind_actions();
    w.callbacks.settings();

})();
