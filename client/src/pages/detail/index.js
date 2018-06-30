import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MeowCard from '../../components/card';
import Gallery from '../../components/gallery';

import './style.less';

const debugData = [
  {
    name: '安娜娜',
    gender: 'f',
    birthday: '2017-01-15',
    isSterilized: 'true',
    weight: 5,
    likes: 1000,
    desc: '鼻子上长了痘痘的小喵咪',
    photos: `
      http://paga738og.bkt.clouddn.com/2578032-7892f70d952438fb.jpg,
      http://paga738og.bkt.clouddn.com/2578032-7892f70d952438fb.jpg,
      http://paga738og.bkt.clouddn.com/2578032-7892f70d952438fb.jpg,
      http://paga738og.bkt.clouddn.com/2578032-7892f70d952438fb.jpg,
      http://paga738og.bkt.clouddn.com/2578032-7892f70d952438fb.jpg,
      http://paga738og.bkt.clouddn.com/2578032-7892f70d952438fb.jpg,
      http://paga738og.bkt.clouddn.com/2578032-7892f70d952438fb.jpg,
      http://paga738og.bkt.clouddn.com/2578032-7892f70d952438fb.jpg,
      http://paga738og.bkt.clouddn.com/2578032-7892f70d952438fb.jpg
    `
  }
];

class Detail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const card = debugData[0];
    const photos = card.photos && card.photos.split(',') || [];

    return (
      <div className="detail-wrapper">
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
          </div>
        </div>

        <Gallery photos={photos} />
      </div>
    );
  }
}

export default Detail;