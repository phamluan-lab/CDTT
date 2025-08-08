import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router'
import LayoutSite from './layouts/site'

import RouterSite from './routes/RouterSite';
import RouterAdmin from './routes/RouterAdmin';
import LayoutAdmin from './layouts/admin';
import PostDetail from './pages/frontend/home/PostDetail';
const App = () => {
  return (
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
  )
}

export default App
