import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.less';

export default class Card extends PureComponent {
  static propTypes = {

  };

  static defaultProps = {
  };

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
      avatar
    } = this.props;

    return (
      <div className="meow-card-wrapper">
        <div></div>
      </div>
    );
  }
}