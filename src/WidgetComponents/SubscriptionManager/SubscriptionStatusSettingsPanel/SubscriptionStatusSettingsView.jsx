import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'effector-react';
import SubscriptionStatusSettingsPanelModel from './SubscriptionStatusSettingsPanelModel';

function SubscriptionStatusSettingsView({ model }) {
    const status = useStore(model.$subscriptionStatus);

    if (!status) {
        return <div />;
    }

    const isInstalled = status ? status.getIsInstalled() : false;

    const statusInfoContainerStyle = {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        margin: '15px 0',
        fontSize: '20px',
        fontWeight: '900',
    };

    const subscriptionInfoStyle = {
        color: status.getIsExpired() ? 'red' : 'green',
        marginLeft: '10px',
    };

    return (
        <div style={statusInfoContainerStyle}>
            { isInstalled ? (
                <div style={subscriptionInfoStyle}>{model.renderStatusText(status)}</div>
            ) : null }
        </div>
    );
}

SubscriptionStatusSettingsView.propTypes = {
    model: PropTypes.instanceOf(SubscriptionStatusSettingsPanelModel).isRequired,
};

export default SubscriptionStatusSettingsView;
