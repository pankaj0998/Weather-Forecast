import rateLimit from 'express-rate-limit'
import { configuration } from '../config/configuration';


const option = {
    windowMs: configuration.rateLimit.windowMs,
    max: configuration.rateLimit.maxRequest,
    message: "You have exceeded your limit",
    headers: true,
}
export const rateLimitMiddleware = rateLimit(option);