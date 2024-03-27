import { logger } from "../../common/logger/logger";
import { CustomError } from "../../common/error/error";
import { AddLocationDto } from "../dto/add-location.dto";
import { UpdateLocationDto } from "../dto/update-location.dto";
import Location from "../entity/location.entity";

export class LocationRepository {
    async addLocation(addLocationDto: AddLocationDto) {
        try {
            logger.info(`[LocationRepository: addLocation]: Finding location existed`)
            const existingLocation = await Location.findOne({ locationName: addLocationDto.locationName }).exec()
            if (existingLocation) {
                const error = new CustomError('Location already exists', 409);
                throw error;
            }
            logger.info(`[LocationRepository: addLocation]: Adding new location`)
            const result = await Location.create(addLocationDto)
            if (result) {
                return {
                    message: 'Location Added Successfully',
                    data: result
                }
            }
        } catch (error) {
            logger.error(`[LocationRepository: addLocation]: Error occurred while add the location`)
            throw error;
        }
    }

    async getLocations() {
        try {
            logger.info(`[LocationRepository: getLocations]: Finding location in collection`)
            const result = await Location.find({}, { _id: 0, __v: 0 }).exec()
            if (!result || result.length === 0) {
                const error = new CustomError('Locations Not Found', 404)
                throw error
            }
            return {
                message: 'Locations Fetched',
                data: result
            }
        } catch (error) {
            logger.error(`[LocationRepository]: Error occurred while fetching the location`)
            throw error
        }
    }

    async getLocationById(locationId: number) {
        try {
            logger.info(`[LocationRepository:getLocationById]: Finding location by id`)
            const result = await Location.findOne({ locationId: locationId }, { _id: 0, __v: 0 }).exec()
            if (!result) {
                const error = new CustomError('Location Not Found', 404)
                throw error
            }
            return {
                message: `Location Fetched for id: ${locationId}`,
                data: result
            }
        } catch (error) {
            logger.error(`[LocationRepository: getLocationById]: Error occurred while fetching the location`)
            throw error
        }
    }

    async updateLocation(locationId: number, updateLocationDto: UpdateLocationDto) {
        try {
            logger.info(`[LocationRepository:updateLocation]: Updating a location for id: ${locationId}`)
            const result = await Location.findOneAndUpdate({ locationId: locationId }, { $set: updateLocationDto }, { new: true }).exec()
            if (!result) {
                const error = new CustomError('Location Not Updated', 404)
                throw error
            }
            return {
                message: `Location Updated for id: ${locationId}`,
                data: result
            }
        } catch (error) {
            logger.error(`[LocationRepository]: Error occurred while fetching the location`)
            throw error
        }
    }

    async deleteLocation(locationId: number) {
        try {
            logger.info(`[LocationRepository:deleteLocation]: Deleting a location for id: ${locationId}`)
            const result = await Location.findOneAndDelete({ locationId: locationId }).exec()
            if (!result) {
                const error = new CustomError('Location Not Found', 404)
                throw error
            }
            return {
                message: `Location Deleted for id: ${locationId}`,
                data: result
            }
        } catch (error) {
            logger.error(`[LocationRepository]: Error occurred while fetching the location`)
            throw error
        }
    }
}