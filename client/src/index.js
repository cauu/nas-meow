import React from 'react';
import { render } from 'react-dom'

import Root from './pages';

render(<Root />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}

