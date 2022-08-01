import { isValidObjectId } from 'mongoose';
import EntryModel, { IEntry } from '../models/Entry';
import { connectDB, disconnectDB } from './db';

export const getEntryById = async(id: string): Promise<IEntry | null> => {
  
    if(!isValidObjectId(id)) return null;

    await connectDB();
    const entry = await EntryModel.findById(id).lean();
    await disconnectDB();

    return JSON.parse(JSON.stringify(entry));

}
