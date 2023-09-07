import React from 'react';
import PropTypes from 'prop-types';

function VideoInstructionView({ title = '', link = null }) {
    const videoTitleStyle = {
        display: 'block',
        fontSize: '20px',
        fontWeight: '900',
        marginBottom: '10px',
    };

    const videoContainerStyle = {
        display: 'block',
    };

    const componentContainerStyle = {
        display: 'block',
        margin: '20px 0',
        textAlign: 'center',
    };

    const videoIframeStyle = {
        width: '100%',
        height: '315px',
        border: 'solid black 1px',
        padding: '8px',
        boxSizing: 'border-box',
    };

    return (
        <div style={componentContainerStyle}>
            <div style={videoTitleStyle}>{title}</div>
            <div style={videoContainerStyle}>
                <iframe style={videoIframeStyle} title="video-instruction" src={link} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
        </div>
    );
}

VideoInstructionView.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
};

VideoInstructionView.defaultProps = {
    link: null,
    title: '',
};

export default VideoInstructionView;
