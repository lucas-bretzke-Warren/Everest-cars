import { fireEvent, render, screen, } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import '@testing-library/jest-dom'
import Modalform from '@/components/Modalform.vue'

const renderModalForm = () => render(Modalform, {
})
describe('Modalform.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('Should be able to render component', () => {
    const { emitted } = renderModalForm()
    screen.getByText('Nome do carro')
    screen.getByText('Marca')
    screen.getByText('Cor')
    screen.getByText('Ano')
    screen.getByText('Quantidade de portas')
    screen.getByText('CV')
    screen.getByText('Câmbio')
    screen.getByText('Alarme')
    screen.getByText('Teto solar')
    screen.getByText('Computador de bordo')
    screen.getByText('CONCLUIR')
  })

  it('Should be able to check if the component is receiving the props', () => {
    const wrapper = mount(Modalform, {
      propsData: { isCreateProp: true || false, carProp: {}, carIdProp: 1, }
    })
    expect(wrapper.vm).toBeDefined()
  })



  it('Should be able to emit close-modal', () => {
    const { getByRole, emitted } = renderModalForm()
    fireEvent.click(getByRole('button', { name: 'X' }))
    expect(emitted()["close-modal"]).toBeTruthy()
  })
})
