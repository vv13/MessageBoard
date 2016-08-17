import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import CommentsView from 'containers/MessageBoard/components/CommentsView';
import { Modal, Form } from 'antd';
import Comment from 'containers/MessageBoard/components/Comment'
const props = {
  terminalClearFunc: sinon.spy(),
  conn: { send: sinon.spy() },
  changeDirectoryFunc: sinon.spy(),
};


describe('CommentsView component', () => {
  it('should render correctly', () => {
    const wrap = shallow(<CommentsView comments={[]} {...props} />);
    expect(wrap.find(Modal)).to.have.length(1);
    expect(wrap.find(Form)).to.have.length(1);
  });
  it('should render comments', () => {
    const wrap = shallow(<CommentsView comments={[1, 2, 3]} {...props} />);
    expect(wrap.find(Comment)).to.have.length(3);
  });
});
