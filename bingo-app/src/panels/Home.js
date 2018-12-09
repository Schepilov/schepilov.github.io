import React from 'react';
import './Main.css';
import { Panel, Button, PanelHeader, Group, List, Cell, FixedLayout, Div } from '@vkontakte/vkui';
import Icon24Note from '@vkontakte/icons/dist/24/note';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Gift from '@vkontakte/icons/dist/24/gift';
import Icon24Education from '@vkontakte/icons/dist/24/education';

const Home = props => (
	<Panel id={props.id} theme="white">
		<PanelHeader>Оглавление</PanelHeader>
		<div class="IntroScreen">
			<div className="IntroImage" />
			<div class="IntroTitle">Бинго трансляций</div>
			<div class="IntroDesc">Проводите новогодние трансляции, выполняя задания бинго, и получите шанс выиграть крутые призы!</div>
		</div>
		<Group style={{ marginTop: 25}}>
	      <List>
	        <Cell onClick={props.go} data-to="tasks" expandable before={<Icon24Note fill="var(--accent)" />}>Задания</Cell>
	        <Cell onClick={props.go} data-to="rules" expandable before={<Icon24Info fill="var(--accent)" />}>Правила</Cell>
	        <Cell onClick={props.go} data-to="prizes" expandable before={<Icon24Gift fill="var(--accent)" />}>Призы</Cell>
	        <Cell onClick={props.go} data-to="jury" expandable before={<Icon24Education fill="var(--accent)" />}>Жюри</Cell>
	      </List>
	    </Group>
		<FixedLayout vertical="bottom">
		  <Div>
		    <Button size="xl" component="a" href="https://vk.com/camera?section=live&title=%23BingoNewYearStreamers">Начать трансляцию</Button>
		  </Div>
		</FixedLayout>
	</Panel>
);

export default Home;
