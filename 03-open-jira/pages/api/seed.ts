import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB, disconnectDB } from '../../database/db';
import { seedData } from '../../database/seed-data';
import EntryModel from '../../models/Entry';

//SOLO PARA DESARROLLO

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV === 'production'){
        return res.status(401).json({message: 'No tiene acceso a este servicio'});
    }

    await connectDB();

    await EntryModel.deleteMany();

    await EntryModel.insertMany(seedData.entries);    

    await disconnectDB();

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}