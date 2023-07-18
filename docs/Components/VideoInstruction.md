# Video Instruction Component

## Описание

Компонент для рендеринга видеоинструкции в панели настроек виджета.

## Параметры конфигурации

- langPath - путь в языковом файле через dot-нотацию до языковых настроек компонента. По-умолчанию равен **'components.video_instruction'**.

### *Пример*

```json
//файл виджета i18n/ru.json

{
    "widget": {
        "name": "Тестовый виджет",
        "short_description": "Тестовый виджет",
        "description": "Тестовый виджет",
        "tour_description": "Тестовый виджет"
    },
    
    "settings": {
        "phone": "Телефон"
    },

    "components": {
        "instruction_for_dummies": {
            "title": "Видео-инструкция",
            "link": "https://www.youtube.com/embed/oNjq8SUArRU"
        },
        "settings_phone_field": {
            "need_to_fill": "Необходимо корректно заполнить поле"
        },
        // ...
    }
}

```

При такой структуре языкового файла, параметр ```langPath``` должен быть 'components.instruction_for_dummies'. Либо можно в языковом файле создать путь **'components.video_instruction'** и параметр langPath не передавать.

## Параметры языкового файла

- title - Заголовок компонента. Текст который выведется над iframe видео
- link - Ссылка на встраиваемое видео на youtube.