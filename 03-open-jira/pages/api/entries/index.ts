import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB, disconnectDB } from '../../../database/db'
import EntryModel, { IEntry } from '../../../models/Entry'
import { Entry } from '../../../interfaces/entry';

type Data = 
| { message: string }
| IEntry[]
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const {id} = req.query;

    if (id && !mongoose.isValidObjectId(id)){
        return res.status(400).json({ message: 'El id no es valido ' + id });
    }

    switch (req.method) {
        case 'GET':
            return getEntries(req, res)

        case 'POST':
            return insertEntry(req, res);

        case 'PUT':
            return updateEntry(req,res);

        case 'DELETE':
            return deleteEntry(req,res);
            
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;

    if(id){

        try {
            await connectDB();
            const entryToGet = await EntryModel.findById(id);
            await disconnectDB();
    
            if(!entryToGet){
                return res.status(404).json({message: 'No hay una entrada con ese ID: ' + id});
            }
    
            return res.status(200).json(entryToGet!);
    
        } catch (error) {
            await disconnectDB();
            console.log(error);
    
            return res.status(400).json({message: 'Algo salio mal'});
        }

    }else{

        await connectDB();

        const entries = await EntryModel.find().sort({createdAt: 'ascending'});
    
        await disconnectDB();
    
        res.status(200).json(entries)

    }

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


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;

    try {
        await connectDB();
        const entryToUpdate = await EntryModel.findById(id);

        if(!entryToUpdate){
            await disconnectDB();
            return res.status(404).json({message: 'No hay una entrada con ese ID: ' + id});
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
            return res.status(404).json({message: 'No hay una entrada con ese ID: ' + id});
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