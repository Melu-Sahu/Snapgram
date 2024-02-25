import React from 'react';
import "./globals.css";
import { Route, Routes } from 'react-router-dom';
import SigninForm from './_auth/_forms/SigninForm';
import { Home } from './_root/pages';
import SignupForm from './_auth/_forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';


const App = () => (
    <main className='flex h-screen'>
        <Routes>

            {/* public Route */}
            <Route element={<AuthLayout />}>
                <Route path='/sign-in' element={<SigninForm />} />
                <Route path='/sign-up' element={<SignupForm />} />
            </Route>



            {/* private Route */}
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
            </Route>

        </Routes>
    </main>
)

export default App
