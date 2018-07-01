import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { addPreZero } from '../../utils';

import './style.less';

export default class SimpleCard extends PureComponent {
  render() {
    const {
      id,
      name,
      avatar,
      birthday,
      gender,
      isSterilization,
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
            <div className={classnames('gender', {male: gender === 'm'}, {female: gender === 'f'})}>
              {isSterilization && '已绝育' || '未绝育'}
            </div>
            <div className="text">
              {birthday}
            </div>
            <div className="text id">
              {`喵卡号：${addPreZero(id)}`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}