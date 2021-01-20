import axios from '@/axios'

export default (data) => axios.post('/store/order', { ...data })
