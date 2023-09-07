import React from 'react';
import { createRoot } from 'react-dom/client';

export default class ReactDOMRender {
    static appentReactComponent(selector, Component, props, domElementName) {
        const container = document.querySelector(selector);
        const domElement = document.createElement(domElementName);
        container.appendChild(domElement);
        this.renderInElement(domElement, Component, props);
    }

    static renderInElement(domElement, Component, props) {
        createRoot(domElement).render(
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Component {...props} />,
        );
    }
}
