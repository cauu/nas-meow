import React, { PureComponent } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import './style.less';

export default class Gallery extends PureComponent {
  state = {
    expanded: false
  };

  render() {
    const { photos } = this.props;
    const { expanded } = this.state; 

    return (
      <div className="gallery-wrapper">
        {
          _(photos)
            .filter((photo) => photo !== '')
            .chunk(3)
            .map((row) => (
              <div className="row">
                {
                  row.map((item) => (
                    <div className="item" style={{backgroundImage: `url(${item})`}}> 
                    </div>
                  ))
                }
              </div>
            ))
            .slice(0, expanded ? photos.length : 2)
            .value()
        }
        {
          _(photos).chunk(3).value().length > 2 &&
            <div onClick={() => this.setState({expanded: !expanded})} className="row-expand">
              <span>
                {expanded && '收起' || '展开'}
              </span>
              <div className={classnames("btn-expand", {expanded: expanded})}/>
            </div>
        }
      </div>
    );
  }
}