import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Discuss from 'containers/MessageBoard/components/Discuss';

describe('Discuss component', () => {
  it('show discuss correctly', () => {
    const discuss = {
      email: 'test@qq.com',
      date: 44444,
      comment: 'test',
    };
    const wrap = shallow(<Discuss discuss={discuss} />);
    expect(wrap.find('.discussComment').text()).to.equal('test');
  });
});
