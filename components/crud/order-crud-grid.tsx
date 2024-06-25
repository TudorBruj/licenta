'use client';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import {
  Order,
  addOrder,
  getOrders,
  removeOrder,
  updateOrder,
} from '@/lib/data/orders';

export default function OrderCrudGrid() {
  let emptyOrder = {
    _id: '',
    id: '',
    user_id: '',
    total_amount: 0,
  };

  const [orders, setOrders] = useState<Order[]>([]);
  const [orderDialog, setOrderDialog] = useState(false);
  const [deleteOrderDialog, setDeleteOrderDialog] = useState(false);
  const [deleteOrdersDialog, setDeleteOrdersDialog] = useState(false);
  const [order, setOrder] = useState<Order>(emptyOrder);
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const toast = useRef<Toast>(null);
  const dt = useRef(null);

  const loadData = async () => {
    const data = await getOrders();
    setOrders(data as any);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openNew = () => {
    setOrder(emptyOrder);
    setSubmitted(false);
    setOrderDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setOrderDialog(false);
  };

  const hideDeleteOrderDialog = () => {
    setDeleteOrderDialog(false);
  };

  const hideDeleteOrdersDialog = () => {
    setDeleteOrdersDialog(false);
  };

  const saveOrder = async () => {
    setSubmitted(true);

    if (order.user_id.trim()) {
      let _order = { ...order };

      if (order.id) {
        await updateOrder(_order);
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Order Updated',
          life: 3000,
        });
      } else {
        await addOrder(_order);
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Order Created',
          life: 3000,
        });
      }

      await loadData();
      setOrderDialog(false);
      setOrder(emptyOrder);
    }
  };

  const editOrder = (order: Order) => {
    setOrder({ ...order, user_id: order.user_id.toString() });
    setOrderDialog(true);
  };

  const confirmDeleteOrder = (order: Order) => {
    setOrder(order);
    setDeleteOrderDialog(true);
  };

  const deleteOrder = async () => {
    await removeOrder(order.id);

    await loadData();
    setDeleteOrderDialog(false);
    setOrder(emptyOrder);
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Order Deleted',
      life: 3000,
    });
  };

  const confirmDeleteSelected = () => {
    setDeleteOrdersDialog(true);
  };

  const deleteSelectedOrders = async () => {
    for (const order of selectedOrders) {
      await removeOrder(order.id);
    }

    await loadData();
    setDeleteOrdersDialog(false);
    setSelectedOrders([]);
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Orders Deleted',
      life: 3000,
    });
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || '';
    let _order = { ...order };

    // @ts-ignore
    _order[name] = val;

    setOrder(_order);
  };

  const onInputNumberChange = (
    e: InputNumberValueChangeEvent,
    name: string
  ) => {
    const val = e.value ?? 0;
    let _order = { ...order };

    // @ts-ignore
    _order[name] = val;

    setOrder(_order);
  };

  const totalAmountBodyTemplate = (rowData: Order) => {
    return rowData.total_amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const actionBodyTemplate = (rowData: Order) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          rounded
          outlined
          className='mr-2'
          onClick={() => editOrder(rowData)}
        />
        <Button
          icon='pi pi-trash'
          rounded
          outlined
          severity='danger'
          onClick={() => confirmDeleteOrder(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className='align-items-center flex flex-wrap justify-between gap-2'>
      <h4 className='m-0'>Manage Orders</h4>
      <div className='flex items-center gap-2'>
        <Button
          label='New'
          icon='pi pi-plus'
          severity='success'
          onClick={openNew}
          className='mr-4'
        />
        <Button
          label='Delete'
          icon='pi pi-trash'
          severity='danger'
          onClick={confirmDeleteSelected}
          disabled={!selectedOrders || !selectedOrders.length}
          className='mr-4'
        />
        <InputText
          value={globalFilter || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGlobalFilter(e.target.value)
          }
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

  const orderDialogFooter = (
    <React.Fragment>
      <Button label='Cancel' icon='pi pi-times' outlined onClick={hideDialog} />
      <Button label='Save' icon='pi pi-check' onClick={saveOrder} />
    </React.Fragment>
  );

  const deleteOrderDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        outlined
        onClick={hideDeleteOrderDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        severity='danger'
        onClick={deleteOrder}
      />
    </React.Fragment>
  );

  const deleteOrdersDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        outlined
        onClick={hideDeleteOrdersDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        severity='danger'
        onClick={deleteSelectedOrders}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className='card'>
        <DataTable
          ref={dt}
          value={orders}
          selection={selectedOrders}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedOrders(e.value);
            }
          }}
          dataKey='id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          globalFilter={globalFilter}
          header={header}
          selectionMode='multiple'
        >
          <Column
            field='user_id'
            header='User ID'
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field='total_amount'
            header='Total Amount'
            body={totalAmountBodyTemplate}
            sortable
            style={{ minWidth: '8rem' }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '12rem' }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={orderDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='Order Details'
        modal
        className='p-fluid'
        footer={orderDialogFooter}
        onHide={hideDialog}
      >
        <div className='field'>
          <label htmlFor='user_id' className='font-bold'>
            User ID
          </label>
          <InputText
            id='user_id'
            value={order.user_id.toString()}
            onChange={(e) => onInputChange(e, 'user_id')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !order.user_id })}
          />
          {submitted && !order.user_id && (
            <small className='p-error'>User ID is required.</small>
          )}
        </div>
        <div className='field'>
          <label htmlFor='total_amount' className='font-bold'>
            Total Amount
          </label>
          <InputNumber
            id='total_amount'
            value={order.total_amount}
            onValueChange={(e) => onInputNumberChange(e, 'total_amount')}
            mode='currency'
            currency='USD'
            locale='en-US'
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteOrderDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='Confirm'
        modal
        footer={deleteOrderDialogFooter}
        onHide={hideDeleteOrderDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {order && (
            <span>
              Are you sure you want to delete order for user{' '}
              <b>{order.user_id}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteOrdersDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='Confirm'
        modal
        footer={deleteOrdersDialogFooter}
        onHide={hideDeleteOrdersDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {order && (
            <span>Are you sure you want to delete the selected orders?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
