import React, { useState, useEffect } from 'react'
import Header from "./Header";
import { TextField, Button, Paper, makeStyles, IconButton, Collapse, LinearProgress, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core'
import { Alert, AlertTitle } from "@material-ui/lab";

import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';
import AddCircleIcon from '@material-ui/icons/AddCircle';


import { Form, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import "./AddProduct.css"
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
    },

}));



function AddProduct() {
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            history.push("/add")
        }
    }, [])

    const classes = useStyles();
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [file_path, setFile] = useState("");

    const [Message, setMessage] = useState({
        "productName": null,
        "price": null,
        "file_path": null,
        "description": null,
    });

    const [SuccessMessage, setSuccessMessageOpen] = useState(false);
    const [ErrorMessage, setErrorMessageOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    function AddProduct() {
        const Item = { productName, price, file_path, description };

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("file_path", file_path);
        formData.append("description", description);

        setLoading(true);
        fetch("http://127.0.0.1:8000/api/add", {
            method: 'POST',
            body: formData
        }).then((response) => {
            return response.json();
        }).then((result) => {
            setLoading(false);
            console.log(result);
            if (Object.keys(result).length == 4) {
                setMessage({
                    "productName": result.productName[0],
                    "price": result.price[0],
                    "file_path": result.file_path[0],
                    "description": result.description[0],
                })
            } else if (result.productName) {
                setMessage({
                    "productName": result.productName[0],
                    "price": null,
                    "file_path": null,
                    "description": null,
                })
            } else if (result.price) {
                setMessage({
                    "productName": null,
                    "price": result.price[0],
                    "file_path": null,
                    "description": null,
                })
            } else if (result.description) {
                setMessage({
                    "productName": null,
                    "price": null,
                    "file_path": null,
                    "description": result.description[0],
                })
            } else if (result.file_path) {
                setMessage({
                    "productName": null,
                    "price": null,
                    "description": null,
                    "file_path": result.file_path[0],
                })
            }


            if (Object.keys(result).length > 4) {
                setMessage({
                    "productName": null,
                    "price": null,
                    "description": null,
                    "file_path": null,
                })
                setProductName("")
                setPrice("")
                setDescription("")
                setFile("")
                setSuccessMessageOpen(true);
            }

        }).catch((error) => {
            setLoading(false);
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
                    <AlertTitle>Product Add Successfully</AlertTitle>
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
                    <div className="col-12 col-md-12 p-0">
                        <Paper elevation={4} className={classes.paper} >
                            <Form>
                                <h1 className="text-center mb-4">Add Product</h1>
                                <Form.Row>
                                    <Form.Group controlId="formBasicPassword" as={Col} md="6">
                                        <TextField type="email" label="Enter Product Name" variant="outlined" fullWidth={true} value={productName} onChange={(e) => setProductName(e.target.value)} />
                                        <Form.Text className="text-danger">
                                            {
                                                Message.productName ? Message.productName : null
                                            }
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword" as={Col} md="6">
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment position="start">&#8377;</InputAdornment>}
                                                labelWidth={60}
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </FormControl>
                                        <Form.Text className="text-danger">
                                            {
                                                Message.price ? Message.price : null
                                            }
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1" as={Col} md="12">
                                        <TextField
                                            label="Description"
                                            multiline
                                            rows={6}
                                            fullWidth={true}
                                            variant="outlined"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <Form.Text className="text-danger">
                                            {
                                                Message.description ? Message.description : null
                                            }
                                        </Form.Text>
                                    </Form.Group>
                                </Form.Row>

                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<ImageIcon />}
                                >
                                    Upload Img
                                    <input
                                        type="file"
                                        className="ml-3"
                                        style={{ outline: "none", width: "90px" }}
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />

                                </Button>
                                <Form.Text className="text-danger">
                                    {
                                        Message.file_path ? Message.file_path : null
                                    }
                                </Form.Text>
                                <br />
                                <Button variant="contained" startIcon={<AddCircleIcon />} color="primary" size="large" onClick={AddProduct}>
                                    Add
                             </Button>
                            </Form>
                        </Paper>
                    </div>
                </Row>
            </Container>

        </>
    )
}

export default AddProduct
