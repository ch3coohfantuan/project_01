import Vue from 'vue'
import Vuex from 'vuex'
import {reqCategory,reqListContainer,reqFloor} from '@/api'
Vue.use(Vuex)

const state = {
    categoryList:[],
    listContainer:[],
    floorList:[]
}

const actions = {
    async category(context){
        let result = await reqCategory()
        if(result.code === 200){
            context.commit('CATEGORY',result.data)
        }else{
            alert('状态不对，请重试！')
        }
    },
    async container(context){
        let result = await reqListContainer()
        if(result.code === 200){
            context.commit('LISTCONTAINER',result.data)
        }else{
            alert('状态不对，请重试！')
        }
    },
    async reqfloor(context){
        let result = await reqFloor()
        if(result.code === 200){
            context.commit('REQFLOOR',result.data)
        }else{
            alert('状态不对，请重试！')
        }
    }

}
const mutations = {
    CATEGORY(state,value){
        state.categoryList = value
    },
    LISTCONTAINER(state,value){
        state.listContainer = value
    },
    REQFLOOR(state,value){
        state.floorList = value
    },
}
const getters = {}
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}