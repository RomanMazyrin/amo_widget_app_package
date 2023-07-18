import merge from 'lodash.merge';
import ButtonModelFactory from '../../buttons/ButtonModelFactory';

const DEFAULT_CONTACT_BUTTON_PARAMS = {
    target: '_blank',
    classname: 'button-input',
    style: {
        width: '350px',
        marginLeft: 0,
        marginTop: '10px',
    },
};

const DEFAULT_PARTICULAR_BUTTON_PARAMS = {
    telegram: {
        style: {
            backgroundColor: '#0088cc',
            color: 'white',
        },
    },
    whatsapp: {
        style: {
            backgroundColor: '#128C7E',
            color: 'white',
        },
    },
};

export default class ContactButtonModelsFactory extends ButtonModelFactory {
    static createFromConfig(config) {
        const defaultConfigForParticularType = DEFAULT_PARTICULAR_BUTTON_PARAMS[config.type] || {};
        const resultConfig = {
            ...config,
            params: merge(
                {},
                DEFAULT_CONTACT_BUTTON_PARAMS,
                defaultConfigForParticularType,
                config.params,
            ),
        };
        return super.createFromConfig(resultConfig);
    }
}
