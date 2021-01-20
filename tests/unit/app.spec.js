import { shallowMount, createLocalVue } from '@vue/test-utils'
import { statusAvailableData } from "../mockedData"
import flushPromises from 'flush-promises'

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from '@/App.vue'

import axios from '@/axios'
jest.mock('@/axios')

Vue.use(Vuetify)
const localVue = createLocalVue()
const vuetify = new Vuetify()
localVue.use(Vuetify)

describe('App.vue', () => {
    it('fetches data on initial render', async () => {
        axios.get.mockResolvedValue({ data: statusAvailableData })

        const wrapper = shallowMount(App, {
            localVue,
            vuetify
        })

        await flushPromises()

        expect(axios.get.mock.calls).toHaveLength(1);
        expect(wrapper.vm.$data.pets).toStrictEqual(statusAvailableData)
    })
})
