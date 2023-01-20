import React from 'react';
import PropTypes from 'prop-types';
import SettingsFooterModel from './SettingsFooterModel';

function SettingsFooter({ model }) {
    const year = new Date().getFullYear();
    const siteLink = `https://${model.site}`;

    const footerInfoContainerStyle = {
        color: '#6b6d72',
        fontSize: '13px',
        borderTop: '1px solid #d3d7d8',
        margin: '30px -30px 0px -30px',
        padding: '10px 0 0 30px',
    };

    const contactLinksContainerStyle = {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
    };

    return (
        <div style={footerInfoContainerStyle}>
            <div>
                © 2013–
                {year}
            </div>
            <div>{model.text}</div>
            <div style={contactLinksContainerStyle}>
                <a href={siteLink} target="_blank" rel="noreferrer">{model.site}</a>
                <a href="mailto:info@deltasales.ru" target="_blank" rel="noreferrer">{model.email}</a>
            </div>
        </div>
    );
}

SettingsFooter.propTypes = {
    model: PropTypes.instanceOf(SettingsFooterModel).isRequired,
};

export default SettingsFooter;
