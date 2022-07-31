import { shallowMount } from '@vue/test-utils'
import ConfirmarionModal from '@/components/ConfirmarionModal.vue'

describe('ConfirmarionModal.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(ConfirmarionModal, {
      propsData: { value: '' }
    })
    expect(wrapper.vm).toBeDefined()
  })
})
