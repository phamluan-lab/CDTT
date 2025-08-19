import { Component } from "react";
import Product from "../pages/backend/product";
import Dashboard from "../pages/backend/dashboard";
import Brand from "../pages/backend/brand";
import Category from "../pages/backend/category";
import Banner from "../pages/backend/banner";
import Contact from "../pages/backend/contact";
import Menu from "../pages/backend/menu";
import Order from "../pages/backend/order";
import Post from "../pages/backend/post";
import Topic from "../pages/backend/topic";
import User from "../pages/backend/user";
import ProductSale from "../pages/backend/productsale";
import Login from "../pages/backend/auth/Login";
import ProductStore from "../pages/backend/productstore";



const RouterAdmin=[
    {path :'/admin/login', component: Login},
    {path :'/admin', component: Dashboard},
  

    {path :'/admin/product', component: Product.List},
    {path :'/admin/product/trash', component: Product.Trash},
    {path :'/admin/product/create', component: Product.Create},
    {path :'/admin/product/edit/:id', component: Product.Edit},
    {path :'/admin/product/show/:id', component: Product.Show},

      
    {path :'/admin/category', component: Category.List},
    {path :'/admin/category/trash', component:Category.Trash},
    {path :'/admin/category/create', component: Category.Create},
    {path :'/admin/category/edit/:id', component: Category.Edit},
    {path :'/admin/category/show/:id', component: Category.Show},

    {path :'/admin/brand', component: Brand.List},
    {path :'/admin/brand/trash', component: Brand.Trash},
    {path :'/admin/brand/create', component:  Brand.Create},
    {path :'/admin/brand/edit/:id', component:  Brand.Edit},
    {path :'/admin/brand/show/:id', component: Brand.Show},

    {path :'/admin/banner', component: Banner.List},
    {path :'/admin/banner/trash', component: Banner.Trash},
    {path :'/admin/banner/create', component:  Banner.Create},
    {path :'/admin/banner/edit/:id', component:  Banner.Edit},
    {path :'/admin/banner/show/:id', component: Banner.Show},

    {path :'/admin/contact', component: Contact.List},
    {path :'/admin/contact/trash', component: Contact.Trash},
    {path :'/admin/contact/create', component: Contact.Create},
    {path :'/admin/contact/edit/:id', component: Contact.Edit},
    {path :'/admin/contact/show/:id', component: Contact.Show},

    {path :'/admin/menu', component: Menu.List},
    {path :'/admin/menu/trash', component: Menu.Trash},
    {path :'/admin/menu/create', component: Menu.Create},
    {path :'/admin/menu/edit/:id', component: Menu.Edit},
    {path :'/admin/menu/show/:id', component: Menu.Show},

    {path :'/admin/order', component: Order.List},
    {path :'/admin/order/trash', component: Order.Trash},
    {path :'/admin/order/create', component: Order.Create},
    {path :'/admin/order/edit/:id', component: Order.Edit},
    {path :'/admin/order/show/:id', component: Order.Show},

    {path :'/admin/post', component: Post.List},
    {path :'/admin/post/trash', component: Post.Trash},
    {path :'/admin/post/create', component: Post.Create},
    {path :'/admin/post/edit/:id', component: Post.Edit},
    {path :'/admin/post/show/:id', component: Post.Show},

    {path :'/admin/topic', component: Topic.List},
    {path :'/admin/topic/trash', component: Topic.Trash},
    {path :'/admin/topic/create', component: Topic.Create},
    {path :'/admin/topic/edit/:id', component: Topic.Edit},
    {path :'/admin/topic/show/:id', component: Topic.Show},

    {path :'/admin/user', component: User.List},
    {path :'/admin/user/trash', component: User.Trash},
    {path :'/admin/user/create', component: User.Create},
    {path :'/admin/user/edit/:id', component: User.Edit},
    {path :'/admin/user/show/:id', component: User.Show},

    {path :'/admin/product-sales', component: ProductSale.List},
    {path :'/admin/product-sales/create', component: ProductSale.Create},
    {path :'/admin/product-sales/edit/:id', component: ProductSale.Edit},

    {path :'/admin/product-store', component: ProductStore.List},
    {path :'/admin/product-stores/:id', component: ProductStore.List}, // Thêm :id vào path

];

export default RouterAdmin;