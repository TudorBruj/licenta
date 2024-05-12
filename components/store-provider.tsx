'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore, makePersistor } from '../lib/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  const persistorRef = useRef<Persistor>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  if (!persistorRef.current) {
    // Create the store instance the first time this renders
    persistorRef.current = makePersistor(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
