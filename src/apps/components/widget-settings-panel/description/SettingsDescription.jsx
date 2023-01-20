import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'effector-react';
import WidgetDescriptionText from './WidgetDescriptionText';
import VideoInstruction from './VideoInstruction';
import SettingsDescriptionModel from './SettingsDescriptionModel';
import SettingsButton from './SettingsButton';

function SettingsDescription({ model }) {
    const description = useStore(model.description);
    const videoLink = useStore(model.videoInstructionLink);
    const extraComponentsData = useStore(model.extraComponents);
    const videoInstructionTitle = useStore(model.videoInstructionTitle);
    const buttons = model.buttons.map((buttonModel) => <SettingsButton model={buttonModel} />);
    const extraComponents = extraComponentsData.map(
        ({ Component, model: componentModel }) => <Component model={componentModel} />,
    );
    const settingsDescriptionContainerStyle = {
        display: 'block',
    };

    return (
        <div style={settingsDescriptionContainerStyle}>

            { description
                ? <WidgetDescriptionText text={description} /> : null}

            { videoLink
                ? <VideoInstruction link={videoLink} title={videoInstructionTitle} />
                : null}

            {extraComponents}

            {buttons}

        </div>
    );
}

SettingsDescription.propTypes = {
    model: PropTypes.instanceOf(SettingsDescriptionModel).isRequired,
};

export default SettingsDescription;
