# Route Optimizer

A modern, dockerized route optimization application using OpenRouteService API. Plan the perfect route across multiple destinations with automatic address validation and route optimization.

## Features

- 🗺️ **Address Validation**: Automatically geocodes and validates all entered addresses
- 🚀 **Route Optimization**: Calculates the most efficient route order using OpenRouteService
- 📍 **Interactive Map**: Beautiful dark-themed map with numbered markers and route visualization
- 📊 **Route Statistics**: Displays total distance and estimated duration
- 🐳 **Dockerized**: Easy deployment with Docker and Docker Compose
- 🔐 **Secure**: API key stored in environment variables, never exposed to the frontend

## Prerequisites

- Docker and Docker Compose installed on your system
- OpenRouteService API key (free tier available)

## Getting Started

### 1. Get Your API Key

Sign up for a free OpenRouteService API key at:
https://openrouteservice.org/dev/#/signup

### 2. Configure Environment

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit the `.env` file and add your OpenRouteService API key:

```env
OPENROUTESERVICE_API_KEY=your_actual_api_key_here
PORT=3000
```

### 3. Run with Docker Compose

Build and start the application:

```bash
docker-compose up --build
```

Or run in detached mode:

```bash
docker-compose up -d --build
```

The application will be available at: http://localhost:3000

### 4. Stop the Application

```bash
docker-compose down
```

## Alternative: Run with Docker Only

Build the image:

```bash
docker build -t route-optimizer .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env route-optimizer
```

## Alternative: Run Locally (without Docker)

If you prefer to run without Docker:

1. Install Node.js (v18 or higher)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with your API key
4. Start the server:
   ```bash
   npm start
   ```

For development with auto-reload:
```bash
npm run dev
```

## Usage

1. Open http://localhost:3000 in your web browser
2. Enter multiple addresses in the text area (one per line)
3. Click "Validate & Optimize Route"
4. The application will:
   - Validate all addresses
   - Highlight any problematic addresses
   - Calculate the optimal route order
   - Display the route on an interactive map
   - Show total distance and duration

## Example Addresses

```
123 Main Street, Boston, MA
456 Park Avenue, New York, NY
789 Ocean Drive, Miami, FL
101 Pike Place, Seattle, WA
```

## Project Structure

```
.
├── server.js              # Express backend server
├── package.json           # Node.js dependencies
├── Dockerfile            # Docker image configuration
├── docker-compose.yml    # Docker Compose configuration
├── .env.example          # Environment variables template
├── .env                  # Your actual environment variables (git-ignored)
├── .dockerignore         # Files to exclude from Docker image
├── .gitignore           # Files to exclude from git
└── public/
    └── index.html        # Frontend application
```

## API Endpoints

The backend provides three endpoints:

- `POST /api/geocode` - Geocode a single address
- `POST /api/optimize` - Optimize route order for multiple coordinates
- `POST /api/route` - Get route geometry for navigation

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript, Leaflet.js
- **Backend**: Node.js, Express
- **API**: OpenRouteService
- **Containerization**: Docker, Docker Compose

## Security Notes

- Never commit your `.env` file to version control
- The API key is only used on the backend server
- The frontend never has direct access to your API key

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Troubleshooting

### API Key Issues
- Make sure your `.env` file exists and contains the correct API key
- Verify the API key format (no quotes needed)
- Check that you haven't exceeded the OpenRouteService API rate limits

### Port Already in Use
If port 3000 is already in use, change the PORT in your `.env` file and update the port mapping in `docker-compose.yml`.

### Container Won't Start
Check the logs:
```bash
docker-compose logs
```

## Support

For issues with OpenRouteService API, visit: https://openrouteservice.org/
For application issues, check the Docker logs or browser console for errors.
