import React, { Component } from 'react';
import {
  ImagePicker,
  Toast
} from 'antd-mobile';

import { uploadImg } from '../../services/upload';
import { uploadPhotos } from '../../services/meow';

import './style.less';

export default class UploadBtn extends Component {
  files = []
  counter = 0;

  collectImgs = () => {
    const { onSuccess, onFail } = this.props;
    let isUploading = false;

    return (delta) => {
      setTimeout(async () => {
        if(isUploading) return;

        isUploading = true;

        try {
          const uploaded = await Promise.all(this.files.map((file) => {
            return uploadImg(file.file, file.name);
          }));

          onSuccess && onSuccess(uploaded);

          this.files = [];
          this.counter = 0;
          isUploading = false;
        } catch(e) {
          onError && onError(e);
          this.files = [];
          this.counter = 0;
          isUploading = false;
        }
      }, 500 + delta);
    }
  }

  uploadAfterCollected = this.collectImgs();

  onImgPick = (files, type, index) => {
    this.files = [...this.files, ...files];

    this.uploadAfterCollected(this.counter++);
  }

  render() {
    return (
      <div className="upload-btn">
        <ImagePicker
          files={[]}
          multiple={true}
          onChange={this.onImgPick}
          accept="image/gif,image/jpeg,image/jpg,image/png"
          onImageClick={(index, fs) => console.log(index, fs)}
        />
      </div>
    );
  }
}
