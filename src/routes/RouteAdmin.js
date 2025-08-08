
import Dashboard from "../pages/backend/dashboard";
import Banner from "../pages/backend/banner";


const RouterAdmin=[
    {path :'/admin', component: Dashboard},

    {path :'/admin/banner', component: Banner.List},
    {path :'/admin/banner/trash', component: Banner.Trash},
    {path :'/admin/banner/create', component:  Banner.Create},
    {path :'/admin/banner/edit/:id', component:  Banner.Edit},
    {path :'/admin/banner/show/:id', component: Banner.Show},
 
];


export default RouterAdmin;