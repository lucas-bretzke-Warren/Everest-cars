import { render, fireEvent, screen, waitFor, within, getByText, getByTestId, } from '@testing-library/vue'
import '@testing-library/jest-dom'
import ListingOnCars from '@/components/ListingOnCars.vue'
import ModalForm from '@/components/ModalForm.vue'
import { carArrayMock } from './ListingOnCarsMocks'
import CarService from '@/services/carService'

jest.mock('@/services/carService', () => ({
  get: jest.fn().mockResolvedValue(require('./ListingOnCarsMocks.ts').carArrayMock),
}))

type Props = {
  id: number
}


const renderListingOnCars = (props?: Props) =>
  render(ListingOnCars, {
    props,
  })

describe('ListingOnCars.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('Should render component default values', async () => {
    jest.spyOn(CarService, 'get').mockResolvedValueOnce([]) // para testar quando retornar array vazio de carros
    // jest.spyOn(CarService, 'get').mockRejectedValueOnce({}) para testar o catch do axios
    const { getByTestId } = renderListingOnCars()

    screen.getByText('Lista de carros')
    screen.getByText('Adicionar carro')
    screen.getByText('Carro')
    screen.getAllByText('Ano')[0]

    screen.getByText('Loading . . .')
    expect(getByTestId('modal-form')).not.toBeVisible()
    expect(getByTestId('confirmation-modal')).not.toBeVisible()
  })

  it('should render cars rows', async () => {
    const { } = renderListingOnCars()

    await waitFor(() => {
      const carsList = screen.getAllByRole('list', {
        name: 'cars-label'
      })
      expect(carsList).toHaveLength(4)

      const firstCarRow = within(carsList[0]).getAllByRole('listitem')
      expect(firstCarRow).toHaveLength(4)

      expect(firstCarRow[0]).toHaveTextContent(carArrayMock[0].nome)
      expect(firstCarRow[1]).toHaveTextContent(String(carArrayMock[0].ano))

      within(firstCarRow[2]).getByText('Editar carro')
      within(firstCarRow[3]).getByText('Deletar carro')
    })
    expect(screen.getByText('Loading . . .')).not.toBeVisible()
  })

  it('Should render component ConfirmationModal', async () => {
    const { getByTestId } = renderListingOnCars()

    await waitFor(async () => {
      const carsList = screen.getAllByRole('list', {
        name: 'cars-label'
      })
      const firstCarRow = within(carsList[0]).getAllByRole('listitem')
      await fireEvent.click(within(firstCarRow[3]).getByText('Deletar carro'))

      expect(getByTestId('confirmation-modal')).toBeVisible()
    })
  })
})