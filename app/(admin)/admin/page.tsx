'use client';

import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import ProductCrudGrid from '@/components/crud/product-crud-grid';
import UserCrudGrid from '@/components/crud/user-crud-grid';

export default function RouterDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (event: any) => {
    setActiveIndex(event.index);
  };

  const items: MenuItem[] = [
    { label: 'Products', icon: 'pi pi-list' },
    { label: 'Users', icon: 'pi pi-users' },
    { label: 'Orders', icon: 'pi pi-box' },
    { label: 'Reviews', icon: 'pi pi-comment' },
  ];

  return (
    <div className='card'>
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
      {activeIndex === 0 && <ProductCrudGrid />}{' '}
      {activeIndex === 1 && <UserCrudGrid />}{' '}
    </div>
  );
}
