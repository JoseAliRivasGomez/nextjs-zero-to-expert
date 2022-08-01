import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB, disconnectDB } from '../../../database/db';
import EntryModel, { IEntry } from '../../../models/Entry';

type Data =
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const {id} = req.query;

    if (!mongoose.isValidObjectId(id)){
        return res.status(400).json({ message: 'El id no es valido ' + id });
    }

    switch (req.method) {
        case 'GET':
            return getEntry(req,res);

        case 'PUT':
            return updateEntry(req,res);

        case 'DELETE':
            return deleteEntry(req,res);
    
        default:
            return res.status(400).json({ message: 'El metodo no existe' });
    }

}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;

    try {
        await connectDB();
        const entryToGet = await EntryModel.findById(id);
        await disconnectDB();

        if(!entryToGet){
            return res.status(400).json({message: 'No hay una entrada con ese ID: ' + id});
        }

        return res.status(200).json(entryToGet!);

    } catch (error) {
        await disconnectDB();
        console.log(error);

        return res.status(400).json({message: 'Algo salio mal'});
    }
    
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;

    try {
        await connectDB();
        const entryToUpdate = await EntryModel.findById(id);

        if(!entryToUpdate){
            await disconnectDB();
            return res.status(400).json({message: 'No hay una entrada con ese ID: ' + id});
        }
        
        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status
        } = req.body;

        const updatedEntry = await EntryModel.findByIdAndUpdate(id, {description, status}, {runValidators:true, new: true});

        await disconnectDB();
        return res.status(200).json(updatedEntry!);

    } catch (error) {
        await disconnectDB();
        console.log(error);

        return res.status(400).json({message: 'Algo salio mal'});
    }
    
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;

    try {
        await connectDB();
        const entryToDelete = await EntryModel.findById(id);

        if(!entryToDelete){
            await disconnectDB();
            return res.status(400).json({message: 'No hay una entrada con ese ID: ' + id});
        }

        await EntryModel.findByIdAndDelete(id);

        await disconnectDB();
        return res.status(200).json({ message: "Entrada eliminada" });

    } catch (error) {
        await disconnectDB();
        console.log(error);

        return res.status(400).json({message: 'Algo salio mal'});
    }
    
}