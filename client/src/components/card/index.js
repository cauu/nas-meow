import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.less';

export default class Card extends PureComponent {
  render() {
    const {
      id,
      name,
      isSterilized,
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
            <div className="gender male">
              {gender}
            </div>
            <div className="text">
              {birthday}
            </div>
          </div>

          <div className="row row-weight">
            <div className="icon weight" />
            <span className="text">
              {weight}
            </span>
          </div>

          <div className="row row-desc">
            <div className="icon desc" />
            <span className="text">
              {weight}
            </span>
          </div>

          <div className="row row-likes">
            <div className="icon likes" />
            <span className="text">
              {weight}
            </span>
          </div>
        </div>

        <div className="right-wrapper">
          <div className="avatar">
          </div>

          <div className="id">
            {`喵卡号: 123`}
          </div>
        </div>
      </div>
    );
  }
}