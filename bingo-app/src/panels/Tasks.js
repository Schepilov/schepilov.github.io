import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Button, platform, IOS, FixedLayout, Div} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './Main.css';

const osname = platform();

const Tasks = props => (
	<Panel id={props.id} theme="white">
		<PanelHeader
			noShadow
      addon={<HeaderButton onClick={props.go} data-to="home">Назад</HeaderButton>}
			left={<HeaderButton onClick={props.go} data-to="home">
			{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Список заданий
		</PanelHeader>
    <div className="TasksImage" />
    <FixedLayout vertical="bottom">
      <Div>
        <Button size="xl" level="secondary" component="a" href="https://pp.userapi.com/c845520/v845520497/52ffc/IYQC2xrRrUY.jpg">Открыть в полном размере</Button>
      </Div>
    </FixedLayout>
	</Panel>
);

Tasks.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Tasks;
