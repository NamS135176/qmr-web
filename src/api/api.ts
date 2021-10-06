import axios from 'axios'
const api:any = axios.create({
    baseURL: 'http://api-web-dev.quick-money-recorder.com/',
    headers: {'Content-Type': 'application/json'}
})

export default api