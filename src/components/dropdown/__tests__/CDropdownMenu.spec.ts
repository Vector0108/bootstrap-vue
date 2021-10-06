import { mount } from '@vue/test-utils'
import { CDropdownMenu as Component } from '../../../index'
import { reactive, ref } from 'vue'

const ComponentName = 'CDropdownMenu'

const config = reactive({
    alignment: {lg: 'end'},
    dark: false,
    popper: true,
    visible: false,
})

const customConfig = reactive({
    alignment: {lg: 'end'},
    dark: true,
    popper: false,
    visible: true,
})

const defaultWrapper = mount(Component, {
  propsData: {
      
  },
  slots: {
    default: 'Default slot',
  },
  global: {
    provide: {
      config: config,
      dropdownMenuRef: ref()
    }
  }
})

const customWrapper = mount(Component, {
  propsData: {
    component: 'ul'
  },
  slots: {
    default: 'Default slot',
  },
  global: {
    provide: {
      config: customConfig,
      dropdownMenuRef: ref()
    }
  }
})

describe(`Loads and display ${ComponentName} component`, () => {
  it('has a name', () => {
    expect(Component.name).toMatch(ComponentName)
  })
  it('renders correctly', () => {
    expect(defaultWrapper.html()).toMatchSnapshot()
  }) 
  it('contain slots and classes', () => {
    expect(defaultWrapper.text()).toContain('Default slot')
    expect(defaultWrapper.classes('dropdown-menu')).toBe(true)
    expect(defaultWrapper.classes('dropdown-menu-dark')).toBe(false)
    expect(defaultWrapper.classes('show')).toBe(false)
  })
})

describe(`Customize ${ComponentName} component`, () => {
  it('renders correctly', () => {
    expect(customWrapper.html()).toMatchSnapshot()
  }) 
  it('contain slots and classes', () => {
    expect(customWrapper.text()).toContain('Default slot')
    expect(customWrapper.find('li').text()).toContain('Default slot')
    expect(customWrapper.classes('dropdown-menu')).toBe(true)
    expect(customWrapper.classes('dropdown-menu-dark')).toBe(true)
    expect(customWrapper.classes('show')).toBe(true)
    expect(customWrapper.attributes('data-coreui-popper')).toBe('static')
  })
})

