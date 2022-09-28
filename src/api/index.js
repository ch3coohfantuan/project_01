import requests from "./request";
import mockRequests from './mockRequest'
export const reqCategory = function () {
    return requests.get('/product/getBaseCategoryList')
}
export const reqListContainer = function () {
    return mockRequests.get('/banner')
}
export const reqFloor = function () {
    return mockRequests.get('/floor')
}
export const reqSearchInfo = function (params) {
    return requests.post('/list', params)
}
export const reqGoodsInfo = (skuId) => {
    return requests.get(`/item/${skuId}`)
}
export const reqShopCart = (skuId, skuNum) => {
    return requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
}
export const reqCartList = () => {
    return requests.get('/cart/cartList')
}
export const reqDelete = (skuId) => {
    return requests.delete(`/cart/deleteCart/${skuId}`)
}
export const reqUpdateChecked = (skuId, isChecked) => {
    return requests.get(`/cart/checkCart/${skuId}/${isChecked}`)
}
export const reqGetCode = (phone) => {
    return requests.get(`/user/passport/sendCode/${phone}`)
}
export const reqUserRegister = (data) => {
    return requests.post('/user/passport/register', data)
}
export const reqUserLogin = (data) => {
    return requests.post('/user/passport/login', data)
}
export const reqUserInfo = () => {
    return requests.get('/user/passport/auth/getUserInfo')
}
export const reqLoginUp = () => {
    return requests.get('/user/passport/logout')
}
export const reqAddressInfo = () => {
    return requests.get('/user/userAddress/auth/findUserAddressList')
}
export const reqOrderInfo = () => {
    return requests.get('/order/auth/trade')
}
export const reqSubmit = (tradeNo, data) => {
    return requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
}

export const reqPayInfo = (orderId) => {
    return requests.get(`/payment/weixin/createNative/${orderId}`)
}

export const reqPayStatus = (orderId) => {
    return requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
}
export const reqMyOrder = (page, limit) => {
    return requests.get(`/order/auth/${page}/${limit}`)
}