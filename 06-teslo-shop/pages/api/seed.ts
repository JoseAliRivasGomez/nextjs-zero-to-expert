import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB, disconnectDB } from '../../database/db';
import { initialData } from '../../database/products';
import Product from '../../models/Product';

//SOLO PARA DESARROLLO

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV === 'production'){
        return res.status(401).json({message: 'No tiene acceso a este servicio'});
    }

    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(initialData.products);    

    await disconnectDB();

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}