import React from 'react';
import PropTypes from 'prop-types';
import ButtonModel from './buttonModels/ButtonModel';

function ButtonView({ buttonModel }) {
    const ButtonComponent = buttonModel.getViewComponent();

    return ButtonComponent
        ? <ButtonComponent model={buttonModel} />
        : <button style={buttonModel.style} type="button" className={buttonModel.classname} onClick={(e) => buttonModel.onClick(e)}>{buttonModel.text}</button>;
}

ButtonView.propTypes = {
    buttonModel: PropTypes.instanceOf(ButtonModel).isRequired,
};

export default ButtonView;
