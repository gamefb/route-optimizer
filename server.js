const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const ORS_API_KEY = process.env.OPENROUTESERVICE_API_KEY;

if (!ORS_API_KEY) {
    console.error('ERROR: OPENROUTESERVICE_API_KEY not found in environment variables');
    process.exit(1);
}

// Geocode endpoint
app.post('/api/geocode', async (req, res) => {
    const { address } = req.body;
    
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(address)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Geocode error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route optimization endpoint
app.post('/api/optimize', async (req, res) => {
    const { coordinates, startPoint, endPoint } = req.body;
    
    if (!coordinates || !Array.isArray(coordinates)) {
        return res.status(400).json({ error: 'Coordinates array is required' });
    }

    try {
        const jobs = coordinates.map((coord, index) => ({
            id: index + 1,
            location: [coord.lon, coord.lat]
        }));

        // Use provided start/end or default to first coordinate
        const vehicleStart = startPoint ? [startPoint.lon, startPoint.lat] : [coordinates[0].lon, coordinates[0].lat];
        const vehicleEnd = endPoint ? [endPoint.lon, endPoint.lat] : [coordinates[0].lon, coordinates[0].lat];

        const vehicle = {
            id: 1,
            profile: 'driving-car',
            start: vehicleStart,
            end: vehicleEnd
        };

        const requestBody = {
            jobs: jobs,
            vehicles: [vehicle]
        };

        const url = 'https://api.openrouteservice.org/optimization';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ORS_API_KEY
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Optimization error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route geometry endpoint
app.post('/api/route', async (req, res) => {
    const { coordinates } = req.body;
    
    if (!coordinates || !Array.isArray(coordinates)) {
        return res.status(400).json({ error: 'Coordinates array is required' });
    }

    try {
        const coords = coordinates.map(c => [c.lon, c.lat]);
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ORS_API_KEY
            },
            body: JSON.stringify({
                coordinates: coords
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Route error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`OpenRouteService API key loaded: ${ORS_API_KEY.substring(0, 8)}...`);
});
