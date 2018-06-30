import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.less';

export default class AddCard extends PureComponent {
  render() {
    const { text } = this.props;

    return (
      <Link to="/create">
        <div className="add-card-wrapper">
          <div className="icon-add">
          </div>
          <div className="text">
            {text}
          </div>
          <div className="icon-paw">
          </div>
        </div>
      </Link>
    );
  }
}