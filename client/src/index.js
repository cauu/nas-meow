import React from 'react';
import { render } from 'react-dom'

import Root from './pages';

import './styles/index.less';

render(<Root />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}

