import { createRouter, createWebHistory } from "vue-router";
// public views (routes)
import Home from "../views/public/Home.vue";    // import component Home
import Profile from "../views/public/Profile.vue";
import Contact from "../views/public/Contact.vue";
import Igra from "../views/public/Igre.vue"
import SignIn from "../views/public/SignIn.vue"
import Registration from "../views/public/Registration.vue"
import GameDetails from "../views/public/GameDetails.vue"
import NotFound from '@/views/Error404.vue'
//
// admin views (routes)
import AdminHome from "../views/admin/adminHome.vue"
import ManageUsers from "../views/admin/manageUsers.vue"
import ManageGames from "../views/admin/manageGames.vue"
import UserDetails from "@/views/admin/userDetails"
//
// private views (routes)
import UserHome from "../views/private/UserHome.vue"
import PrivateGameDetails from "../views/private/PrivateGameDetails.vue"
import ShoppingBasket from "@/views/private/ShoppingBasket"
import OrderDetails from "@/views/private/OrderDetails"

const routes = [
  {
    path: "/",        // path after localhost8080/  - default path always loads the Homo component - if we are just at localhost8080
    name: "Home",
    component: Home,  // name of the component we want to load
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/about/",
    name: "About",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/public/About.vue"),  // dynamically imported -> lazy-loaded route + magic comments give our route a name
  },
  {
    path: "/game",
    name: "Game",
    component: Igra,
  },
  {
    path: "/GameDetails/:name:id",
    name: "GameDetails",
    component: GameDetails,
    props: true,  // we can accept any route parameters as props
  },

  { path: "/signIn", name: "SignIn", component: SignIn },
  { path: "/registration", name: "Registration", component: Registration },
  
  // admin
  { path: "/admin/", name: 'AdminHome', component: AdminHome, props: true },
  { path: "/admin/manageGames", name: 'ManageGames', component: ManageGames },
  { path: "/admin/manageUsers", name: 'ManageUsers', component: ManageUsers, props:true },
  { path: "/admin/manageUsers/userDetails/:name/:id", name: 'UserDetails', component: UserDetails },

  // users
  { path: "/users/user/:userId/:userName/", name: 'UserHome', component: UserHome },
  { path: "/users/games/:gameName/gameDetails/:gameId", name: 'privateGameDetails', component: PrivateGameDetails, props: true },
  { path: "/user/:surname/:name", name: 'ShoppingBasket', component: ShoppingBasket },
  { path: "/user/order/details", name: "OrderDetails", component: OrderDetails },

  // redirect
  {
    path: '/all',
    redirect: '/signIn',
  },
  // catchall 400
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
