import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MeowCard from '../../components/card';
import AddCard from '../../components/add-card';

import './style.less';

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
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
  }

  onCardClick = ({id}) => {
    const { history } = this.props;

    history.push(`/detail/${id}`);
  }

  render() {
    const { history } = this.props;
    const cardsInfo = debugData;
    const alreadyHasCard = cardsInfo &&  cardsInfo.length > 0;

    return (
      <div className="home-wrapper">
        <div className="row-header">
          <span className="active">
            我的猫卡
          </span>
          <span> | </span>
          <Link to="/square">
            随便逛逛
          </Link>
        </div>
        <div className="card-wrapper">
          {
            cardsInfo.map((card) => (
              <MeowCard onClick={this.onCardClick} {...card} />
            ))
          }
        </div>
        <AddCard
          text={alreadyHasCard && '再添加一张喵卡' || '添加一张喵卡'}
        />
      </div>
    );
  }
}

export default Home;