import {
    shallowMount,
    mount,
    createLocalVue
} from '@vue/test-utils'
import { statusAvailableData } from "../mockedData"
import flushPromises from 'flush-promises'

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from '@/App.vue'

import axios from '@/axios'
jest.mock('@/axios')

describe('App.vue', () => {
    let localVue, vuetify, wrapper

    beforeEach(() => {
        Vue.use(Vuetify)
        localVue = createLocalVue()
        vuetify = new Vuetify()
        localVue.use(Vuetify)

        axios.get.mockResolvedValue({ data: statusAvailableData })
    })

    afterEach(() => {
        wrapper.destroy()
        jest.resetAllMocks()
    })

    it('should fetch data on initial render', async () => {
        wrapper = shallowMount(App)

        await flushPromises()

        expect(axios.get.mock.calls).toHaveLength(1);
        expect(wrapper.vm.$data.pets).toStrictEqual(statusAvailableData)
    })

    it('should fetch new pets on pet status change', async () => {
        const wrapper = mount(App, {
            localVue,
            vuetify,
            data: () => ({
                pets: statusAvailableData
            })
        })

        wrapper.get('input[data-test-id="select-pet"]').trigger('click')
        await wrapper.vm.$nextTick()

        wrapper.get('.v-list-item:nth-child(3)').trigger('click')
        await flushPromises()

        expect(axios.get.mock.calls).toHaveLength(2);
    });
})
