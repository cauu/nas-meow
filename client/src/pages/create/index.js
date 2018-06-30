import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Switch,
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
import { createPet } from '../../services/meow';

import './style.less';

const Item = List.Item;
const RadioItem = Radio.RadioItem;

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      loading: false
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

  onSubmit = () => {
    const { form } = this.props;
    const { files } = this.state;

    form.validateFields(async (err, value) => {
      if(err) {
        const errFields = Object.keys(err);
        Toast.fail(err[errFields[0]].errors[0].message, 2);
        return;
      }

      if(!files[0] || !files[0].url) {
        Toast.fail('请为猫咪上传头像', 2);
        return;
      }

      try {
        const result = await createPet(
          value.name,
          files[0].url,
          value.gender,
          moment(value.birthday).format('YYYY-MM-DD'),
          value.weight,
          value.desc,
          value.isSterilization,
          "",
          "",
          () => {
            this.setState({
              loading: true
            });
          }
        )

        const catInfo = result.receipt.execute_result;

        let myCats = [];
        let catId = '';

        if(!!localStorage.getItem('myCats')) {
          myCats = JSON.parse(localStorage.getItem('myCats'));
        }

        if(/^{\"id\":(\d+).*$/g.test(catInfo)) {
          myCats.push((RegExp.$1));
          catId = RegExp.$1;
          localStorage.setItem('myCats', JSON.stringify(myCats));
        }

        this.setState({
          loading: false
        }, () => {
          Toast.success('喵卡创建成功', 5, () => {
            this.props.history.push(`/detail/${catId}`);
          }, true);
        });
      } catch(e) {
        this.setState({
          loading: false
        }, () => {
          Toast.fail('喵卡创建失败', 5, () => {}, true);
        });
      }
    });
  }

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;

    return (
      <div className="create-wrapper">
        <ActivityIndicator animating={this.state.loading} toast text="正在提交" />

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
            <List.Item
              extra={
                getFieldDecorator('isSterilization', {
                  initialValue: true,
                  valuePropName: 'checked',
                })(
                <Switch
                  color="#ffc59a"
                />)}
            >是否绝育</List.Item>
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
                    rows={2}
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