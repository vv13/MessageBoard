import style from './style.css';
import React, { Component, PropTypes } from 'react';
import NavItem from 'components/NavItem';
import { getHeadUrl } from 'constants/utils';
import { Input, Form, Modal } from 'antd';

class Nav extends Component {
  static propTypes = {
    userEmail: PropTypes.string,
    emailDelete: PropTypes.func,
    emailUpdate: PropTypes.func,
    actions: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      emailInput: '',
    };
    this.genUserInfo = this.genUserInfo.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  genUserInfo() {
    const email = this.props.userEmail;
    if (email) {
      return (
        <div className={style.userInfo}>
          <img alt="头像" src={getHeadUrl(email)} />
          <span>{email}</span>
          <ul className={style.userChange}>
            <li onClick={this.showModal}>
              更改邮箱
            </li>
            <li onClick={this.props.actions.emailDelete}>
              退出
            </li>
          </ul>
        </div>
      );
    }
    return <div />;
  }

  showModal() {
    this.setState({
      modalVisible: true,
    });
  }

  handleEmailChange(e) {
    this.setState({ emailInput: e.target.value });
  }

  handleOk() {
    // 设置邮箱
    const email = this.state.emailInput;
    this.props.actions.emailUpdate(email);

    // 关闭模态框
    this.setState({
      modalVisible: false,
      emailInput: '',
    });
  }

  handleCancel() {
    this.setState({
      modalVisible: false,
      emailInput: '',
      commentInput: '',
    });
  }

  genModal() {
    const FormItem = Form.Item;
    return (
      <Modal
        title="更改您的邮箱"
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
          </Form>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <nav className={style.nav}>
        <div className={style.navItems}>
          <NavItem
            linkUrl="/"
            iconType="file-text"
            str="留言板"
            className={style.navIcon}
          />
        </div>
        {this.genUserInfo()}
        {this.genModal()}
      </nav>
    );
  }
}

export default Nav;
