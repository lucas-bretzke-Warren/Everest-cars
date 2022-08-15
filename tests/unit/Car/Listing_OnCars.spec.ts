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
const renderModalForm = () => render(ModalForm, {})


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

  it('It should emit the setCreateNewCar event and render the values that this event sets to the ModalForm component', async () => {
    const { getByTestId } = renderListingOnCars()

    await fireEvent.click(screen.getByText('Adicionar carro'))
    expect(getByTestId('modal-form')).toBeVisible()

    await waitFor(() => {
      screen.getByText('Nome do carro')
      screen.getByText('Marca')
      screen.getByText('Cor')
      screen.getByText('Ano de fabricação')
      screen.getByText('Quantidade de portas')
      screen.getByText('Quantidade de portas')
      screen.getByText('CV')
      screen.getByText('Câmbio')
      screen.getByText('Alarme')
      screen.getByText('Teto solar')
      screen.getByText('Computador de bordo')
      screen.getByText('CONCLUIR')
      const inputName = (<HTMLInputElement>screen.getByLabelText('inputName')).value;
      const inputMarca = (<HTMLInputElement>screen.getByLabelText('inputMarca')).value;
      const inputCor = (<HTMLInputElement>screen.getByLabelText('inputCor')).value;
      const inputAno = (<HTMLInputElement>screen.getByLabelText('inputAno')).value;
      const inputPortas = (<HTMLInputElement>screen.getByLabelText('inputPortas')).value;
      const inputCV = (<HTMLInputElement>screen.getByLabelText('inputCV')).value;
      const inputCâmbio = (<HTMLInputElement>screen.getByLabelText('inputCâmbio')).value;
      const inputAlarme = (<HTMLInputElement>screen.getByLabelText('inputAlarme')).value;
      const inputTetoSolar = (<HTMLInputElement>screen.getByLabelText('inputTetoSolar')).value;
      const inputComputadorDeBordo = (<HTMLInputElement>screen.getByLabelText('inputComputadorDeBordo')).value;
      expect(inputName).toBe("")
      expect(inputMarca).toBe("")
      expect(inputCor).toBe("")
      expect(inputAno).toBe("")
      expect(inputPortas).toBe("")
      expect(inputCV).toBe("")
      expect(inputCâmbio).toBe("")
      expect(inputAlarme).toBe("")
      expect(inputTetoSolar).toBe("")
      expect(inputComputadorDeBordo).toBe("")
    })
  })

  it('It should emit the setCarToUpdate event and render the values that this event sets to the ModalForm component', async () => {
    const { getByTestId } = renderListingOnCars()

    await waitFor(() => {
      const carsList = screen.getAllByRole('list', {
        name: 'cars-label'
      })
      const firstCarRow = within(carsList[0]).getAllByRole('listitem')

      const editCar = within(firstCarRow[2]).getByText('Editar carro')
      fireEvent.click(editCar)
    })

    await waitFor(() => {
      expect(getByTestId('modal-form')).toBeVisible()

      const inputName = (<HTMLInputElement>screen.getByLabelText('inputName')).value;
      const inputMarca = (<HTMLInputElement>screen.getByLabelText('inputMarca')).value;
      const inputCor = (<HTMLInputElement>screen.getByLabelText('inputCor')).value;
      const inputAno = (<HTMLInputElement>screen.getByLabelText('inputAno')).value;
      const inputPortas = (<HTMLInputElement>screen.getByLabelText('inputPortas')).value;
      const inputCV = (<HTMLInputElement>screen.getByLabelText('inputCV')).value;
      const inputCâmbio = (<HTMLInputElement>screen.getByLabelText('inputCâmbio')).value;
      const inputAlarme = (<HTMLInputElement>screen.getByLabelText('inputAlarme')).value;
      const inputTetoSolar = (<HTMLInputElement>screen.getByLabelText('inputTetoSolar')).value;
      const inputComputadorDeBordo = (<HTMLInputElement>screen.getByLabelText('inputComputadorDeBordo')).value;
      expect(inputName).toBe('Fusca')
      expect(inputMarca).toBe('volks')
      expect(inputCor).toBe('branco')
      expect(inputAno).toBe('1999')
      expect(inputPortas).toBe('2')
      expect(inputCV).toBe('70')
      expect(inputCâmbio).toBe('manual')
      expect(inputAlarme).toBe('não tem')
      expect(inputTetoSolar).toBe('não tem')
      expect(inputComputadorDeBordo).toBe('não tem')
    })
  })
  it('Should render component ConfirmationModal', async () => {
    const { getByTestId } = renderListingOnCars()

    await waitFor(() => {
      const carsList = screen.getAllByRole('list', {
        name: 'cars-label'
      })
      const firstCarRow = within(carsList[0]).getAllByRole('listitem')

      const deleteCar = within(firstCarRow[3]).getByText('Deletar carro')
      fireEvent.click(deleteCar)
      expect(getByTestId('confirmation-modal')).toBeVisible()
    })
  })


})