import axios from 'axios'
import nProgress from 'nprogress'
import "nprogress/nprogress.css"
import store from '@/store'

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})
requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid) {
        config.headers.userTempId = store.state.detail.uuid
    }
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nProgress.start()
    return config
})
requests.interceptors.response.use((response) => {
    nProgress.done()
    return response.data
}, (err) => {
    return err.data
})

export default requests