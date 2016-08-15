import style from './style.css';

import React, { Component, PropTypes } from 'react';
import Comment from '../Comment';
import { Icon, Modal, Form, Input } from 'antd';

class CommentsView extends Component {
  static propTypes = {
    comments: PropTypes.array,
    commentAdd: PropTypes.func,
    discussAdd: PropTypes.func,
    db: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      modalVisible: false,
      emailInput: '',
      commentInput: '',
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  showModal() {
    this.setState({
      modalVisible: true,
    });
  }

  handleOk() {
    // TODO 发送请求
    // 添加到props
    this.props.db.put({
      _id: new Date().toISOString(),
      email: this.state.emailInput,
      headUrl: '/img/default_head.png',
      date: Date.now(),
      comment: this.state.commentInput,
      discuss: [],
    });

    // 关闭模态框
    this.setState({
      modalVisible: false,
      emailInput: '',
      commentInput: '',
    });
  }

  handleCancel() {
    this.setState({
      modalVisible: false,
      emailInput: '',
      commentInput: '',
    });
  }

  handleEmailChange(e) {
    this.setState({ emailInput: e.target.value });
  }

  handleCommentChange(e) {
    this.setState({ commentInput: e.target.value });
  }

  elGen() {
    const genArr = [];
    for (let i = 0; i < this.props.comments.length; i++) {
      genArr.push(
        <Comment
          key={i}
          comment={this.props.comments[i].doc}
          discussAdd={this.props.discussAdd}
        />);
    }
    return genArr;
  }

  render() {
    const FormItem = Form.Item;
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
            <div
              className={style.WriterBox}
            >
              <Form horizontal>
                <FormItem
                  className={style.zindexMax}
                  id="control-input"
                  label="邮箱"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 14 }}
                >
                  <Input
                    id="control-input"
                    placeholder="Please enter..."
                    value={this.state.emailInput}
                    onChange={this.handleEmailChange}
                  />
                </FormItem>

                <FormItem
                  className={style.zindexMax}
                  id="control-textarea"
                  label="留言内容"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 14 }}
                >
                  <Input
                    type="textarea"
                    id="control-textarea"
                    rows="3"
                    value={this.state.commentInput}
                    onChange={this.handleCommentChange}
                  />
                </FormItem>
              </Form>
            </div>
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
