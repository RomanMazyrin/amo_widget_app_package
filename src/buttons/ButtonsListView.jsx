import React from 'react';
import PropTypes from 'prop-types';
import ButtonView from './ButtonView';
import ButtonModel from './buttonModels/ButtonModel';

function ButtonsListView({ buttons, containerStyle = {} }) {
    const componentContainerStyle = {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        margin: '20px 0',
        textAlign: 'center',
        ...containerStyle,
    };

    const ButtonsList = buttons.map((btnModel) => <ButtonView buttonModel={btnModel} />);

    return (
        <div style={componentContainerStyle}>
            {ButtonsList}
        </div>
    );
}

ButtonsListView.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.instanceOf(ButtonModel)).isRequired,
    containerStyle: PropTypes.objectOf(PropTypes.string),
};

ButtonsListView.defaultProps = {
    containerStyle: {},
};

export default ButtonsListView;
