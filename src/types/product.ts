import { ObjectId } from 'mongodb';

export interface Product {
  id: string;
  name: string;
  price: number;
  sizes: string[];
  category: string;
  image: string[];
  description: string;
}