import { render, fireEvent, getAllByRole } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import '@testing-library/jest-dom'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import { deleteCar } from '@/services/car/mock'

describe('ConfirmationModal.vue', () => {
  it("Shoult render component", async () => {
    const { getByText } = render(ConfirmationModal);
    expect(getByText("Tem certeza")).toBeVisible()
  })

  it('Should render component props', () => {
    const wrapper = mount(ConfirmationModal, {
      propsData: { loadingProp: true, id: 1 }
    })
    expect(wrapper.vm).toBeDefined()
  })

  it("Should be able to emit close-modal event", () => {
    const { emitted, getByRole } = render(ConfirmationModal)
    const closeModal = getByRole('button', { name: 'Cancelar' })
    fireEvent.click(closeModal)
    expect(emitted()['close-modal']).toBeTruthy()
  })

  // NESTE ARQUIVO DE TESTS FALTA APENAS TESTAR O METHOD "deleteCar"
  it("Should be able to method deleteCar event", async () => {
    const { getByTestId } = render(ConfirmationModal)
    const emitteConfirmButtond = getByTestId('emit-close-modal-button')
    fireEvent.click(emitteConfirmButtond)
  })
})  