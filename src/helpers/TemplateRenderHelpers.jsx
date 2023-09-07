import cloneDeepWith from 'lodash.clonedeepwith';

export default class TemplateRenderHelpers {
    static deepRenderObjectWithWidgetData(object, widget) {
        return cloneDeepWith(object, (value) => {
            if (typeof value === 'string') {
                return this.renderWithWidgetData(value, widget);
            }
            return undefined;
        });
    }

    static renderWithWidgetData(tmpl, widget) {
        const templatesData = {
            lang: widget.langs,
            system: widget.system(),
            rootPath: widget.params.path,
        };
        return widget.renderTmpl(tmpl, templatesData);
    }
}
