'use server';

import { ObjectId } from 'mongodb';
import { addData, getData, getDataById, removeData, updateData } from './base';

export interface Product {
  _id: string | ObjectId;
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  color: string;
  images: string;
}

export async function getProducts() {
  return await getData<Product>('products');
}

export async function getProductsByCategory(category: string) {
  return await getData<Product>('products', { category });
}

export async function getProductById(id: string) {
  return await getDataById<Product>('products', id);
}

export async function addProduct(product: Product) {
  await addData<Product>('products', product);
}

export async function removeProduct(id: string) {
  await removeData<Product>('products', id);
}

export async function updateProduct(product: Product) {
  await updateData<Product>('products', product);
}
