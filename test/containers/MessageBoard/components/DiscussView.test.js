import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import DiscussView from 'containers/MessageBoard/components/DiscussView';
import SendDiscussBox from 'containers/MessageBoard/components/SendDiscussBox';

describe('DiscussView component', () => {
  it('render DiscussView correctly', () => {
    const wrap = shallow(<DiscussView discuss={[]} />);
    expect(wrap.find('div')).to.have.length(3);
    expect(wrap.find(SendDiscussBox)).to.have.length(1);
  });
});
