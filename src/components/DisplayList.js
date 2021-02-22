import React, { useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MicIcon from '@material-ui/icons/Mic';

import { ListSubheader, Typography } from '@material-ui/core';

function ListItemLink({ item }) {
    return (
        <ListItem button style={{ marginTop: 3 }}>
            <ListItemIcon>
                {item['done'] ? <MicIcon color='primary' /> : <MicIcon color='disabled' />}
            </ListItemIcon>
            <Typography variant="h5" noWrap={true}>{item['text']}</Typography>
        </ListItem>
    );
}

function DisplayList({ classes}) {
    const subheaderStyle = {
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 25,
        color: '#363488',
    }

    const sentList = [
        {id:0, text:'안녕하세요. 반갑습니다.', done:false}
    ]

    const undoneNum = sentList.filter(item => !item.done).length

    return (
        <div className={classes.listContent}>
            <List component="nav">
                <ListSubheader style={subheaderStyle}>Number of undone list : {undoneNum}</ListSubheader>
                {sentList.map((item, idx) => { return <ListItemLink key={idx} item={item}/> })}
            </List>
        </div>
    )
}

export default DisplayList