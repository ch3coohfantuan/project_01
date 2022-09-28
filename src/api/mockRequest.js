import axios from 'axios'
import nProgress from 'nprogress'
import "nprogress/nprogress.css"

const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000
})
requests.interceptors.request.use((config) => {
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