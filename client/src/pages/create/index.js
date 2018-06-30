import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { Link } from 'react-router-dom';
import {
  Button,
  Toast,
  ActivityIndicator,
  List,
  ImagePicker,
  InputItem,
  DatePicker,
  Picker,
  TextareaItem,
  Radio,
  WhiteSpace
} from 'antd-mobile';

import { uploadImg } from '../../services/upload';

import './style.less';

const Item = List.Item;
const RadioItem = Radio.RadioItem;

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }

  onImgPick = async (files, type, index) => {
    if(files.length < this.state.files.length) {
      this.setState({
        files
      });
      return;
    }
    const newFile = files && files.length && files[files.length - 1];
    const uploaded = await uploadImg(newFile.file, newFile.name, (res) => {console.log('uploading', res)});
    this.setState({
      files: [
        ...files.slice(0, files.length - 1),
        {...files[files.length - 1], url: 'http://paga738og.bkt.clouddn.com/' + uploaded.key}
      ]
    });
  }

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;

    return (
      <div className="create-wrapper">
        <Link to="/">
          <div className="row-header">
            <div className="icon-back"></div>
            <div className="text">
              注册新猫
            </div>
          </div>
        </Link>

        <div className="form-wrapper">
          <List renderHeader={() => '基本信息'}>
            <ImagePicker
              files={this.state.files}
              onChange={this.onImgPick}
              selectable={this.state.files.length > 0 ? false : true}
            />
            {
              getFieldDecorator('name', {
                rules: [
                  {required: true, message: '请输入猫名'}
                ]
              })(
                <InputItem placeholder="输入猫名">
                  猫名
                </InputItem>
              )
            }
            {
              getFieldDecorator('gender', {
                initialValue: ['f'],
                rules: [{required: true, message: '请输入猫的性别'}]
              })(
                <Picker
                  data={[{label: '女', value: 'f'}, {label: '男', value: 'm'}]}
                  title="选择性别"
                >
                  <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
              )
            }
            {
              getFieldDecorator('birthday', {
                rules: [{required: true, message: '请选择生日' }]
              })(
                <DatePicker
                  mode="date"
                  title="请选择生日"
                >
                  <Item>生日</Item>
                </DatePicker>
              )
            }
            {
              getFieldDecorator('weight', {
                rules: [{required: true, message: '请输入体重(kg)'}]
              })(
                <InputItem placeholder="体重（kg）">
                  体重
                </InputItem>
              )
            }
            <List renderHeader="一句话介绍">
              {
                getFieldDecorator('desc', {
                  rules: [{ required: true, message: '请简单介绍一下猫咪' }]
                })(
                  <TextareaItem 
                    placeholder="爱吃啥，有啥特点..."
                    rows={3}
                  />
                )
              }
            </List>
          </List>

          <WhiteSpace size="lg" />

          <Button onClick={this.onSubmit} type="primary">
            提交
          </Button>
        </div>
      </div>
    );
  }
}

export default createForm()(Create);