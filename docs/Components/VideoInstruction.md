# Video Instruction Component

## Description

Component for the only goal - to render video-instruction (youtube iframe) in the widget settings panel.

## Configuration params

- langPath - dot-notated path to the component's texts in lang file . By default is equal to **'components.video_instruction'**.

### *Example*

```json
//Widget's file i18n/en.json

{
    "widget": {
        "name": "Test widget",
        "short_description": "Test widget",
        "description": "Test widget",
        "tour_description": "Test widget"
    },
    
    "settings": {
        "phone": "Phone number"
    },

    "components": {
        "instruction_for_dummies": {
            "title": "Video-instruction",
            "link": "https://www.youtube.com/embed/oNjq8SUArRU"
        },
        "settings_phone_field": {
            "need_to_fill": "Field must be fulfilled properly"
        },
        // ...
    }
}

```

With the lang file configuration as above ```langPath``` parameter must be 'components.instruction_for_dummies'. The other way is to create lang texts under the path **'components.video_instruction'** in the lang files and do not pass param langPath at all, because it will be equal to **'components.video_instruction'** by default.

## Lang files params

- title - Component title. The text above the video iframe.
- link - Link of the youtube video that need to be embedded.