import ReactDOMRender from '../helpers/ReactDOMRender';
import ModalView from './ModalView';

function CloseModalConstructor(instance, r, afterDestroy) {
    const self = this;
    self.instance = instance;
    self.rootModalElement = r;
    self.rootReact = null;
    self.afterDestroy = afterDestroy;
    self.setRootReact = (rootReact) => {
        self.rootReact = rootReact;
    };
    self.close = () => {
        self.rootReact.unmount();
        self.rootModalElement.remove();
        self.afterDestroy(self.instance);
    };
}

export default class Modal {
    constructor({
        content = '',
        closeOnOverlayClick = false,
        afterRender = () => {},
        afterDestroy = () => {},
        containerStyle = {},
    }) {
        this.content = content;
        this.closeOnOverlayClick = closeOnOverlayClick;
        this.afterRender = afterRender;
        this.afterDestroy = afterDestroy;
        this.containerStyle = containerStyle;

        const rootModalElement = document.createElement('div');
        rootModalElement.className = 'modal';
        rootModalElement.style.zIndex = 1000;
        rootModalElement.style.position = 'fixed';
        rootModalElement.style.top = 0;
        rootModalElement.style.bottom = 0;
        rootModalElement.style.left = 0;
        rootModalElement.style.right = 0;

        document.body.appendChild(rootModalElement);
        const closeModal = new CloseModalConstructor(this, rootModalElement, this.afterDestroy);
        const root = ReactDOMRender.renderInElement(rootModalElement, ModalView, {
            content: this.content,
            closeModal: closeModal.close,
            overlayClick: (e) => {
                if (e.target === e.currentTarget) {
                    if (this.closeOnOverlayClick) {
                        closeModal.close();
                    }
                }
            },
            containerStyle: this.containerStyle,
        });
        closeModal.setRootReact(root);

        this.afterRender(this);
    }
}
