import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd';


class NavItem extends Component {
  static propTypes = {
    linkUrl: PropTypes.string,
    iconType: PropTypes.string,
    str: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={style.navItem}>
        <a href={this.props.linkUrl} className={style.navItemLink}>
          <span className={style.navItemWrap}>
            <Icon type={this.props.iconType} style={{ marginRight: '3px' }} />
            {this.props.str}
          </span>
        </a>
      </div>
    );
  }
}

export default NavItem;
