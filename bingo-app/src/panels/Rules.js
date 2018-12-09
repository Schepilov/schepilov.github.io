import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Div } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { Link } from '@vkontakte/vkui';
import './Main.css';

const osname = platform();

const Rules = props => (
  <Panel id={props.id} theme="white">
    <PanelHeader
      noShadow
      addon={<HeaderButton onClick={props.go} data-to="home">Назад</HeaderButton>}
      left={<HeaderButton onClick={props.go} data-to="home">
        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
      </HeaderButton>}
    >
      Правила бинго
    </PanelHeader>
    <Div className="Rules">
      <ol>
       <li>Бинго представляет собой таблицу из 20 клеток. Чтобы завершить бинго, нужно выполнить задания из любой строки и любого столбца. То есть всего нужно сделать <nobr>7–8</nobr> заданий. Выбирать задания по диагонали нельзя.</li>
       <li>Каждое задание нужно выполнить в прямом эфире с мобильного приложения ВКонтакте для Android или iOS.</li>
       <li>Перед началом трансляции зайдите в настройки трансляций и убедитесь, что они не скрыты приватностью и будут опубликованы на стене страницы или сообщества. Иначе жюри не смогут оценить Ваши работы.</li>
       <li>Укажите в названии трансляции хештег <strong>#BingoNewYearStreamers</strong>.</li>
       <li>Чтобы жюри было удобнее оценивать работы, помимо хэштега укажите в названии трансляции тему выполняемого задания.</li>
       <li>Одно задание = одна работа. Нельзя снять универсальную трансляцию, которая закроет сразу несколько клеток.</li>
       <li>В бинго участвуют только новые работы. Записи старых трансляций не принимаются.</li>
       <li>Выполнять задания можно в любом удобном порядке.</li>
       <li>Срок выполнения — 20 дней, работы принимаются до 13 января включительно.</li>
       <li>После выполнения всех заданий, пожалуйста, заполните <Link href="https://vk.com/authors">форму участника</Link>.</li>
      </ol>
    </Div>
  </Panel>
);

Rules.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};

export default Rules;
