import React from 'react';
import "./globals.css";
import { Route, Routes } from 'react-router-dom';
import SigninForm from './_auth/_forms/SigninForm';
import { AllUsers, CreatePost, EditPost, Explore, Home, LikedPosts, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import SignupForm from './_auth/_forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"





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
                <Route path='/explore' element={<Explore />} />
                <Route path='/saved' element={<Saved />} />
                <Route path='/all-users' element={<AllUsers />} />
                <Route path='/create-post' element={<CreatePost />} />
                <Route path='/liked-posts' element={<LikedPosts />} />
                <Route path='/update-post/:id' element={<EditPost />} />
                <Route path='/post/:id' element={<PostDetails />} />
                <Route path='/profile/:id/*' element={<Profile />} />
                <Route path='/update-profile/:id' element={<UpdateProfile />} />
            </Route>

        </Routes>
        <Toaster />
    </main>
)

export default App
