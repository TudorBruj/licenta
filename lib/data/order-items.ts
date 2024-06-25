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

export interface OrderItem extends BaseData {
  order_id: string | ObjectId;
  product_id: string | ObjectId;
  quantity: number;
  price: number;
}

export async function getOrderItems() {
  return await getData<OrderItem>('order_items');
}

export async function getOrderItemById(id: string) {
  return await getDataById<OrderItem>('order_items', id);
}

export async function addOrderItem(orderItem: OrderItem) {
  await addData<OrderItem>('order_items', orderItem);
}

export async function removeOrderItem(id: string) {
  await removeData<OrderItem>('order_items', id);
}

export async function updateOrderItem(orderItem: OrderItem) {
  await updateData<OrderItem>('order_items', orderItem);
}
