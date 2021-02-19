import React from 'react';
import { Button, Input, Typography } from '@material-ui/core';

function Login({ classes, user, passwd, userInfo, setUserInfo, onClick}) {    

    const onChange = e => {
        const { name, value } = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    return (
        <div className={classes.loginContent}>
            <Typography variant="h4" style={{ marginBottom: 30 }}>Login to your account</Typography>
            <form>
                <Input type="text"
                    name="user"
                    placeholder="username"
                    className={classes.loginInput}
                    value={user}
                    onChange={onChange} />
                <Input type="password"
                name="passwd"
                    placeholder="password"
                    className={classes.loginInput}
                    value={passwd} 
                    onChange={onChange} />
                <Button variant="contained"
                    color="primary"
                    onClick={onClick}>Log in</Button>
            </form>
        </div>
    )
}

export default Login



