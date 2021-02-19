import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MicIcon from '@material-ui/icons/Mic';

import { ListSubheader, Typography } from '@material-ui/core';

function ListItemLink({ item, onClick }) {
    return (
        <ListItem button style={{ marginTop: 5 }} onClick={()=>{onClick(item.id)}}>
            <ListItemIcon>
                {item['done'] ? <MicIcon color='primary' /> : <MicIcon color='disabled' />}
            </ListItemIcon>
            <Typography noWrap={true}>{item['text']}</Typography>
        </ListItem>
    );
}

function DisplayList({ classes, sentList, onClick }) {
    const subheaderStyle = {
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 25,
        color: '#363488',
    }

    const undoneNum = sentList.filter(item => !item.done).length

    return (
        <div className={classes.listContent}>
            <List component="nav">
                <ListSubheader style={subheaderStyle}>Number of undone list : {undoneNum}</ListSubheader>
                {sentList.map((item, idx) => { return <ListItemLink key={idx} item={item} onClick={onClick}/> })}
            </List>
        </div>
    )
}

export default DisplayList