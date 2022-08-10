import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import '@testing-library/jest-dom'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import carService from "@/services/carService";

jest.mock('@/services/carService', () => ({
  delete: jest.fn().mockResolvedValue({})
}))

interface Props {
  id: number
}

const renderConfirmationModal = (props?: Props) =>
  render(ConfirmationModal, {
    props
  })

describe('ConfirmationModal.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with default values', () => {
    renderConfirmationModal()

    screen.getByText('Tem certeza')
    screen.getByText('que deseja deletar este item?')
    screen.getByText('Cancelar')
    screen.getByText('Sim')
  })

  it("Should emit close-modal when clicked 'Cancelar' button", async () => {
    const { emitted } = renderConfirmationModal()

    await fireEvent.click(screen.getByText('Cancelar'))
    expect(emitted()['close-modal']).toBeTruthy()
  })

  it("Should be able to method deleteCar event", async () => {
    const { emitted } = renderConfirmationModal({ id: 1 })

    await fireEvent.click(screen.getByText('Sim'))

    expect(emitted()['on-change-loading'][0][0]).toBeTruthy()
    expect(carService.delete).toBeCalledWith(1)

    await waitFor(() => {
      expect(emitted()['get-cars']).toBeTruthy()
      expect(emitted()['close-modal']).toBeTruthy()

      expect(emitted()['on-change-loading'][1][0]).toBeFalsy()
    })
  })
})