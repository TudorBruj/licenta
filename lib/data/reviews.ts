'use server';

import { ObjectId } from 'mongodb';
import {
  addData,
  getData,
  getDataById,
  updateData,
  BaseData,
  removeData,
} from './base';

export interface Review extends BaseData {
  _id: string | ObjectId;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
}

export async function getReviews() {
  return await getData<Review>('reviews');
}

export async function getReviewsByProductId(productId: string) {
  return await getData<Review>('reviews', { product_id: productId });
}

export async function getReviewById(id: string) {
  return await getDataById<Review>('reviews', id);
}

export async function addReview(review: Review) {
  await addData<Review>('reviews', review);
}

export async function updateReview(review: Review) {
  await updateData<Review>('reviews', review);
}

export async function removeReview(id: string) {
  await removeData<Review>('reviews', id);
}
