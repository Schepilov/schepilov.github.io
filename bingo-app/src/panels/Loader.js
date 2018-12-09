import React from 'react';
import { Panel, Spinner } from '@vkontakte/vkui';

const Loader = props => (
	<Panel id="spinner" theme="white">
	    <div style={{ height: 300 }}>
	    	<Spinner />
	    </div>
    </Panel>
);

export default Loader;
