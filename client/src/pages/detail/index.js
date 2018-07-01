import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { ActivityIndicator, Progress, Toast } from 'antd-mobile';

import MeowCard from '../../components/card';
import Gallery from '../../components/gallery';

import './style.less';

@inject('meowStore')
@observer
class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiking: false
    };

    const { id } = props.match.params;

    props.meowStore.getPetDetail(id);
  }

  onLikeClick = async (id) => {
    await this.props.meowStore.likePet(id);

    Toast.success('点赞成功', 2);
  }

  render() {
    const { meowStore } = this.props;
    const card = meowStore.petDetail;
    const photos = card.photos && card.photos.split(',') || [];

    return (
      <div className="detail-wrapper">
        <ActivityIndicator
          animating={meowStore.isLiking}
          toast
          text="正在点赞"
        />

        <ActivityIndicator
          animating={meowStore.isLoading}
          toast
          text="正在加载"
        />

        <div className="content-wrapper">
          <Link to="/">
            <div className="row-header">
              <div className="icon-back"></div>
              <div className="text">
                {card.name}
              </div>
            </div>
          </Link>

          <MeowCard {...card} />

          <div className="row-like">
            <div className="text">
              {`为我点赞 ${card.likes}`}
            </div>
            <Progress percent={(card.likes / 50)} position="normal" />
            <div onClick={() => this.onLikeClick(card.id)} className="btn-like" />
          </div>
        </div>

        <Gallery {...card} photos={photos} />
      </div>
    );
  }
}

export default Detail;