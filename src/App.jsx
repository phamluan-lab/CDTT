<<<<<<< HEAD
import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router'
import LayoutSite from './layouts/site'
=======
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
import LayoutSite from './layouts/site'
import Login from './pages/backend/auth/Login';
import RouterSite from './routes/RouterSite';
import RouterAdmin from './routes/RouterAdmin';
import LayoutAdmin from './layouts/admin';
import PostDetail from './pages/frontend/home/PostDetail';
import PrivateRoute from './pages/backend/PrivateRoute';
import { FavoriteProvider } from './pages/frontend/contexts/FavoriteContext';
import Favorites from './pages/frontend/Favorites';
import ProductDetail from './pages/frontend/product/ProductDetail';

// Thay thế bằng Client ID của bạn từ Google Cloud Console
const GOOGLE_CLIENT_ID = "532070274164-h89o1fjpnar7e201haqeem0goth5l2pr.apps.googleusercontent.com";
>>>>>>> 6358b48 (cap nhat code)

import RouterSite from './routes/RouterSite';
import RouterAdmin from './routes/RouterAdmin';
import LayoutAdmin from './layouts/admin';
import PostDetail from './pages/frontend/home/PostDetail';
const App = () => {
  return (
<<<<<<< HEAD
    <BrowserRouter>
    <Routes>
      <Route element={<LayoutSite />}>
          { RouterSite.map((route , index)=>{
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />
          })}
      </Route>
      <Route element={<LayoutAdmin />}>
          { RouterAdmin.map((route , index)=>{
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />
          })}
      </Route>
      <Route>
        <Route path="/post-detail/:slug" element={<PostDetail />} />  {/* Đảm bảo path đúng */}
      </Route>
     
     
    </Routes>
  </BrowserRouter>
=======
    <FavoriteProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            {/* Frontend Routes */}
            <Route element={<LayoutSite />}>
              {RouterSite.map((route, index) => {
                const Page = route.component;
                return <Route key={index} path={route.path} element={<Page />} />
              })}
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
            </Route>

            {/* Post detail route */}
            <Route path="/post-detail/:slug" element={<PostDetail />} />

            {/* Admin Routes - Không cần Google OAuth */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={<LayoutAdmin />}
            >
              {RouterAdmin.map((route, index) => {
                const Page = route.component;
                return <Route key={index} path={route.path} element={<Page />} />
              })}
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </FavoriteProvider>
>>>>>>> 6358b48 (cap nhat code)
  )
}

export default App
<<<<<<< HEAD
=======


>>>>>>> 6358b48 (cap nhat code)
