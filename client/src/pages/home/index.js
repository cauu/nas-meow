import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { ActivityIndicator } from 'antd-mobile';

import MeowCard from '../../components/card';
import AddCard from '../../components/add-card';

import './style.less';

@inject('meowStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props);

    props.meowStore.getMyPets();
  }

  onCardClick = ({id}) => {
    const { history } = this.props;

    history.push(`/detail/${id}`);
  }

  render() {
    const { history, meowStore } = this.props;
    const cardsInfo = meowStore.myPets;
    const alreadyHasCard = cardsInfo &&  cardsInfo.length > 0;

    return (
      <div className="home-wrapper">
        <ActivityIndicator animating={meowStore.isLoading} toast text="正在加载" />

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
              <div className="item">
                <MeowCard onClick={this.onCardClick} {...card} />
              </div>
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