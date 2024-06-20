'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Rating, RatingChangeEvent } from 'primereact/rating';
import {
  Review,
  addReview,
  getReviews,
  updateReview,
  removeReview,
} from '@/lib/data/reviews';

export default function ReviewCrudGrid() {
  const emptyReview: Review = {
    _id: '',
    id: '',
    user_id: '',
    product_id: '',
    rating: 0,
    comment: '',
  };

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [deleteReviewDialog, setDeleteReviewDialog] = useState(false);
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

  const hideDeleteReviewDialog = () => {
    setDeleteReviewDialog(false);
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

  const confirmDeleteReview = (review: Review) => {
    setReview(review);
    setDeleteReviewDialog(true);
  };

  const deleteReview = async () => {
    await removeReview(review.id);
    loadReviews();
    setDeleteReviewDialog(false);
    setReview(emptyReview);
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Review Deleted',
      life: 3000,
    });
  };

  const actionBodyTemplate = (rowData: Review) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          onClick={() => editReview(rowData)}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          onClick={() => confirmDeleteReview(rowData)}
        />
      </React.Fragment>
    );
  };

  const editReview = (review: Review) => {
    setReview({ ...review });
    setReviewDialog(true);
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

  const deleteReviewDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        outlined
        onClick={hideDeleteReviewDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        className='p-button-danger'
        onClick={deleteReview}
      />
    </React.Fragment>
  );

  const ratingBodyTemplate = (rowData: Review) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const ratingEditor = (options: any) => {
    return (
      <Rating
        value={options.value}
        onChange={(e: RatingChangeEvent) =>
          options.editorCallback(e.value ?? 0)
        }
        cancel={false}
      />
    );
  };

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
          <Column
            field='rating'
            header='Rating'
            body={ratingBodyTemplate}
            editor={(options) => ratingEditor(options)}
            sortable
          ></Column>
          <Column field='comment' header='Comment' sortable></Column>
          <Column body={actionBodyTemplate}></Column>
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
          <Rating
            value={review.rating}
            onChange={(e: RatingChangeEvent) =>
              setReview({ ...review, rating: e.value ?? 0 })
            }
            cancel={false}
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

      <Dialog
        visible={deleteReviewDialog}
        style={{ width: '450px' }}
        header='Confirm'
        modal
        footer={deleteReviewDialogFooter}
        onHide={hideDeleteReviewDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {review && (
            <span>
              Are you sure you want to delete the review by{' '}
              <b>{review.user_id}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
