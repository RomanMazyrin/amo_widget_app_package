export default class ObjectUtils {
    static objMap(obj, func) {
        return Object.fromEntries(
            Object.entries(obj).map(
                ([k, v]) => [k, func(v)],
            ),
        );
    }
}
