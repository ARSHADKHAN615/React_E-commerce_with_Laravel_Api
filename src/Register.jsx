import React, { useState, useEffect } from 'react'
import Header from "./Header";
import { TextField, Button, FormControlLabel, Checkbox, Paper, makeStyles, IconButton, Collapse, LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';


import { Form, Container, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
    },

}));

function Register() {
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            history.push("/add")
        }
    }, [])

    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [Message, setMessage] = useState({
        "name": null,
        "email": null,
        "password": null,
    });


    const [SuccessMessage, setSuccessMessageOpen] = useState(false);
    const [ErrorMessage, setErrorMessageOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false)

    function signUp() {
        if (checked) {
            if (password === cPassword) {
                setLoading(true);
                let Item = { name, email, password, cPassword };
                // console.log(Item);
                fetch("http://127.0.0.1:8000/api/register", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(Item)
                }).then((response) => response.json()).then((result) => {
                    if (result.id) {
                        setLoading(false);
                        setMessage({
                            "name": null,
                            "email": null,
                            "password": null,
                            // "Success": true
                        });
                        setSuccessMessageOpen(true);
                        localStorage.setItem("user-info", JSON.stringify(result))
                        setName("");
                        setEmail("");
                        setPassword("");
                        setCPassword("");
                        setChecked(true);
                        history.push("/add");
                        // setTimeout(() => {
                        // }, 2000);
                    } else if (result.name && result.password) {
                        setLoading(false);
                        setMessage({
                            "name": result.name[0],
                            "email": result.email[0],
                            "password": result.password[0],
                        });
                    } else {
                        setLoading(false);
                        setMessage({
                            "name": null,
                            "email": result.email[0],
                            "password": null,
                        });
                    }
                    console.log(result);
                }).catch((error) => {
                    // console.log(error + "  " + "My Error")
                    setErrorMessageOpen(true);

                })
                // console.log(Message);
            } else {
                setMessage({ "match": "Password Not Match" })
            }
        } else {
            setMessage({ "checked": "Please Checked" })
        }
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
                    <AlertTitle>Registration Successfully</AlertTitle>
            You are Register — <strong>Please Login!</strong>
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
                    <AlertTitle>Something Wrong</AlertTitle>
                Please — <strong>Try again!</strong>
                </Alert>
            </Collapse>


            <Container className="my-5">
                <Row className="justify-content-center">
                    <div className="col-12 col-md-6 p-0">
                        <Paper elevation={4} className={classes.paper} >
                            <Form>
                                <h1 className="text-center mb-4">Register</h1>
                                <Form.Group controlId="formBasicEmail">
                                    <TextField type="text" label="Enter Name" variant="outlined" fullWidth={true} value={name} onChange={(e) => setName(e.target.value)} />
                                    <Form.Text className="text-danger">
                                        {Message ? Message.name : null}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <TextField type="email" label="Enter Email" variant="outlined" fullWidth={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Text className="text-danger">
                                        {Message ? Message.email : null}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <TextField type="password" label="Enter Password" variant="outlined" fullWidth={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Form.Text className="text-danger">
                                        {Message ? Message.password : null}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <TextField type="password" label="Enter Confirm Password" variant="outlined" fullWidth={true} value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
                                    <Form.Text className="text-danger">
                                        {Message.match ? Message.match : null}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary" checked={checked} onChange={() => setChecked(!checked)} />
                                        }
                                        label="Check me out"
                                    />
                                </Form.Group>
                                <Button variant="contained" color="secondary" size="large" onClick={signUp} disabled={!checked}>
                                    Register
                             </Button>
                            </Form>
                        </Paper>
                    </div>
                </Row>
            </Container>

        </>
    )
}

export default Register
