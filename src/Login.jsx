
import React, { useState, useEffect } from 'react'
import Header from "./Header";
import { TextField, Button, Paper, makeStyles, IconButton, Collapse, LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';


import { Form, Container, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
    },

}));

function Login() {
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            history.push("/add")
        }
    }, [])

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Message, setMessage] = useState({
        "email": null,
        "password": null,
    });

    const [SuccessMessage, setSuccessMessageOpen] = useState(false);
    const [ErrorMessage, setErrorMessageOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    function loginUser() {
        setLoading(true);
        let Item = { email, password };
        fetch("http://127.0.0.1:8000/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(Item)

        }).then((response) => response.json()).then((result) => {
            console.log(result);
            if (result.error) {
                setLoading(false);
                setMessage({
                    "error": result.error[0]
                })
                setSuccessMessageOpen(false);
                setErrorMessageOpen(true);
            } else if (result.name && result.id) {
                setLoading(false);
                setErrorMessageOpen(false);
                setSuccessMessageOpen(true);
                localStorage.setItem("user-info", JSON.stringify(result))
                history.push("/add");

            } else if (result.line === 678) {
                setLoading(false);
                setMessage({
                    "error": "Something Wrong"
                })
                setSuccessMessageOpen(false);
                setErrorMessageOpen(true);
            }
        }).catch((error) => {
            console.log(error + "  " + "My Error")
            setErrorMessageOpen(true);
        })

    }

    return (
        <>
            <Header />
            {
                loading ? <LinearProgress /> : null
            }

            {/* SUCCESS  */}
            <Collapse in={SuccessMessage}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setSuccessMessageOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>Login Successfully</AlertTitle>
                </Alert>
            </Collapse>

            {/* ERROR  */}
            <Collapse in={ErrorMessage} >
                <Alert severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setErrorMessageOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>{
                        Message.error ? Message.error : "Something Wrong"
                    }</AlertTitle>
                Please — <strong>Try again!</strong>
                </Alert>
            </Collapse>


            <Container className="my-5">
                <Row className="justify-content-center">
                    <div className="col-12 col-md-6 p-0">
                        <Paper elevation={4} className={classes.paper} >
                            <Form>
                                <h1 className="text-center mb-4">Login</h1>
                                <Form.Group controlId="formBasicPassword">
                                    <TextField type="email" label="Enter Email" variant="outlined" fullWidth={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <TextField type="password" label="Enter Password" variant="outlined" fullWidth={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="contained" color="secondary" size="large" onClick={loginUser}>
                                    Login
                             </Button>
                            </Form>
                        </Paper>
                    </div>
                </Row>
            </Container>

        </>
    )

}
export default Login

