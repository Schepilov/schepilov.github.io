import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, List, Cell, Avatar } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './Main.css';
import PrizeOne from '../img/prize-one.jpg';
import PrizeTwo from '../img/prize-two.jpg';
import PrizeThree from '../img/prize-three.jpg';

const osname = platform();

const Prizes = props => (
  <Panel id={props.id} theme="white">
    <PanelHeader
      noShadow
      addon={<HeaderButton onClick={props.go} data-to="home">Назад</HeaderButton>}
      left={<HeaderButton onClick={props.go} data-to="home">
        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
      </HeaderButton>}
    >
      Список призов
    </PanelHeader>
    <Group>
      <List>
        <Cell before={<Avatar type="image" src={PrizeOne} size={56} />} description="за первое место">iPhone XS Max 512 ГБ</Cell>
        <Cell before={<Avatar type="image" src={PrizeTwo} size={56} />} description="за второе место">GoPro Hero 7 Black</Cell>
        <Cell before={<Avatar type="image" src={PrizeTwo} size={56} />} description="за третье место">GoPro Hero 7 Black</Cell>
        <Cell before={<Avatar type="image" src={PrizeThree} size={56} />} description="за четвёртое место" >Стабилизатор-монопод <nobr>DJI Osmo Mobile 2</nobr></Cell>
      </List>
    </Group>
  </Panel>
);

Prizes.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};

export default Prizes;
