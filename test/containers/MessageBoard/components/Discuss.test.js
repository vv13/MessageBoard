import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Discuss from 'containers/MessageBoard/components/Discuss';

const discuss = {
  email: 'test@qq.com',
  date: 44444,
  comment: 'test',
};

describe('Discuss component', () => {
  it('render discuss correctly', () => {
    const wrap = shallow(<Discuss discuss={discuss} />);
    expect(wrap.find('.discussComment').text()).to.equal('test');
  });
  it('click reply show discuss box correctly', () => {
    const wrap = shallow(<Discuss discuss={discuss} />);
    wrap.find('#replyBtn').simulate('click');
    expect(wrap.state('showSendDiscuss')).to.equal(true);
  });
});
