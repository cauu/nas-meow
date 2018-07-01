import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { addPreZero } from '../../utils';

import './style.less';

export default class Card extends PureComponent {
  render() {
    const {
      id,
      name,
      isSterilization,
      gender,
      age,
      birthday,
      weight,
      likes,
      desc,
      avatar,
      onClick
    } = this.props;

    return (
      <div onClick={() => onClick && onClick({id})} className="meow-card-wrapper">
        <div className="left-wrapper">
          <div className="row-name">{name}</div>
          <div className="row row-age">
            <div className={classnames('gender', {male: gender === 'm'}, {female: gender === 'f'})}>
              {isSterilization && '已绝育' || '未绝育'}
            </div>
            <div className="text">
              {`出生于${birthday}`}
            </div>
          </div>

          <div className="row row-weight">
            <div className="icon weight" />
            <span className="text">
              {`体重 ${weight} kg`}
            </span>
          </div>

          <div className="row row-desc">
            <div className="icon desc" />
            <span className="text">
              {desc}
            </span>
          </div>

          <div className="row row-likes">
            <div className="icon likes" />
            <span className="text">
              {`点赞数 ${likes}`}
            </span>
          </div>
        </div>

        <div className="right-wrapper">
          <div className="avatar" style={{backgroundImage: `url(${avatar})`}}>
          </div>

          <div className="id">
            {`喵卡号: ${addPreZero(id)}`}
          </div>
        </div>
      </div>
    );
  }
}