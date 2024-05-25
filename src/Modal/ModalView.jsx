import React from 'react';
import './style.scss';

// eslint-disable-next-line react/prop-types
function ModalView({ content, closeModal, overlayClick }) {
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '101%',
        right: 0,
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        overflow: 'hidden',
    };

    const contentContainerStyle = {
        background: 'white',
        border: '1px solid #c5c5c5',
        borderRadius: '1px',
        boxSizing: 'border-box',
        padding: '30px',
        boxShadow: '0px 14px 24px 1px rgba(0, 0, 0, 0.1)',
        zIndex: 2,
        width: '1000px',
        position: 'relative',
        margin: '30px auto',
        top: 'auto',
        left: 'auto',
    };

    const actionsBoxStyle = {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-end',
    };

    const contentHtml = {
        __html: content,
    };

    return (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="modal__overlay" style={overlayStyle} onClick={overlayClick}>
            <div className="modal__content-box" style={contentContainerStyle}>
                <div className="actions-box" style={actionsBoxStyle}>
                    <button className="actions-box__action" type="button" onClick={closeModal}>
                        <i className="gg-close" />
                    </button>
                </div>
                <div dangerouslySetInnerHTML={contentHtml} />
            </div>
        </div>
    );
}

export default ModalView;
