# URL Shortener Service

## Features

- Shorten long URLs and get a shortened version.
- Redirect from a short URL to the original URL.
- Track how many users accessed the short URL.
- Expiration feature for shortened URLs.

## Technologies Used

- **Node.js**
- **Express**
- **Redis**
- **nanoid**

Setup Instructions
1. Clone the Repository

2. Install Dependencies
npm install

4. Start Redis Server (Docker)
If you haven't set up Redis locally, you can use Docker to quickly run a Redis container:

docker run --name redis-server -p 6379:6379 -d redis
This command starts a Redis server on port 6379, which your application will use by default.

4. Start the Application
Run the following command to start the server:

npm start
Your service will now be available at http://localhost:8000.

5. Test the API Endpoints
Use Postman or any API testing tool to access the following endpoints:

POST /shorten - Shorten a URL. Include the originalUrl in the request body. Optional: add expirationTime (in seconds).
GET /
- Redirect to the original URL using the shortened URL.
GET /stats/
- Get the access statistics for a specific shortened URL.
