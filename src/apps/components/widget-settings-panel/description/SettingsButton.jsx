import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'effector-react';
import SettingsButtonModel from './buttons/SettingsButtonModel';

function SettingsButton({ model }) {
    const text = useStore(model.$renderedText);
    const backgroundColor = useStore(model.$backgroundColor);
    const textColor = useStore(model.$textColor);
    const isHidden = useStore(model.$isHidden);

    const buttonStyle = {
        backgroundColor,
        color: textColor,
        display: isHidden ? 'none' : 'inline-block',
        width: '250px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
    };

    const buttonContainerStyle = {
        display: 'block',
        textAlign: 'center',
        margin: '10px 0',
    };

    return (
        <div style={buttonContainerStyle}>
            <button className="button-input" style={buttonStyle} type="button" onClick={model.onClick}>{text}</button>
        </div>
    );
}

SettingsButton.propTypes = {
    model: PropTypes.instanceOf(SettingsButtonModel).isRequired,
};

export default SettingsButton;
