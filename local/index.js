import Notificator from "../src/helpers/Notificator";


(async () => {
	const n = new Notificator({header: 'WidgetName'});
	n.showMessage('error', "Just test With a lot of descripiton about something yuo know!");
})();
