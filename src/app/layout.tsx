"use client";

import Navbar from '@/components/Navbar/navbar';
import './globals.css';
import { Baskervville } from 'next/font/google';
import Footer from '@/components/footer/footer';
import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import store, { persistor } from '@/redux/store/store';  
import { PersistGate } from 'redux-persist/integration/react'; 
import { useEffect } from 'react';

const baskerville = Baskervville({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-baskerville',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  useEffect(() => {
    console.log('Estado inicial hidratado:', store.getState());
  }, []);

  return (
    <ClerkProvider>
      <Provider store={store}>
        <PersistGate
          loading={<div>Loading...</div>} 
          persistor={persistor}
          onBeforeLift={() => {
            console.log('PersistGate hidratado correctamente');
          }}
        >
          <html lang="es" className={`${baskerville.variable} font-serif`}>
            <body className={baskerville.className}>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </body>
          </html>
        </PersistGate>
      </Provider>
    </ClerkProvider>
  );
}
