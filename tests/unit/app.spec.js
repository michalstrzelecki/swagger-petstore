import { shallowMount } from '@vue/test-utils'
import { statusAvailableData } from "../mockedData";
import App from '@/App.vue'

import axios from 'axios'
jest.mock('axios')

describe('App.vue', () => {
    it('fetches data on initial render', done => {
        axios.get.mockResolvedValue({ data: statusAvailableData })

        const wrapper = shallowMount(App)
        wrapper.vm.$nextTick(() => {
            expect(axios.get.mock.calls.length).toBe(1);
            expect(wrapper.vm.pets).toEqual(statusAvailableData)
        })

        done()
    })
})
