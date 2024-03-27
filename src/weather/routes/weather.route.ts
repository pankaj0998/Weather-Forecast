import express, { Request, Response } from 'express';
import { WeatherService } from '../service/weather.service';
import { CustomError } from '../../common/error/error';
import { rateLimitMiddleware } from '../../common/middleware/rate-limitter';
import apiCache from 'apicache'
import { logger } from '../../common/logger/logger';

const weatherService = new WeatherService()
const router = express.Router();
const cache = apiCache.middleware

router.get('/weather/:locationId', rateLimitMiddleware, cache('1 minute'), async (req: Request, res: Response) => {
    try {
        logger.info(`Calling a service to get a weather for location`)
        const locationId = parseInt(req.params.locationId, 10)
        const location = await weatherService.getWeatherForecast(locationId);
        res.status(200).json(location);
    } catch (error) {
        logger.error(`Error occured:`, JSON.stringify(error))
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: error });
        }
    }
});


router.get('/history', rateLimitMiddleware, cache('1 minute'), async (req: Request, res: Response) => {
    try {
        logger.info(`Calling a service to get the weather history`)
        const latitude = Number(req.query.latitude);
        const longitude = Number(req.query.longitude);
        const count = Number(req.query.count);
        const location = await weatherService.getWeatherHistory(latitude, longitude, count);
        res.status(200).json(location);
    } catch (error) {
        logger.error(`Error occured:`, JSON.stringify(error))
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: error });
        }
    }
});
export default router