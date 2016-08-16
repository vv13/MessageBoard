
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd';
import SendDiscussBox from '../SendDiscussBox';
import { getHeadUrl } from 'constants/utils';

class Discuss extends Component {
  static propTypes = {
    discuss: PropTypes.object,
    db: PropTypes.object,
    commentId: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      showSendDiscuss: false,
    };
    this.handleReplyClick = this.handleReplyClick.bind(this);
    this.discussAdd = this.discussAdd.bind(this);
  }

  handleReplyClick() {
    this.setState({ showSendDiscuss: !this.state.showSendDiscuss });
  }

  discussAdd(obj) {
    const o = Object.assign({}, obj, { replyTo: this.props.discuss.email });
    this.props.db.get(this.props.commentId)
      .then(res => {
        res.discuss.push(o);
        return res;
      })
      .then((res) => this.props.db.put(res));
  }


  convertDate(time) {
    const date = new Date(time);
    const t = date.toLocaleTimeString();
    const d = date.toLocaleDateString();
    return `${t}  ${d}`;
  }

  genReplyTitle(obj) {
    const normalTitle = <p>{obj.email}·{this.convertDate(obj.date)}</p>;
    const replyTitle = <p>{obj.email}·回复：{obj.replyTo}</p>;
    return obj.replyTo ? replyTitle : normalTitle;
  }

  render() {
    const discuss = this.props.discuss;
    return (
      <div
        className={style.postBox}
      >
        <div className={style.postBoxLeft}>
          <a href={getHeadUrl(discuss.email)} className={style.userHeadUrl}>
            <img alt="userhead" src={getHeadUrl(discuss.email)} className={style.userHead} />
          </a>
        </div>
        <div className={style.textWrap}>
          {this.genReplyTitle(discuss)}
          <p>{discuss.comment}</p>
          <span onClick={this.handleReplyClick} className={style.replyBtn}><Icon type="enter" />回复</span>
          {this.state.showSendDiscuss ? <SendDiscussBox discussAdd={this.discussAdd} isReply /> : null}
        </div>
      </div>
    );
  }
}

export default Discuss;
