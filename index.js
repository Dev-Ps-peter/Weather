const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { weatherData: null,forecastData: null, error: null });
});

app.post('/', async (req, res) => {
    const city = req.body.city;
    const apiKey = 'fe3986200bcdb094a672dc1f1ab5d3a0';
    const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            axios.get(currentWeatherUrl),
            axios.get(forecastUrl)
        ]);

        const weatherData = currentWeatherResponse.data;
        const forecastData = forecastResponse.data;

        res.render('index', { weatherData, forecastData, error: null });
    } catch (error) {
        res.render('index', { weatherData: null, forecastData: null, error: 'Error, please try again' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
