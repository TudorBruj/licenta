'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {
  Review,
  addReview,
  getReviews,
  updateReview,
} from '@/lib/data/reviews';

export default function ReviewCrudGrid() {
  const emptyReview: Review = {
    _id: '',
    user_id: '',
    product_id: '',
    rating: 0,
    comment: '',
  };

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [review, setReview] = useState<Review>(emptyReview);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);

  const loadReviews = async () => {
    const data = await getReviews();
    setReviews(data);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const openNew = () => {
    setReview(emptyReview);
    setSubmitted(false);
    setReviewDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setReviewDialog(false);
  };

  const saveReview = async () => {
    setSubmitted(true);

    if (review.comment.trim()) {
      let _review = { ...review };

      if (_review._id) {
        await updateReview(_review);
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Review Updated',
          life: 3000,
        });
      } else {
        await addReview(_review);
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Review Created',
          life: 3000,
        });
      }

      loadReviews();
      setReviewDialog(false);
      setReview(emptyReview);
    }
  };

  const header = (
    <div className='align-items-center flex flex-wrap justify-between gap-2'>
      <h4 className='m-0'>Manage Reviews</h4>
      <div className='flex items-center gap-2'>
        <Button
          label='New'
          icon='pi pi-plus'
          severity='success'
          onClick={openNew}
          className='mr-4'
        />
        <InputText
          type='search'
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder='Search'
          className='mr-4'
        />
        <Button
          icon='pi pi-search'
          className='p-button-rounded p-button-text'
        />
      </div>
    </div>
  );

  const reviewDialogFooter = (
    <React.Fragment>
      <Button label='Cancel' icon='pi pi-times' outlined onClick={hideDialog} />
      <Button label='Save' icon='pi pi-check' onClick={saveReview} />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className='card'>
        <DataTable
          value={reviews}
          header={header}
          globalFilter={globalFilter}
          responsiveLayout='scroll'
        >
          <Column field='user_id' header='User ID' sortable></Column>
          <Column field='product_id' header='Product ID' sortable></Column>
          <Column field='rating' header='Rating' sortable></Column>
          <Column field='comment' header='Comment' sortable></Column>
        </DataTable>
      </div>

      <Dialog
        visible={reviewDialog}
        style={{ width: '450px' }}
        header='Review Details'
        modal
        className='p-fluid'
        footer={reviewDialogFooter}
        onHide={hideDialog}
      >
        <div className='field'>
          <label htmlFor='user_id'>User ID</label>
          <InputText
            id='user_id'
            value={review.user_id}
            onChange={(e) => setReview({ ...review, user_id: e.target.value })}
            required
            autoFocus
          />
        </div>

        <div className='field'>
          <label htmlFor='product_id'>Product ID</label>
          <InputText
            id='product_id'
            value={review.product_id}
            onChange={(e) =>
              setReview({ ...review, product_id: e.target.value })
            }
            required
          />
        </div>

        <div className='field'>
          <label htmlFor='rating'>Rating</label>
          <InputText
            id='rating'
            type='number'
            value={review.rating.toString()}
            onChange={(e) =>
              setReview({ ...review, rating: parseInt(e.target.value) })
            }
            required
          />
        </div>

        <div className='field'>
          <label htmlFor='comment'>Comment</label>
          <InputText
            id='comment'
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            required
          />
        </div>
      </Dialog>
    </div>
  );
}
