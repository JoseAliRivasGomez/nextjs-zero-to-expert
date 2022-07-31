
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB, disconnectDB } from '../../../database/db'
import EntryModel, { IEntry } from '../../../models/Entry'
import { Entry } from '../../../interfaces/entry';

type Data = 
| { message: string }
| IEntry[]
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res)

        case 'POST':
            return insertEntry(req, res);
                
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}

const getEntries = async (res: NextApiResponse<Data>) => {
    await connectDB();

    const entries = await EntryModel.find().sort({createdAt: 'ascending'});

    await disconnectDB();

    res.status(200).json(entries)
}

const insertEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {description = ''} = req.body;

    const newEntry = new EntryModel({
        description,
        createdAt: Date.now(),
    })

    try {
        await connectDB();
        await newEntry.save();
        await disconnectDB();

        return res.status(201).json(newEntry);
    } catch (error) {
        await disconnectDB();
        console.log(error);

        return res.status(400).json({message: 'Algo salio mal'});
    }
    
}