'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {
  User,
  addUser,
  getUsers,
  removeUser,
  updateUser,
} from '@/lib/data/users';

export default function UserCrudGrid() {
  let emptyUser = {
    _id: '',
    id: '',
    name: '',
    email: '',
    password: '',
  };

  const [users, setUsers] = useState<User[]>([]);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
  const [user, setUser] = useState<User>(emptyUser);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef<Toast>(null);
  const dt = useRef(null);

  const loadData = async () => {
    const data = await getUsers();
    setUsers(data as any);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const hideDeleteUsersDialog = () => {
    setDeleteUsersDialog(false);
  };

  const saveUser = async () => {
    setSubmitted(true);

    if (user.name.trim() && user.email.trim() && user.password.trim()) {
      let _user = { ...user };

      if (user._id) {
        await updateUser(_user);
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Updated',
          life: 3000,
        });
      } else {
        await addUser(_user);
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Created',
          life: 3000,
        });
      }

      await loadData();
      setUserDialog(false);
      setUser(emptyUser);
    }
  };

  const editUser = (user: User) => {
    setUser({ ...user });
    setUserDialog(true);
  };

  const confirmDeleteUser = (user: User) => {
    setUser(user);
    setDeleteUserDialog(true);
  };

  const deleteUser = async () => {
    await removeUser(user.id);

    await loadData();
    setDeleteUserDialog(false);
    setUser(emptyUser);
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'User Deleted',
      life: 3000,
    });
  };

  const confirmDeleteSelected = () => {
    setDeleteUsersDialog(true);
  };

  const deleteSelectedUsers = async () => {
    for (const user of selectedUsers) {
      await removeUser(user.id);
    }

    await loadData();
    setDeleteUsersDialog(false);
    setSelectedUsers([]);
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Users Deleted',
      life: 3000,
    });
  };

  const header = (
    <div className='align-items-center flex flex-wrap justify-between gap-2'>
      <h4 className='m-0'>Manage Users</h4>
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
          disabled={!selectedUsers || !selectedUsers.length}
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

  const userDialogFooter = (
    <React.Fragment>
      <Button label='Cancel' icon='pi pi-times' outlined onClick={hideDialog} />
      <Button label='Save' icon='pi pi-check' onClick={saveUser} />
    </React.Fragment>
  );

  const deleteUserDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        outlined
        onClick={hideDeleteUserDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        severity='danger'
        onClick={deleteUser}
      />
    </React.Fragment>
  );

  const deleteUsersDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        outlined
        onClick={hideDeleteUsersDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        severity='danger'
        onClick={deleteSelectedUsers}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className='card'>
        <DataTable
          ref={dt}
          value={users}
          selection={selectedUsers}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedUsers(e.value);
            }
          }}
          dataKey='_id'
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
            field='email'
            header='Email'
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field='password'
            header='Password'
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            body={(rowData: User) => (
              <React.Fragment>
                <Button
                  icon='pi pi-pencil'
                  rounded
                  outlined
                  className='mr-2'
                  onClick={() => editUser(rowData)}
                />
                <Button
                  icon='pi pi-trash'
                  rounded
                  outlined
                  severity='danger'
                  onClick={() => confirmDeleteUser(rowData)}
                />
              </React.Fragment>
            )}
            exportable={false}
            style={{ minWidth: '12rem' }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={userDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='User Details'
        modal
        className='p-fluid'
        footer={userDialogFooter}
        onHide={hideDialog}
      >
        <div className='field'>
          <label htmlFor='name' className='font-bold'>
            Name
          </label>
          <InputText
            id='name'
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
            autoFocus
          />
          {submitted && !user.name && (
            <small className='p-error'>Name is required.</small>
          )}
        </div>
        <div className='field'>
          <label htmlFor='email' className='font-bold'>
            Email
          </label>
          <InputText
            id='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          {submitted && !user.email && (
            <small className='p-error'>Email is required.</small>
          )}
        </div>
        <div className='field'>
          <label htmlFor='password' className='font-bold'>
            Password
          </label>
          <InputText
            id='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          {submitted && !user.password && (
            <small className='p-error'>Password is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteUserDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='Confirm'
        modal
        footer={deleteUserDialogFooter}
        onHide={hideDeleteUserDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {user && (
            <span>
              Are you sure you want to delete <b>{user.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteUsersDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header='Confirm'
        modal
        footer={deleteUsersDialogFooter}
        onHide={hideDeleteUsersDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {user && (
            <span>Are you sure you want to delete the selected users?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
