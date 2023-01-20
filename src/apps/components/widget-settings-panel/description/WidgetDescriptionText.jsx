import React from 'react';
import PropTypes from 'prop-types';

function WidgetDescriptionText({ text = '' }) {
    const html = {
        __html: text,
    };

    const descriptionContainerStyle = {
        display: 'block',
        textAlign: 'left',
        margin: '20px 0',
    };
    return (
        <div dangerouslySetInnerHTML={html} style={descriptionContainerStyle} />
    );
}

WidgetDescriptionText.propTypes = {
    text: PropTypes.string,
};

WidgetDescriptionText.defaultProps = {
    text: null,
};

export default WidgetDescriptionText;
