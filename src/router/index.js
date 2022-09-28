import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let oringinPush = VueRouter.prototype.push
VueRouter.prototype.push = function (url, resolve, reject) {
    if (resolve && reject) {
        oringinPush.call(this, usl, resolve, reject)
    } else {
        oringinPush.call(this, url, () => { }, () => { })
    }
}

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
import store from '@/store'
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/center',
            component: Center,
            meta: {
                showFooter: true
            },
            redirect: '/center/myorder',
            children: [
                {
                    path: 'myorder',
                    component: myOrder,

                },
                {
                    path: 'grouporder',
                    component: groupOrder,
                },
            ]
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/pay',
            component: Pay,
            meta: {
                showFooter: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path === '/trade') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/trade',
            component: Trade,
            meta: {
                showFooter: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path === '/shopcart') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/shopcart',
            component: ShopCart,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/detail/:skuId?',
            component: Detail,
            name: 'detail',
            meta: {
                showFooter: true
            }
        },
        {
            path: '/search/:keyWord?',
            name: 'search',
            component: Search,
            meta: {
                showFooter: true
            },
        },
        {
            path: '/login',
            component: Login,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                showFooter: false
            }
        },
        {
            path: '*',
            redirect: '/home'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 滚动行为 始终滚动到顶部
        return { y: 0 }
    },
})
router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem('TOKEN')
    let userName = store.state.user.userInfo.name
    if (token) {
        //已登录
        if (to.path == '/login') {
            next('/home')
        } else {
            if (userName) {
                next()
            } else {
                try {
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    await store.dispatch('user/loginUp')
                    next('/login')
                }
            }
        }
    } else {
        //未登录
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next(`/login?redirect=${toPath}`)
        } else {
            next()
        }
    }
})
export default router