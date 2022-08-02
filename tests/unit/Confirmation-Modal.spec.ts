import { shallowMount } from '@vue/test-utils'
import { IPropsConfirmarionModal } from '@/types'
import ConfirmarionModal from '@/components/ConfirmarionModal.vue'

describe('ConfirmationModal.vue', () => {
  it('Recebe um Id por Prop', () => {
    const props: IPropsConfirmarionModal = { loadingProp: false, id: 3 }
    const wrapper = shallowMount(ConfirmarionModal, {
      propsData: { loadingProp: false, id: 3 }
    })
    expect(wrapper.vm).toBeDefined()
  })

  // it('Evento que fecha o modal', () => {
  //   const wrapper = shallowMount(ConfirmarionModal, () => {
  //     wrapper.vm.$emit('foo')
  //   })
  //   expect(wrapper.emitted().foo).toBeTruthy()

  // })
})