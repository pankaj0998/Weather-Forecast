import mongoose, { Document, Schema } from "mongoose";
import { configuration } from "../../common/config/configuration";

export interface LocationEntity extends Document {
    locationId: number;
    locationName: string;
    latitude: string;
    longitude: string;
}

const LocationSchema: Schema = new Schema({
    locationId: { type: Number, required: true, unique: true },
    locationName: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
});

// Create and export the Mongoose model
export default mongoose.model<LocationEntity>(configuration.database.collectionName.location, LocationSchema);
