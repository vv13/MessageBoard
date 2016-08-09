import style from './style.css';
import React, { Component } from 'react';
import NavItem from 'components/NavItem';

class Nav extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <nav className={style.nav}>
        <div className={style.navItems}>
          <NavItem
            linkUrl="/"
            iconType="home"
            str="主页"
            className={style.navIcon}
          />
          <NavItem
            linkUrl="/messageBoard"
            iconType="file-text"
            str="留言板"
            className={style.navIcon}
          />
        </div>
      </nav>
    );
  }
}

export default Nav;
