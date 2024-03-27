import { logger } from "../../common/logger/logger";
import { AddLocationDto } from "../dto/add-location.dto";
import { UpdateLocationDto } from "../dto/update-location.dto";
import { LocationRepository } from "../repository/location.repository";

export class LocationService {
    private locationRepository: LocationRepository;
    constructor() {
        this.locationRepository = new LocationRepository();
    }

    async addLocation(addLocationDto: AddLocationDto) {
        logger.info(`[LocationService:addLocation]: Adding a new location`)
        return await this.locationRepository.addLocation(addLocationDto)
    }

    async getLocations() {
        logger.info(`[LocationService:getLocations]: Fetching all the locations`)
        return await this.locationRepository.getLocations()
    }

    async getLocationById(locationId: number) {
        logger.info(`[LocationService:getLocationById]: Fetching a location by id: ${locationId}`)
        return await this.locationRepository.getLocationById(locationId)
    }

    async updateLocation(locationId: number, updateLocationDto: UpdateLocationDto) {
        logger.info(`[LocationService:updateLocation]: Updating a location for id: ${locationId}`)
        return await this.locationRepository.updateLocation(locationId, updateLocationDto)
    }

    async deleteLocation(locationId: number) {
        logger.info(`[LocationService:deleteLocation]: Deleting a location for id: ${locationId}`)
        return await this.locationRepository.deleteLocation(locationId)
    }
}