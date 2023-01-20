import { get } from 'lodash';
import twig from 'twig';
import lang from './ru.json';


export default class WidgetMock {
    constructor(amoSubdomain) {
        this.amoSubdomain = amoSubdomain;
        this.params = {
            path: ''
        }
    }

    system() {
        return {
            subdomain: this.amoSubdomain,
            domain: `${this.amoSubdomain}.amocrm.ru`
        };
    }

    i18n(key) {
        return get(lang, key);
    }

    render({data}, params) {
        const template = twig.twig({data});
        return template.render(params);
    }
}