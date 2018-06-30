import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.less';

export default class SimpleCard extends PureComponent {
  render() {
    const {
      id,
      name,
      avatar,
      birthday,
      gender,
      onClick
    } = this.props;

    return (
      <div className="simple-card-wrapper" onClick={() => onClick && onClick({id})}>
        <div className="left-wrapper">
          <div className="avatar" style={{backgroundImage: `url(${avatar})`}} />
        </div>
        
        <div className="middle-wrapper">
          <div className="row row-name">{name}</div>
          <div className="row row-age">
            <div className="gender male">
              {gender}
            </div>
            <div className="text">
              {birthday}
            </div>
            <div className="text id">
              {`喵卡号：${id}`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}