import Vue from 'vue'
import Vuex from 'vuex'
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLoginUp } from '@/api'
Vue.use(Vuex)

const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
}

const actions = {
    async getCode(context, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            context.commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userRegister(context, value) {
        let result = await reqUserRegister(value)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userLogin(context, value) {
        let result = await reqUserLogin(value)
        if (result.code === 200) {
            context.commit('USERLOGIN', result.data.token)
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo(context) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            context.commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async loginUp(context) {
        let result = await reqLoginUp()
        if (result.code === 200) {
            context.commit('LOGINUP')
            localStorage.removeItem('TOKEN')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
}
const mutations = {
    GETCODE(state, value) {
        state.code = value
    },
    USERLOGIN(state, value) {
        state.token = value
    },
    GETUSERINFO(state, value) {
        state.userInfo = value
    },
    LOGINUP(state) {
        state.userInfo = {}
        state.token = ''
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