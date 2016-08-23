import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import CommentsView from 'containers/MessageBoard/components/CommentsView';
import { Modal, Form } from 'antd';
import Comment from 'containers/MessageBoard/components/Comment'
const props = {
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
  it('should show modal correctly', () => {
    const wrap = shallow(<CommentsView comments={[]} {...props} />);
    const testBtn = wrap.find('#sendComment');
    expect(testBtn).to.have.length(1);
    testBtn.simulate('click');
    expect(wrap.state('modalVisible')).to.equal(true);
  });
});
