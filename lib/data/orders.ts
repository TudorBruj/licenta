'use server';

import {
  BaseData,
  addData,
  getData,
  getDataById,
  removeData,
  updateData,
} from './base';

export interface Order extends BaseData {
  user_id: string;
  total_amount: number;
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
