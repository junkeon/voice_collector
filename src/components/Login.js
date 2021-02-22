import React from 'react';
import { Button, Input, Typography } from '@material-ui/core';

function Login({ classes }) {

    return (
        <div className={classes.loginContent}>
            <Typography variant="h4" style={{ marginBottom: 30 }}>Login to your account</Typography>
            <form>
                <Input type="text"
                    name="user"
                    placeholder="username"
                    className={classes.loginInput}
                    />
                <Input type="password"
                    name="passwd"
                    placeholder="password"
                    className={classes.loginInput}
                    />
                <Button variant="contained"
                    color="primary" >Log in</Button>
            </form>
        </div>
    )
}

export default Login



