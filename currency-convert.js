//USD, CAD, 20
// change 20 us dollar in canadian dollar

//http://data.fixer.io/api/latest?access_key=abf05bf6065bd7fd6eaec2406fb9df2f

const axios = require('axios');
const url = 'http://data.fixer.io/api/latest?access_key=abf05bf6065bd7fd6eaec2406fb9df2f';

const getExchangeRate = (from, to) => {
    return axios.get(url).then((response) => {
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];
        return rate;
    })
};

getExchangeRate('USD', 'CAD').then((rate) => {
    console.log(rate);
})