import components from "../src/index";
import WidgetMock from "./WidgetMock";

const { 
	createWidget,
	SettingsButtonsComponent,
	SettingsContactFormComponent,
	SettingsPhoneFieldComponent,
	SubscriptionManagerComponent,
	VideoInstructionComponent,
	SettingsSaverComponent,
	SettingsFooterComponent
} = components;
(async () => {

	
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

	const WidgetConstructor = createWidget(config);
	WidgetConstructor.prototype = new WidgetMock('testdeltasales');
	const widget = new WidgetConstructor();
	widget.callbacks.settings();
})();
