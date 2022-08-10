import { render, fireEvent, screen, getByRole, waitFor, within } from '@testing-library/vue'
import '@testing-library/jest-dom'
import ListingOnCars from '@/components/ListingOnCars.vue'
import { carArrayMock }  from './ListingOnCarsMocks'
import CarService from '@/services/carService'

jest.mock('@/services/carService', () => ({
  get: jest.fn().mockResolvedValue(require('./ListingOnCarsMocks.ts').carArrayMock)
}))

type Props = {
  id: number
}

const renderListingOnCars = (props?: Props) =>
  render(ListingOnCars, {
    props
  })

describe('ListingOnCars.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should render component default values', async () => {
    jest.spyOn(CarService, 'get').mockResolvedValueOnce([]) // para testar quando retornar array vazio de carros
    // jest.spyOn(CarService, 'get').mockRejectedValueOnce({}) para testar o catch do axios
    
    renderListingOnCars()

    screen.getByText('Lista de carros')
    screen.getByText('Adicionar carro')
    screen.getByText('Carro')
    screen.getAllByText('Ano')[0]

    //todo: testar a partir <section v-show="showLoading" class="loading">
  })

  it('should render cars rows', async () => {
    renderListingOnCars()
    
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
  })

  it('Should render Loading', () => {
    const { getByText } = renderListingOnCars()
    expect(getByText('Loading . . .')).toBeVisible
  })

  it('Should be able to check if the ModalForm component is visible', async () => {
    const { getByTestId } = renderListingOnCars()
    await fireEvent.click(getByTestId('set-create-new-car'))

    expect(getByTestId("modal-form")).toBeVisible();
  })




  it('Should render component ConfirmationModal', async () => {
    const { getByTestId } = renderListingOnCars({ id: 1 })

    // await fireEvent.click(getByTestId("test-open-modal"))

    expect(getByTestId('confirmation-modal')).toBeVisible()

  })

})