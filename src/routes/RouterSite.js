import Home from "../pages/frontend/home/Home";
import Product from "../pages/frontend/Product";
import Contact from "../pages/frontend/Contact";
import ProductDetail from "../pages/frontend/product/ProductDetail";
import PostList from "../pages/frontend/home/PostList";
import PostDetail from "../pages/frontend/home/PostDetail";
import ProductCategory from "../pages/frontend/home/ProductCategory";
import Register from "../pages/frontend/Register";
import Login from "../pages/frontend/Login";
import Account from "../pages/frontend/Account";
import CartPage from "../pages/frontend/home/CartPage";
import PostSale from "../pages/frontend/home/PostSale";
import Products from "../pages/frontend/Products";
import PostsByCategory from "../pages/frontend/PostsByCategory";
import Favorites from "../pages/frontend/Favorites";
import PaymentSuccess from "../pages/PaymentSuccess";
const RouterSite=[
    {path :'/', component: Home},
    {path :'/san-pham', component: Product },
    {path :'/san-pham/:slug', component: ProductDetail },
    {path :'/lien-he', component: Contact },
    {path :'/tin-tuc', component: PostList },
    {path: '/post-detail/:id', component:PostDetail },
    {path: '/danh-muc/:id', component: ProductCategory},
    {path: '/dang-ky', component: Register},
    {path: '/dang-nhap', component: Login},
    { path: '/tai-khoan', component: Account },
    { path: '/gio-hang', component: CartPage },
    { path: '/khuyen-mai', component: PostSale },
    {path: '/danh-muc', component: Products},
    {path: '/bai-viet', component: PostsByCategory},
    {path: '/favorites', component: Favorites},
    {path: '/payment-success', component: PaymentSuccess}
  


];
export default RouterSite;