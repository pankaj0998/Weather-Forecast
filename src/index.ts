import express from "express";
import { configuration } from "./common/config/configuration";
import { errorHandler } from "./common/error/error";
import locationRouter from './locations/routes/location.route'
import weatherRouter from './weather/routes/weather.route'
import mongoose from "mongoose";
import { logger } from "./common/logger/logger";

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use('/api/v1', locationRouter);
app.use('/api/v1', weatherRouter);

mongoose.connect(configuration.database.mongodb.uri, configuration.database.mongodb.options)
    .then(res => {
        if (res) {
            logger.info(`Database Connected Successfully: ${configuration.database.mongodb.uri}`)
        }
    }).catch(err => {
        logger.info(`Error connecting to database: ${err}`)
    })

app.listen(configuration.app.port, configuration.app.host, () => {
    logger.info(`Server running at ${configuration.app.host}: ${configuration.app.port}- ${configuration.app.name}`)
})