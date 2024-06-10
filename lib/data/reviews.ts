'use server';

import { ObjectId } from 'mongodb';
import { addData, getData, getDataById, updateData, BaseData } from './base';

export interface Review extends BaseData {
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
}

export async function getReviews() {
  return await getData<Review>('reviews');
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
