import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Button from './Button'

describe(`Button component`, () => {
  const props = {
    tag: 'a',
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a button.Button by default', () => {
    const wrapper = shallow(<Button />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the circle button from props', () => {
    const wrapper = shallow(<Button {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
