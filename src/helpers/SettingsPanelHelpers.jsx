import React from 'react';
import { createRoot } from 'react-dom/client';

export default class SettingsPanelHelpers {
    static appendReactComponentInDescriptionBlock(Component, props, elementBlockName) {
        this.appentReactComponent('.widget_settings_block__descr', Component, props, elementBlockName);
    }

    static appentReactComponent(selector, Component, props, elementBlockName) {
        const descriptionContainer = document.querySelector(selector);
        const elementBlock = document.createElement(elementBlockName);
        descriptionContainer.appendChild(elementBlock);

        createRoot(elementBlock).render(
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Component {...props} />,
        );
    }
}
