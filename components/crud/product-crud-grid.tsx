'use client';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {
  Product,
  addProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from '@/lib/data/products';

export default function ProductCrudGrid() {
  let emptyProduct = {
    _id: '',
    id: '',
    name: '',
    images: '',
    description: '',
    category: '',
    price: 0,
    quantity: 0,
    color: '',
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef<Toast>(null);
  const dt = useRef(null);

  const loadData = async () => {
    const data = await getProducts();
    setProducts(data as any);
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _product = { ...product };

      if (product.id) {
        await updateProduct(_product);
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        _product.images = 'product-placeholder.svg';
        await addProduct(_product);
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      await loadData();
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product: Product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: Product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    await removeProduct(product.id);

    await loadData();
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    });
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = async () => {
    for (const product of selectedProducts) {
      await removeProduct(product.id);
    }

    await loadData();
    setDeleteProductsDialog(false);
    setSelectedProducts([]);
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
  };

  const onCategoryChange = (e: any) => {
    let _product = { ...product };

    _product['category'] = e.value;
    setProduct(_product);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    // @ts-ignore
    _product[name] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (
    e: InputNumberValueChangeEvent,
    name: string
  ) => {
    const val = e.value ?? 0;
    let _product = { ...product };

    // @ts-ignore
    _product[name] = val;

    setProduct(_product);
  };

  const imageBodyTemplate = (rowData: Product) => {
    return (
      <img
        src={rowData.images}
        alt={rowData.images}
        className='shadow-2 border-round'
        style={{ width: '64px' }}
      />
    );
  };

  const priceBodyTemplate = (rowData: Product) => {
    return formatCurrency(rowData.price);
  };

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          rounded
          outlined
          className='mr-2'
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon='pi pi-trash'
          rounded
          outlined
          severity='danger'
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className='align-items-center flex flex-wrap justify-between gap-2'>
      <h4 className='m-0'>Manage Products</h4>
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
          disabled={!selectedProducts || !selectedProducts.length}
          className='mr-4'
        />
        <InputText
          v-model='value1'
          onInput={(e: any) => setGlobalFilter(e.target.value)}
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
  const productDialogFooter = (
    <React.Fragment>
      <Button label='Cancel' icon='pi pi-times' outlined onClick={hideDialog} />
      <Button label='Save' icon='pi pi-check' onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        severity='danger'
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        severity='danger'
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className='card'>
        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedProducts(e.value);
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
            field='name'
            header='Name'
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field='image'
            header='Image'
            body={imageBodyTemplate}
          ></Column>
          <Column
            field='price'
            header='Price'
            body={priceBodyTemplate}
            sortable
            style={{ minWidth: '8rem' }}
          ></Column>
          <Column
            field='category'
            header='Category'
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '12rem' }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='Product Details'
        modal
        className='p-fluid'
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {product.images && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.images}`}
            alt={product.images}
            className='product-image m-auto block pb-3'
          />
        )}
        <div className='field'>
          <label htmlFor='name' className='font-bold'>
            Name
          </label>
          <InputText
            id='name'
            value={product.name}
            onChange={(e) => onInputChange(e, 'name')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !product.name })}
          />
          {submitted && !product.name && (
            <small className='p-error'>Name is required.</small>
          )}
        </div>
        <div className='field'>
          <label htmlFor='description' className='font-bold'>
            Description
          </label>
        </div>

        <div className='field'>
          <label className='mb-3 font-bold'>Category</label>
          <div className='formgrid grid'>
            <div className='field-radiobutton col-6'>
              <RadioButton
                inputId='category1'
                name='category'
                value='Accessories'
                onChange={onCategoryChange}
                checked={product.category === 'Accessories'}
              />
              <label htmlFor='category1'>Accessories</label>
            </div>
            <div className='field-radiobutton col-6'>
              <RadioButton
                inputId='category2'
                name='category'
                value="men's clothing"
                onChange={onCategoryChange}
                checked={product.category === "men's clothing"}
              />
              <label htmlFor='category2'>Men Clothing</label>
            </div>
            <div className='field-radiobutton col-6'>
              <RadioButton
                inputId='category3'
                name='category'
                value="women's clothing"
                onChange={onCategoryChange}
                checked={product.category === "women's clothing"}
              />
              <label htmlFor='category3'>Women Clothing</label>
            </div>
          </div>
        </div>

        <div className='formgrid grid'>
          <div className='field col'>
            <label htmlFor='price' className='font-bold'>
              Price
            </label>
            <InputNumber
              id='price'
              value={product.price}
              onValueChange={(e) => onInputNumberChange(e, 'price')}
              mode='currency'
              currency='USD'
              locale='en-US'
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='Confirm'
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='Confirm'
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
