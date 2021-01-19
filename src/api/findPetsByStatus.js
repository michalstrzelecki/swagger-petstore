import axios from '@/axios'
import qs from 'qs'



export default (status = 'available') => {
    const query = {
        status
    }

    return axios.get(`/pet/findByStatus?${qs.stringify(query)}`)
}
