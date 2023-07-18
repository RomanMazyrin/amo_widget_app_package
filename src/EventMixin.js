const EventMixin = {
    on(eventName, callback) {
        if (!this.listeners) {
            this.listeners = {};
        }
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    },

    off(eventName, callback) {
        if (!this.listeners || !this.listeners[eventName]) {
            return;
        }
        if (!callback) {
            delete this.listeners[eventName];
        } else {
            this.listeners[eventName] = this.listeners[eventName].filter((cb) => cb !== callback);
        }
    },

    trigger(eventName, eventData = {}) {
        if (this.listeners && this.listeners[eventName]) {
            this.listeners[eventName].forEach((callback) => callback(eventName, eventData));
        }
    },
};

export default EventMixin;
