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
    static createFromConfig(config) {
        const btnConfig = { ...config };
        const ButtonClass = BUTTONS_TYPES_CLASSES[btnConfig.type];
        if (ButtonClass === undefined) {
            throw new Error(`button type '${btnConfig.type}' does not exist`);
        }
        return new ButtonClass(btnConfig.params);
    }

    createFromConfigsArray(configsArray = []) {
        return configsArray.map(this.constructor.createFromConfig);
    }
}
