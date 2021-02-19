import React from 'react';

import { IconButton, Toolbar, AppBar, Typography } from '@material-ui/core';

import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';

function NavBar({ classes, onClick }) {
    return (
        <AppBar className={classes.appbar} elevation={1} >
            <Toolbar className={classes.toolbar}>
                <IconButton color="inherit" aria-label="List" onClick={onClick}>
                    <ListIcon fontSize="large" />
                </IconButton>
                <div className={classes.barTitle}>
                    <Typography variant="h4">
                        Voice Collector
                    </Typography>
                </div>
                <IconButton color="inherit" aria-label="Setting" disabled={true}>
                    <SettingsIcon fontSize="large" />
                </IconButton>
            </Toolbar>
        </AppBar>
    )

}

export default NavBar