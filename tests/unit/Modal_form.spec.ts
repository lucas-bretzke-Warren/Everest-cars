import { shallowMount } from '@vue/test-utils'
import Modalform from '@/components/Modalform.vue'
import { IPropsModalForm, ICar } from '@/types'



describe('Modalform.vue', () => {
  it('renders props.msg when passed', () => {
    const props: IPropsModalForm = { isCreateProp: true, carProp: 'jd', carIdProp: 2 }
    const wrapper = shallowMount(Modalform, {
      propsData: props
    })
    expect(wrapper.vm).toBeDefined()
  })
})
