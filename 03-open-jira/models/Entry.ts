import mongoose, {Model, Schema} from 'mongoose';
import { Entry } from '../interfaces/entry';

export interface IEntry extends Entry {}

const entrySchema = new Schema({
    //id: {type: Schema.Types.ObjectId, required: true},
    description: {type: String, required: true},
    createdAt: {type: Number},
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'pending',
    },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;