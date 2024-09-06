

import Home from '../components/Home.vue'               //principal
import File from '../components/File.vue'               //ficha
import Apprentice from '../components/Apprentice.vue'   //ruta aprendiz
import User from '../components/User.vue'               //usuario
import Binnacle from '../components/Binnacle.vue'       //bitacora
import Login from '../components/Login.vue'             //login
import ResetPassword from '../components/ResetPassword.vue'

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/home', component: Home, children:[
        { path: '/fichas', component: File },
        { path: '/aprendiz', component: Apprentice },
        { path: '/usuario', component: User },
        { path: '/bitacoras', component: Binnacle },
    ]},
    { path: '/reset-password', component: ResetPassword },
    { path: '/', component: Login }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})



// import home from '../components/home.vue'               //principal
// import file from '../components/file.vue'               //ficha
// import apprentice from '../components/apprentice.vue'   //ruta aprendiz
// import user from '../components/user.vue'               //usuario
// import binnacle from '../components/binnacle.vue'       //bitacora
// import login from '../components/login.vue'             //login


// import { createRouter, createWebHashHistory } from 'vue-router'
// import User from '../components/user.vue'



// const routes = [
//     { path: '/home', component: home },
//     { path: '/fichas', component: file },
//     { path: '/aprendiz', component: apprentice },
//     { path: '/usuario', component: user },
//     { path: '/bitacoras', component: binnacle },
//     {path: '/',  component: login}
// ]


// export const router = createRouter({
//     history: createWebHashHistory(),
//     routes
// })


// const routes = [
//     { path: '/fichas', component: File },
//     { path: '/aprendiz', component: Apprentice },
//     { path: '/usuario', component: User },
//     { path: '/bitacoras', component: Binnacle },
//     { path: '/', component: Login }
//  ]


// const routes = [
//     { path: '/home', component: home, children:[
//         { path: '/fichas', component: fichas },
//         { path: '/aprendiz', component: aprendiz },
//         { path: '/usuario', component: usuario },
//         { path: '/bitacoras', component: bitacoras },
//     ] },
    
//     {path: '/',  component: loguin}
// ]