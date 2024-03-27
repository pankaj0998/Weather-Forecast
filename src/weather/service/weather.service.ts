import Location from "../../locations/entity/location.entity";
import { CustomError } from "../../common/error/error";
import axios from "axios";
import { configuration } from "../../common/config/configuration";
import { logger } from "../../common/logger/logger";

export class WeatherService {

    async getWeatherForecast(locationId: number) {
        const checkLocation = await Location.findOne({ locationId: locationId }, { _id: 0, _v: 0 }).exec()
        if (!checkLocation) {
            const error = new CustomError('Location Not Found', 404);
            throw error;
        }
        logger.info(`[WeatherService: getWeatherForecast]: Calling a external service to fetch the weather`)
        return axios.get(`${configuration.externalConfig.weatherBaseUrl}?q=${checkLocation.locationName}&${configuration.externalConfig.queryUrl}=${configuration.externalConfig.apiKey}&units=metric`)
            .then(res => {
                const result = {
                    locationName: res?.data?.name,
                    latitude: res?.data?.coord?.lat,
                    longitude: res?.data?.coord?.lon,
                    temperature: res?.data?.main?.temp,
                    minTemperature: res?.data?.main?.temp_min,
                    maxTemperature: res?.data?.main?.temp_max,
                    pressure: res?.data?.main?.pressure,
                    humidity: res?.data?.main?.humidity,
                    country: res?.data?.sys?.country,
                    windSpeed: res?.data?.wind?.speed
                }
                return { data: result }
            }).catch((error: any) => {
                logger.error(`[WeatherService: getWeatherForecast]: Error occured`, JSON.stringify(error))
                if (error.response.status === 401) {
                    throw new CustomError("Unauthorised", 401);
                }
                else {
                    throw error;
                }
            })
    }

    async getWeatherHistory(latitude: number, longitude: number, numberOfDays: number) {
        logger.info(`[WeatherService: getWeatherHistory]: Calling a external service to fetch the weather hisory`)
        return axios.get(`${configuration.externalConfig.historyBaseUrl}?lat=${latitude}&lon=${longitude}&${configuration.externalConfig.queryUrl}=${configuration.externalConfig.apiKey}&counts=${numberOfDays}`)
            .then(res => {
                return { data: res.data }
            }).catch((error: any) => {
                logger.error(`[WeatherService: getWeatherHistory]: Error occured`, JSON.stringify(error))
                if (error.response.status === 401) {
                    throw new CustomError("Unauthorised", 401);
                }
                else {
                    throw error;
                }
            })
    }


}