import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'effector-react';
import SubscritionStatusInfoModel from './models/SubscritionStatusInfoModel';

function SubscriptionStatusInfo({ model }) {
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
        color: 'blue',
        marginLeft: '10px',
    };

    const expirationInfoStyle = {
        color: status.getIsExpired() ? 'red' : 'green',
    };

    return (
        <div style={statusInfoContainerStyle}>
            { isInstalled ? (
                <>
                    <div style={expirationInfoStyle}>
                        {status.getIsExpired() ? model.expiredText : model.notExpiredText}
                    </div>
                    <div style={subscriptionInfoStyle}>{model.renderStatusInfo(status)}</div>
                </>
            ) : null }
        </div>
    );
}

SubscriptionStatusInfo.propTypes = {
    model: PropTypes.instanceOf(SubscritionStatusInfoModel).isRequired,
};

export default SubscriptionStatusInfo;
