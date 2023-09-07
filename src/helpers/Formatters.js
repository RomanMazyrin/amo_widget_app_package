const chunkString = (value, digits) => {
    if (value === '') {
        return [];
    }
    return value.toString().match(new RegExp(`.{1,${digits}}`, 'g'));
};

const reverseString = (str) => str.toString().split('').reverse().join('');

const splitBy = (value, digits, splitter) => reverseString(chunkString(reverseString(value), digits).join('***'))
    .split('***')
    .join(splitter);

const moneyFormatter = (value) => splitBy(value, 3, ' ');

const Formatters = {
    money: moneyFormatter,
};

export default Formatters;
