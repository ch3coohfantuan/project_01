import Vue from 'vue'
import Vuex from 'vuex'
import { reqAddressInfo, reqOrderInfo } from '@/api'
Vue.use(Vuex)

const state = {
    address: [],
    orderInfo: {}
}
const actions = {
    async getUserAddress(context) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            context.commit('GETUSERADDRESS', result.data)
        }
    },
    async getOrderInfo(context) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            context.commit('GETORDERINFO', result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, value) {
        state.address = value
    },
    GETORDERINFO(state, value) {
        state.orderInfo = value
    },
}
const getters = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}