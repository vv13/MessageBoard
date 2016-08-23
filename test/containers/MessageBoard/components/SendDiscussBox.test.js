import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SendDiscussBox from 'containers/MessageBoard/components/SendDiscussBox';
import immutable from 'immutable';
import utils from 'utility';

const messageBoard = immutable.fromJS({
  userEmail: 'test@qq.com',
});

const props = {
  messageBoard,
  actions: {
  }
};

const getHeadUrl = email =>{
  const md5 = utils.md5(email);
  return `https://www.gravatar.com/avatar/${md5}`;
}

describe('SendDiscussBox component', () => {
  it('get headurl correctly', () => {
    const wrap = shallow(<SendDiscussBox {...props} />);
    expect(wrap.find('img').prop('src')).to.equal(getHeadUrl('test@qq.com'));
  });
});
