import express, { Request, Response } from 'express';
import { LocationService } from '../service/location.service';
import { AddLocationDto } from '../dto/add-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { CustomError } from '../../common/error/error';
import { rateLimitMiddleware } from '../../common/middleware/rate-limitter';
import { validationMiddleware } from '../../common/middleware/validation';
import apiCache from 'apicache'
import { logger } from '../../common/logger/logger';


const router = express.Router();
const locationService = new LocationService();
const cache = apiCache.middleware

router.post('/locations', validationMiddleware(AddLocationDto), async (req: Request, res: Response) => {
    try {
        logger.info(`Calling a service to add a new location`)
        const locationDto: AddLocationDto = req.body;
        const newLocation = await locationService.addLocation(locationDto);
        res.status(201).json(newLocation);
    }
    catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            logger.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.get('/locations', rateLimitMiddleware, cache('1 minute'), async (req: Request, res: Response) => {
    try {
        logger.info(`Calling a service to fetch all the locations`)
        const location = await locationService.getLocations();
        res.status(200).json(location);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            logger.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.get('/locations/:locationId', rateLimitMiddleware, cache('1 minute'), async (req: Request, res: Response) => {
    try {
        logger.info(`Calling a service to fetch location by id`)
        const locationId = parseInt(req.params.locationId, 10)
        const location = await locationService.getLocationById(locationId);
        res.status(200).json(location);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            logger.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.put('/locations/:locationId', async (req: Request, res: Response) => {
    try {
        logger.info(`Calling a service to update a existing location`)
        const locationId = parseInt(req.params.locationId, 10)
        const updateBody: UpdateLocationDto = req.body
        const location = await locationService.updateLocation(locationId, updateBody);
        res.status(200).json(location);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            logger.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.delete('/locations/:locationId', async (req: Request, res: Response) => {
    try {
        logger.info(`Calling a service to delete a location`)
        const locationId = parseInt(req.params.locationId, 10)
        const location = await locationService.deleteLocation(locationId);
        res.status(200).json(location);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            logger.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

export default router;

