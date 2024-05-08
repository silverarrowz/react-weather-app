// Cities API

const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const geoApiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '73d4466d07mshcf3052fc74c5416p1002b2jsn8fe041d38892',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

// Weather API

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "a5bfc0d2fa5b947cfa2845d01bba044c";


export { geoApiOptions, GEO_API_URL, WEATHER_API_URL, WEATHER_API_KEY };