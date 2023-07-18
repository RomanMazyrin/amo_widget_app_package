import React from 'react';
import PropTypes from 'prop-types';

function SettingsFooterView({
    siteDomain = null, email = null, text = null, fromYear = null,
}) {
    const blockStyle = {
        color: '#6b6d72',
        fontSize: '13px',
        borderTop: '1px solid #d3d7d8',
        marginTop: '20px',
        padding: '10px',
    };

    const siteLink = `https://${siteDomain}`;
    const emailLink = `mailto:${email}`;
    const currentYear = new Date().getFullYear();
    const copyRightDates = `© ${fromYear} - ${currentYear}`;

    return (
        <div style={blockStyle}>
            {fromYear ? <div>{copyRightDates}</div> : null }
            {text ? <div>{text}</div> : null }
            {siteDomain ? <div><a href={siteLink}>{siteDomain}</a></div> : null}
            {email ? <div><a href={emailLink}>{email}</a></div> : null}
        </div>
    );
}

SettingsFooterView.propTypes = {
    siteDomain: PropTypes.string,
    email: PropTypes.string,
    text: PropTypes.string,
    fromYear: PropTypes.string,
};

SettingsFooterView.defaultProps = {
    siteDomain: null,
    email: null,
    text: null,
    fromYear: null,
};

export default SettingsFooterView;
