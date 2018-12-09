import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, List, Cell, Avatar } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './Main.css';

const osname = platform();

const Jury = props => (
  <Panel id={props.id} theme="white">
    <PanelHeader
      noShadow
      addon={<HeaderButton onClick={props.go} data-to="home">Назад</HeaderButton>}
      left={<HeaderButton onClick={props.go} data-to="home">
        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
      </HeaderButton>}
    >
      Члены жюри
    </PanelHeader>
    <Group>
      <List>
        <Cell href="https://vk.com/roomfactory" before={<Avatar src="https://pp.userapi.com/c633824/v633824733/36cb6/ykXO-a0nyV4.jpg" />}description="Популярные комедийные скетчи">Канал Room Factory</Cell>
        <Cell href="https://vk.com/vizzzov" before={<Avatar src="https://pp.userapi.com/c834301/v834301002/77da9/vMD7czlOnyk.jpg" />}description="Развлекательные челленджи и розыгрыши">Канал LizzzTV</Cell>
        <Cell href="https://vk.com/andrewnemodruk" before={<Avatar src="https://pp.userapi.com/c621702/v621702575/314f3/Kht6sVzKOss.jpg?ava=1" />}description="Пародист и комик, автор ND Production">Андрей Немодрук</Cell>
      </List>
    </Group>
  </Panel>
);

Jury.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};

export default Jury;
