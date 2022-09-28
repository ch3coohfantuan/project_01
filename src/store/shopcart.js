import Vue from 'vue'
import Vuex from 'vuex'
import { reqCartList, reqDelete, reqUpdateChecked } from '@/api'

Vue.use(Vuex)

const state = {
    cartList: []
}

const actions = {
    async getCartList(context) {
        let result = await reqCartList()
        if (result.code === 200) {
            context.commit('GETCARTLIST', result.data)
        }
    },
    async delete(context, id) {
        let result = await reqDelete(id)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async updateChecked(context, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    deleteAllChecked(context) {
        let promiseArr = []
        context.getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked === 1) {
                let promise = context.dispatch('delete', item.skuId)
                promiseArr.push(promise)
            }
        });
        return Promise.all(promiseArr)
    },
    checkAll(context, isChecked) {
        let promiseArr = []
        context.getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked != isChecked) {
                let promise = context.dispatch('updateChecked', {
                    skuId: item.skuId,
                    isChecked
                })
                promiseArr.push(promise)
            }
        });
        return Promise.all(promiseArr)
    }
}
const mutations = {
    GETCARTLIST(state, value) {
        state.cartList = value
    },
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}