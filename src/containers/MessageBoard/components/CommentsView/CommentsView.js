import style from './style.css';

import React, { Component } from 'react';
import Comment from '../Comment';
import { Icon, Modal } from 'antd';
import CommentWriter from '../CommentWriter';
class CommentsView extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      modalVisible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.setState({
      modalVisible: true,
    });
  }

  handleOk() {
    // TODO 发送请求
    this.setState({
      modalVisible: false,
    });
  }

  handleCancel() {
    this.setState({
      modalVisible: false,
    });
  }

  elGen() {
    return Array(10).fill(0).map((d, index) => <Comment key={index} />);
  }

  render() {
    return (
      <div>
        <div className={style.sendComment} onClick={this.showModal}>
          <Icon type="edit" style={{ marginRight: '15px' }} />点我进行留言
          <Modal
            title="留言"
            visible={this.state.modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <CommentWriter />
          </Modal>
        </div>
        <div className={style.commentsWrap}>
          {this.elGen()}
        </div>
      </div>
    );
  }
}

export default CommentsView;
