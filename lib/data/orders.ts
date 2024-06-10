'use server';

import { ObjectId } from 'mongodb';
import {
  BaseData,
  addData,
  getData,
  getDataById,
  removeData,
  updateData,
} from './base';

export interface OrderItem {
  product_id: string | ObjectId;
  quantity: number;
  price: number;
}

export interface Order extends BaseData {
  user_id: string;
  total_amount: number;
  items: OrderItem[];
}

export async function getOrders() {
  return await getData<Order>('orders');
}

export async function getOrderById(id: string) {
  return await getDataById<Order>('orders', id);
}

export async function addOrder(order: Order) {
  await addData<Order>('orders', order);
}

export async function removeOrder(id: string) {
  await removeData<Order>('orders', id);
}

export async function updateOrder(order: Order) {
  await updateData<Order>('orders', order);
}
