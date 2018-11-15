//USD, CAD, 20
// change 20 us dollar in canadian dollar

//http://data.fixer.io/api/latest?access_key=abf05bf6065bd7fd6eaec2406fb9df2f

const axios = require('axios');
const url = 'http://data.fixer.io/api/latest?access_key=abf05bf6065bd7fd6eaec2406fb9df2f';

const getExchangeRate = async (from, to) => {
    const response = await axios.get(url);
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;

};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => { return country.name })
    })

}



getExchangeRate('USD', 'CAD').then((rate) => {
    console.log(rate);
})

getCountries('EUR').then((countries) => {
    console.log(countries);
})