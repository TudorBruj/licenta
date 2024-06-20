'use client';

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating, RatingChangeEvent } from 'primereact/rating';
import { Review, getReviewsByProductId, addReview } from '@/lib/data/reviews';

export default function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getReviewsByProductId(productId);
      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, [productId]);

  const handleAddReview = async () => {
    if (!newReview.trim() || rating <= 0) return;

    const review = {
      user_id: 'current_user_id',
      product_id: productId,
      rating,
      comment: newReview,
    };

    const addedReview = await addReview(review);
    setReviews((prev) => [...prev, addedReview]);
    setNewReview('');
    setRating(0);
  };

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id.toString()} className='mb-4'>
            <p>{review.comment}</p>
            <p>
              Rating: <Rating value={review.rating} readOnly cancel={false} />
            </p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
      <div className='mt-4'>
        <InputTextarea
          className='border-gray-200 w-full border px-4 py-2'
          rows={4}
          placeholder='Write your review...'
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <div className='mt-2 flex items-center'>
          <Rating
            value={rating}
            onChange={(e: RatingChangeEvent) => setRating(e.value ?? 0)}
            cancel={false}
          />
          <Button
            label='Submit Review'
            className='bg-blue-600 text-white hover:bg-blue-700 border-blue-600 ml-4 rounded border px-6 py-3 font-bold transition'
            onClick={handleAddReview}
          />
        </div>
      </div>
    </div>
  );
}
