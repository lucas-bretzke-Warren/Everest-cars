import { render, fireEvent, screen, waitFor, within } from '@testing-library/vue'
import '@testing-library/jest-dom'
import ListingOnCars from '@/components/ListingOnCars.vue'
import { carArrayMock, carMock } from './ListingOnCarsMocks'
import carService from '@/services/carService'

jest.mock('@/services/carService', () => ({
  get: jest.fn().mockResolvedValue(require('./ListingOnCarsMocks.ts').carArrayMock),
  put: jest.fn().mockResolvedValue({}),
}))

const renderListingOnCars = () =>
  render(ListingOnCars)

describe('ListingOnCars.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should render component default values', async () => {
    jest.spyOn(carService, 'get').mockResolvedValueOnce([]) // para testar quando retornar array vazio de carros
    const { getByTestId } = renderListingOnCars()

    screen.getByText('Lista de carros')
    screen.getByText('Adicionar carro')
    screen.getByText('Carro')
    screen.getByText('Ano')

    expect(getByTestId('modal-form')).not.toBeVisible()
    expect(getByTestId('confirmation-modal')).not.toBeVisible()
    await waitFor(() => {
      expect(screen.getByText('Erro')).toBeVisible()
    })
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
    expect(screen.getByText('Erro')).not.toBeVisible()
  })

  it('should give an alert error when rendering lines of cars', async () => {
    jest.spyOn(carService, 'get').mockRejectedValueOnce({})
    renderListingOnCars()

    await waitFor(() => {
      expect(screen.getByText('Erro')).toBeVisible()
    })
  })

  it('Must render Modalform component with empty inputs', async () => {
    const { getByTestId } = renderListingOnCars()

    await fireEvent.click(screen.getByText('Adicionar carro'))

    expect(getByTestId('modal-form')).toBeVisible()

    expect(screen.getByLabelText('inputName')).toHaveValue("")
    expect(screen.getByLabelText('inputMarca')).toHaveValue("")
    expect(screen.getByLabelText('inputCor')).toHaveValue("")
    expect(screen.getByLabelText('inputAno')).toHaveValue("")
    expect(screen.getByLabelText('inputPortas')).toHaveValue("")
    expect(screen.getByLabelText('inputCV')).toHaveValue("")
    expect(screen.getByLabelText('inputCâmbio')).toHaveValue("")
    expect(screen.getByLabelText('inputAlarme')).toHaveValue("")
    expect(screen.getByLabelText('inputTetoSolar')).toHaveValue("")
    expect(screen.getByLabelText('inputComputadorDeBordo')).toHaveValue("")

  })

  it('Should render component ModalForm with empty filled out accordingly ', async () => {
    jest.spyOn(carService, 'put').mockResolvedValueOnce(carMock)
    renderListingOnCars()

    await waitFor(async () => {
      const carsList = screen.getAllByRole('list', {
        name: 'cars-label'
      })
      const firstCarRow = within(carsList[0]).getAllByRole('listitem')
      await fireEvent.click(within(firstCarRow[2]).getByText('Editar carro'))

      expect(screen.getByTestId('modal-form')).toBeVisible()

      expect(screen.getByLabelText('inputName')).toHaveValue('Fusca')
      expect(screen.getByLabelText('inputMarca')).toHaveValue('volks')
      expect(screen.getByLabelText('inputCor')).toHaveValue('branco')
      expect(screen.getByLabelText('inputAno')).toHaveValue('1999')
      expect(screen.getByLabelText('inputPortas')).toHaveValue('2')
      expect(screen.getByLabelText('inputCV')).toHaveValue('70')
      expect(screen.getByLabelText('inputCâmbio')).toHaveValue('manual')
      expect(screen.getByLabelText('inputAlarme')).toHaveValue('não tem')
      expect(screen.getByLabelText('inputTetoSolar')).toHaveValue('não tem')
      expect(screen.getByLabelText('inputComputadorDeBordo')).toHaveValue('não tem')

      await fireEvent.click(screen.getByText('CONCLUIR'))

      expect(screen.getByText('Loading . . .')).toBeVisible()
      expect(carService.put).toBeCalledWith(carMock)

      await waitFor(() => {
        expect(screen.getByText('Loading . . .')).not.toBeVisible()
        expect(screen.getByTestId('modal-form')).not.toBeVisible()
      })
    })
  })

  it('should render component ConfirmationModal ', async () => {
    renderListingOnCars()

    await waitFor(async () => {
      const carsList = screen.getAllByRole('list', {
        name: 'cars-label'
      })
      const firstCarRow = within(carsList[0]).getAllByRole('listitem')
      await fireEvent.click(within(firstCarRow[3]).getByText('Deletar carro'))

      expect(screen.getByTestId('confirmation-modal')).toBeVisible()
      await fireEvent.click(screen.getByText('Cancelar'))
      expect(screen.getByTestId('confirmation-modal')).not.toBeVisible()
    })
  })
})