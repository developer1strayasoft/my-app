import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Card, CardContent } from '@mui/material';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeatherData = async () => {
    // try {
    //     console.log(city); // Make sure city is defined and has the correct value
    //     const response = await fetch(`http://localhost:8000/weather/${city}`);
    //     const data = await response.json();
    //     console.log(data)
    //     setWeatherData(data);
    // } catch (error) {
    //     console.error('Error fetching weather data:', error);
    // }
    try {
        const response = await fetch(`http://localhost:8000/api/weather/${city}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            // Redirect to weather page upon successful authentication
            const data = await response.json();
            console.log("hduewhd",data.main)
            setWeatherData(data)
        } else {
            console.error('Error fetching weather data:');
        }
    } catch (error) {
        console.error('Error authenticating with Google:', error);
    }
};


  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Weather Information
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Enter City Name"
            variant="outlined"
            value={city}
            onChange={handleCityChange}
            style={{ marginBottom: '1rem' }}
            InputProps={{ style: { height: '3rem' } }}
          />
        </Grid>
        <Grid item xs={12} sm={4} align="center" style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '2%' }}>
          <Button variant="contained" color="primary" onClick={fetchWeatherData} style={{ width: '100%', height: '3rem' }}>
            Get Weather
          </Button>
        </Grid>
      </Grid>

      {weatherData && (
        <Card style={{ marginTop: '2rem' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {weatherData.name}, {weatherData.sys.country}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {weatherData.weather[0].description}
            </Typography>
            <Typography variant="h6" component="p">
              Temperature: {weatherData.main.temp} °C
            </Typography>
            <Typography variant="h6" component="p">
              Humidity: {weatherData.main.humidity} %
            </Typography>
            <Typography variant="h6" component="p">
              Wind Speed: {weatherData.wind.speed} m/s
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Weather;
