import Vue from 'vue'
import Vuex from 'vuex'
import { reqSearchInfo } from '@/api'
Vue.use(Vuex)

const state = {
    searchList: {}
}

const actions = {
    async getSearchList(context, value = {}) {
        let result = await reqSearchInfo(value)
        if (result.code === 200) {
            context.commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchList = value;
    }
}
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}