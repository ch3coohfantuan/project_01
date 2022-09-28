import Vue from 'vue'
import Vuex from 'vuex'
import { reqGoodsInfo, reqShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
Vue.use(Vuex)

const state = {
    goodInfo: {},
    uuid: getUUID()
}

const actions = {
    async getGoodInfo(context, value) {
        let result = await reqGoodsInfo(value)
        if (result.code === 200) {
            context.commit('GETGOODINFO', result.data)
        }
    },
    async addShopCart(context, { skuId, skuNum }) {
        let result = await reqShopCart(skuId, skuNum);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETGOODINFO(state, value) {
        state.goodInfo = value
    },
}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}