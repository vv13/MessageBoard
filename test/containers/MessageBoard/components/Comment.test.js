import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Comment from 'containers/MessageBoard/components/Comment';

const props = {
  terminalClearFunc: sinon.spy(),
  conn: { send: sinon.spy() },
  changeDirectoryFunc: sinon.spy(),
};


describe('Comment component', () => {
  it('show show comment correctly', () => {
    const comment = {
      date: 123123213123,
      discuss: [],
      email: 'zwhvv13@foxmail.com',
      headUrl: '/img/default_head.png',
      comment: 'test',
    };
    const wrap = shallow(<Comment comment={comment} {...props} />);
    expect(wrap.find('article p').text()).to.equal('test');
  });

  it('show show date correctly', () => {
    const comment = {
      date: 123123213123,
      discuss: [],
      email: 'zwhvv13@foxmail.com',
      headUrl: '/img/default_head.png',
      comment: 'test',
    };
    const wrap = shallow(<Comment comment={comment} {...props} />);
    const d = new Date(comment.date).toLocaleDateString();
    expect(wrap.find('header p').text()).to.equal(`zwhvv13@foxmail.com·${d}`);
  });
});
