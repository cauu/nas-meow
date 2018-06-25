import React from 'react';
import { render } from 'react-dom'

render(<div>test</div>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}

