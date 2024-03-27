import dotenv from "dotenv"
dotenv.config();

export const configuration = {
    app: {
        host: process.env.APP_HOST || 'localhost',
        port: parseInt(process.env.APP_PORT, 10) || 9000,
        protocol: process.env.APP_PROTOCOL || 'http',
        name: process.env.APP_NAME || 'Weather Forecast',
        environment: process.env.NODE_ENV || 'development',
    },
    database: {
        mongodb: {
            uri: getMongoDBURI(),
            options: {
                serverSelectionTimeoutMS: parseInt(process.env.MONGO_SERVER_SELECTION_TIMEOUT, 10) || 50,
                connectTimeoutMS: parseInt(process.env.MONGO_CONNECT_TIMEOUT, 10) || 50
            }
        },
        collectionName: {
            location: process.env.LOCATION_COLLECTION || 'locations'
        }
    },
    rateLimit: {
        windowMs: 60000,
        maxRequest: 10
    },
    externalConfig: {
        apiKey: process.env.API_KEY || 'abc',
        weatherBaseUrl: process.env.WEATHER_BASE_URL || 'http://api.openweathermap.org/data/2.5/weather',
        queryUrl: process.env.API_KEY_URL || 'appid',
        historyBaseUrl: process.env.HISTORY_BASE_URL || 'https://pro.openweathermap.org/data/2.5/forecast/climate'
    }
}

function getMongoDBURI() {
    const mongoCredentials = (process.env.MONGO_USER && process.env.MONGO_USER !== '' && process.env.MONGO_PASSWORD && process.env.MONGO_PASSWORD !== '') ? `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@` : ''
    const uri = process.env.MONGO_URI ? process.env.MONGO_URI : `mongodb://${mongoCredentials}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?${process.env.MONGO_QUERY_PARAMS}`
    return uri
}