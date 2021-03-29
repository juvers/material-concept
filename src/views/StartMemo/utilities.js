// convert to unique key-value pairs
const objectCollection = (arr) => {
    return arr.reduce((acc, curr) => {
        let key = `${curr.OptionCode}-${curr.OptionSuffixCode}`;

        if (!acc[key]) {
            acc[key] = null;
        };
        acc[key] = curr.SalesDescription;
        return acc;
    }, {})
};

const arrayCollection = (arr) => {
    const data = arr.map(x => `${x.OptionCode}-${x.OptionSuffixCode}:${x.SalesDescription}`);
    return ([...new Set(data)]);
};