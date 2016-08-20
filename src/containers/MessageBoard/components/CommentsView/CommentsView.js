import style from './style.css';

import React, { Component, PropTypes } from 'react';
import Comment from '../Comment';
import { Icon, Modal, Form, Input } from 'antd';

class CommentsView extends Component {
  static propTypes = {
    comments: PropTypes.array,
    userEmail: PropTypes.string,
    actions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      modalVisible: false,
      emailInput: this.props.userEmail,
      commentInput: '',
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  showModal() {
    this.state.emailInput = this.props.userEmail;
    this.setState({
      modalVisible: true,
    });
  }

  handleOk() {
    // 添加评论
    const comment = {
      _id: new Date().toISOString(),
      email: this.state.emailInput,
      date: Date.now(),
      comment: this.state.commentInput,
      discuss: [],
      liked: [],
    };
    this.props.actions.commentAdd(comment);
    this.props.actions.emailUpdate(this.state.emailInput);
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

  genMessageBox() {
    const FormItem = Form.Item;
    return (
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
    );
  }

  render() {
    const comments = this.props.comments;
    return (
      <div>
        <div className={style.sendComment} onClick={this.showModal}>
          <Icon type="edit" style={{ marginRight: '15px' }} />点我进行留言
          {this.genMessageBox()}
        </div>
        <div className={style.commentsWrap}>
          {comments.map((comment, index) =>
            <Comment
              key={index}
              comment={comment}
              userEmail={this.props.userEmail}
              actions={this.props.actions}
            />
          )}
        </div>
      </div>
    );
  }
}

export default CommentsView;
