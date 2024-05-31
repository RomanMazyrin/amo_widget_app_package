import EmailButton from './buttonModels/EmailButton';
import LinkButton from './buttonModels/LinkButton';
import RegularButton from './buttonModels/RegularButton';
import TelegramButton from './buttonModels/TelegramButton';
import WhatsappButton from './buttonModels/WhatsappButton';

const BUTTONS_TYPES_CLASSES = {
    link: LinkButton,
    telegram: TelegramButton,
    whatsapp: WhatsappButton,
    email: EmailButton,
    button: RegularButton,
};

export default class ButtonModelFactory {
    constructor(widget) {
        this.widget = widget;
    }

    createFromConfig(config) {
        const btnConfig = { ...config };
        const ButtonClass = BUTTONS_TYPES_CLASSES[btnConfig.type];
        if (ButtonClass === undefined) {
            throw new Error(`button type '${btnConfig.type}' does not exist`);
        }
        return new ButtonClass({ ...(btnConfig.params), widget: this.widget });
    }

    createFromConfigsArray(configsArray = []) {
        return configsArray.map(this.createFromConfig.bind(this));
    }
}
