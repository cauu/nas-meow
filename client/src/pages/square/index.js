import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { ActivityIndicator } from 'antd-mobile';

import SimpleCard from '../../components/simple-card';

import './style.less';
import { debug } from 'util';

@inject('meowStore')
@observer
class Square extends Component {
  constructor(props) {
    super(props);

    props.meowStore.getAllPets();
  }

  onCardClick = ({id}) => {
    const { history } = this.props;

    history.push(`/detail/${id}`);
  }

  render() {
    const { meowStore } = this.props;
    const cards = meowStore.petList;

    return (
      <div className="square-wrapper">
        <ActivityIndicator animating={meowStore.isLoading} toast text="正在加载" />

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
          (cards || []).map((card) => {
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