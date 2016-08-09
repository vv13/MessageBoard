// import style from './style.css';

import React, { Component } from 'react';
import CommentWriter from '../CommentWriter';
import Comment from '../Comment';

class CommentsView extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  elGen() {
    return Array(10).fill(0).map((d, index) => <Comment key={index} />);
  }

  render() {
    return (
      <div>
        <CommentWriter />
        {this.elGen()}
      </div>
    );
  }
}

export default CommentsView;
