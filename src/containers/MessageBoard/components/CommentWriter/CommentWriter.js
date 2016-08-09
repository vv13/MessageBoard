import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class CommentWriter extends Component {
  static propTypes = {
    style: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div
        style={this.props.style}
        className={style.WriterBox}
      >
        <Form horizontal>
          <FormItem
            id="control-input"
            label="邮箱"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Input id="control-input" placeholder="Please enter..." />
          </FormItem>

          <FormItem
            id="control-textarea"
            label="留言内容"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Input type="textarea" id="control-textarea" rows="3" />
          </FormItem>
          <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default CommentWriter;
