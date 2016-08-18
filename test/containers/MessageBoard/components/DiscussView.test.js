import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import DiscussView from 'containers/MessageBoard/components/DiscussView';
import SendDiscussBoxConn from 'containers/MessageBoard/SendDiscussBoxConn';

describe('DiscussView component', () => {
  it('render DiscussView correctly', () => {
    const wrap = shallow(<DiscussView discuss={[]} />);
    expect(wrap.find('div')).to.have.length(3);
    expect(wrap.find(SendDiscussBoxConn)).to.have.length(1);
  });
});
