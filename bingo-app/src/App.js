import React from 'react';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Tasks from './panels/Tasks';
import Rules from './panels/Rules';
import Prizes from './panels/Prizes';
import Jury from './panels/Jury';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home'
		};
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" go={this.go} />
				<Tasks id="tasks" go={this.go}/>
				<Rules id="rules" go={this.go}/>
				<Prizes id="prizes" go={this.go}/>
				<Jury id="jury" go={this.go}/>
			</View>
		);
	}
}

export default App;
