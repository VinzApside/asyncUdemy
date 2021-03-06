//USD, CAD, 20
// change 20 us dollar in canadian dollar

//http://data.fixer.io/api/latest?access_key=abf05bf6065bd7fd6eaec2406fb9df2f

const axios = require('axios');
const url = 'http://data.fixer.io/api/latest?access_key=abf05bf6065bd7fd6eaec2406fb9df2f';

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(url);
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error()
        }

        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} to ${to}.`)
    }

};


const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => { return country.name })

    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`)
    }


}

const convertCurrency = async (from, to, amount) => {
    const getRate = await getExchangeRate(from, to);
    const exchange = (amount * getRate).toFixed(2);
    const countrys = await getCountries(to);
    const countryList = countrys.join(', ');

    const phrase = `${amount} ${from} is worth ${exchange} ${to}. You can spend these in the following countries : ${countryList}.`
    return phrase;
}


// getExchangeRate('USD', 'CAD').then((rate) => {
//     console.log(rate);
// })

// getCountries('EUR').then((countries) => {
//     console.log(countries);
// })

convertCurrency('USD', 'CAD', 20).then((money) => {
    console.log(money);
}).catch((e) => {
    console.log(e.message);
})

// const doWork = async () => {
//     return mynumber;
// }

// doWork().then((data) => {
//     console.log(data);
// }).catch((e) => {
//     console.log('Something went wrong');
// })