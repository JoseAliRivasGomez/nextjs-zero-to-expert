import { IProduct } from '../interfaces/products';
import Product from '../models/Product';
import { connectDB, disconnectDB } from './db';

export const getProductBySlug = async(slug: string): Promise<IProduct | null> => {
  
    await connectDB();
    const product = await Product.findOne({slug}).lean();
    await disconnectDB();

    if(!product){
        return null;
    }

    return JSON.parse(JSON.stringify(product));

}

export const getProductsByTerm = async(term: string): Promise<IProduct[]> => {

    term = term.toString().toLowerCase();

    await connectDB();
    const products = await Product.find({
        $text: {$search: term}
    })
    .select('title images price inStock slug -_id')
    .lean();
    await disconnectDB();

    return products;

}

export const getAllProducts = async(): Promise<IProduct[]> => {

    await connectDB();
    const products = await Product.find().lean();
    await disconnectDB();

    return JSON.parse(JSON.stringify(products));

}

interface productSlug {
    slug: string;
}

export const getAllProductSlugs = async(): Promise<productSlug[]> => {
    
    await connectDB();
    const slugs = await Product.find().select('slug -_id').lean();
    await disconnectDB();

    return slugs;

}