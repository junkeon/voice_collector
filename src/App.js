import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import useStyles from './components/styled'
import NavBar from './components/NavBar'
import Record from './components/RecordDiv'
import DisplayList from './components/DisplayList'

export default function SimpleCard() {
  const classes = useStyles();

  const [sentList, setSentList] = useState([
    { id: 0, text: '옷에 직접 비늘조각을 꿰어\n 붙인다는 점에서\n 조각들끼리만 꿰어서\n 옷 위에 걸쳐 입는 찰갑과 구분된다.', done: false },
    { id: 1, text: '섀도우 헌터스 원 뼈의 도시는 \n카산드라 클레어의 소설로,\n 섀도우 헌터스 시리즈의 첫 작품이다.', done: false },
    { id: 2, text: '네이버 웹툰에서 연재하고 있는 \n상하 작가의 웹툰이며,\n 네이버 수요일 웹툰 이위를 한 \n인기 웹툰이기도 하다.', done: false },
    { id: 3, text: '저도 얘기만 들었지, \n직접 와보기는 처음이네요,\n 듣던 대로 구경할 게 \n정말 많네요.', done: false },
    { id: 4, text: '한 사람 더 왔다고 아까 얘기했어요,\n 술잔이랑 앞접시 좀 빨리 주세요.', done: false },
    { id: 5, text: '술 못 마신다는 얘긴 못 들었는데,\n 왜 못 먹는 거야?', done: false },
    { id: 6, text: '말 꺼내기 쉽지 않은 걸 보니,\n 한잔하면서 툭 터놓고 얘기할까?', done: false },
    { id: 7, text: '가산디지털단지 차 막히는 거야 \n하루 이틀 얘긴가요, \n상관없으니까 안전하게 가주세요.', done: false },
    { id: 8, text: '너무 예쁘다, 고맙다 얘들아.', done: false },
  ])

  const [mode, setMode] = useState('show')
  const [index, setIndex] = useState(0)


  function showContent() {
    if (mode === 'show') {
      return (<DisplayList
        classes={classes}
        sentList={sentList}
        onClick={(id) => {
          setIndex(id)
          setMode('record')
        }} />)
    } else if (mode === 'record') {
      return (<Record
        classes={classes}
        sentList={sentList}
        setSentList={setSentList}
        index={index}
        setIndex={setIndex} />)
    }
  }

  return (
    <Card className={classes.card}>
      <NavBar classes={classes} onClick={() => { setMode('show') }} />
      <CardContent className={classes.cardContent}>
        {showContent()}
      </CardContent>
    </Card>
  );
}