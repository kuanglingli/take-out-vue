import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const addressList = r => require.ensure([], () => r(require('@/page/addressList')), 'addressList');
const addAddress = r => require.ensure([], () => r(require('@/page/addAddress')), 'addAddress');
const passwordSet = r => require.ensure([],()=>r(require('@/page/updatePassword.vue')),'passwordSet')
// const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
// const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
// const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
// const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
// const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
// const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
// const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
// const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
        path: '/',
        name: 'HelloWorld',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../page/HelloWorld.vue')
    },
	{
        path: '/updatePassword',
        name: 'updatePassword',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../page/updatePassword.vue')
    },
	{
        path: '/Register',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../page/Register.vue')
    },
	{
        path: '/shoppingCart',
        name: 'shoppingCart',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/shoppingCart.vue')
    },
	{
        path: '/shopItem',
        name: 'shopItem',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../page/shopItem.vue')
    },
    {
        path: '/pay',
        name: 'pay',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../page/pay.vue')
    },
	{
        path: '/Item',
        name: 'Item',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../page/Item.vue')
    },
	{
        path: '/Shop',
        name: 'Shop',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../page/Shop.vue')
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '/manage',
        name: 'manage',
        component: manage,
        children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/userList',
			component: userList,
			meta: ['????????????', '????????????'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['????????????', '????????????'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['????????????', '????????????'],
		},{
			path: '/addShop',
			component: addShop,
			meta: ['????????????', '????????????'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['????????????', '????????????'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['????????????', '????????????'],
		},{
			path: '/addressList',
			component: addressList,
			meta: ['????????????', '????????????'],
		},{
			path: '/addAddress',
			component: addAddress,
			meta: ['????????????', '????????????'],
		},{
			path: '/passwordSet',
			component: passwordSet,
			meta: ['??????', '????????????'],
		}
		]
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router