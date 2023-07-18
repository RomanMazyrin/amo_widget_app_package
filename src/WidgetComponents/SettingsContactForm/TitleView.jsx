import React from 'react';
import PropTypes from 'prop-types';

function TitleView({ text }) {
    const titleStyle = {
        color: 'white',
        marginBottom: '10px',
        fontWeight: '900',
    };

    return (
        <div style={titleStyle}>
            {text}
        </div>
    );
}

TitleView.propTypes = {
    text: PropTypes.string.isRequired,
};

export default TitleView;
