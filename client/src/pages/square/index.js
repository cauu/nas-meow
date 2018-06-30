import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SimpleCard from '../../components/simple-card';

import './style.less';
import { debug } from 'util';

const debugData = [
  {
    id: 0,
    name: '安娜娜',
    gender: 'f',
    birthday: '2017-01-15',
    isSterilized: 'true',
    weight: 5,
    likes: 1000,
    desc: '鼻子上长了痘痘的小喵咪',
  },
  {
    id: 1,
    name: '安娜娜',
    gender: 'f',
    birthday: '2017-01-15',
    isSterilized: 'true',
    weight: 5,
    likes: 1000,
    desc: '鼻子上长了痘痘的小喵咪',
  }
];

class Square extends Component {
  constructor(props) {
    super(props);
  }

  onCardClick = ({id}) => {
    const { history } = this.props;

    history.push(`/detail/${id}`);
  }

  render() {
    const cards = debugData;

    return (
      <div className="square-wrapper">
        <div className="row-header">
          <Link to="/">
            我的猫卡
          </Link>
          <span> | </span>
          <span className="active">
            随便逛逛
          </span>
        </div>

        {
          cards.map((card) => {
            return (
              <div className="item-wrapper">
                <SimpleCard {...card} onClick={this.onCardClick} />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Square;