import style from './style.css';
import React, { Component } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class CommentWriter extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
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
            <Input id="control-input" placeholder="Please enter..." />
          </FormItem>

          <FormItem
            className={style.zindexMax}
            id="control-textarea"
            label="留言内容"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Input type="textarea" id="control-textarea" rows="3" />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default CommentWriter;
