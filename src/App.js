import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import useStyles from './components/styled'
import NavBar from './components/NavBar'
import Record from './components/RecordDiv'
import DisplayList from './components/DisplayList'
import Login from './components/Login'



export default function SimpleCard() {
  const classes = useStyles();

  const [sentList, setSentList] = useState([])
  const [listBtn, setListBtn] = useState(true)
  const [mode, setMode] = useState('login')
  const [index, setIndex] = useState(0)

  const [userInfo, setUserInfo] = useState({ user: '', passwd: '' })
  const { user, passwd } = userInfo

  function onClick() {
    setMode('show')
    getScript()
    setListBtn(false)
  }

  function showContent() {
    if (mode === 'login') {
      return (<Login classes={classes}
        user={user} passwd={passwd} userInfo={userInfo}
        setUserInfo={setUserInfo}
        onClick={onClick} />)
    } else if (mode === 'show') {
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
        setIndex={setIndex}
        user={user} />)
    }
  }

  function getScript() {
    const recipeUrl = "http://0.0.0.0:5024/get_text"
    const postBody = {
      'user': user
    }
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };

    fetch(recipeUrl, requestMetadata)
      .then(res => res.json())
      .then(res => {
        const tmpList = []
        res['sent_list'].map(item => {
          const sent = { id: item[0], text: item[1], done: item[2] }
          tmpList.push(sent)
        })
        setSentList(tmpList)
      })
  }


  return (
    <>
      <Card className={classes.card}>
        <NavBar classes={classes} onClick={() => { setMode('show') }} listBtn={listBtn} />
        <CardContent className={classes.cardContent}>
          {showContent()}
        </CardContent>
      </Card>
    </>

  );
}