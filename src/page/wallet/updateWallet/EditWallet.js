import React, {useEffect} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {editWallet, findByIdWallet} from "../../../service/wallet/walletService";
import "./EditWallet.css";

export default function EditWallet() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wallets = useSelector(state => {
        console.log(state.wallets.findByIdWallet)
        return state.wallets.findByIdWallet
    });
    useEffect(() => {
        dispatch(findByIdWallet(id));
    }, [dispatch, id]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().matches(/^[\p{L}\s]+$/u, 'Name should only contain letters and spaces').required('Name is required'),
        money: Yup.string().matches(/^\d{1,3}(,\d{3})*$/, 'Money format should be like 10,000').required('Money is required'),
        description: Yup.string().max(200, 'Description must be at most 200 characters').required('Description is required')
    });

    const handleSubmit = async (values, actions) => {
        try {
            await dispatch(editWallet({id, data: values}));
            navigate("/home");
        } catch (error) {
        }
    };

    return (
        <div className="container edit-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Formik
                        initialValues={
                            wallets
                        }
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({isSubmitting}) => (
                            <Form className={"custom-form"}>
                                <div className="form-group">
                                    <label htmlFor="descriptionInput">Description </label>
                                    <Field
                                        type="text"
                                        name="description"
                                        className="form-control"
                                        id="descriptionInput"
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="moneyInput">Money</label>
                                    <Field
                                        type="number"
                                        name="money"
                                        className="form-control"
                                        id="moneyInput"
                                    />
                                    <ErrorMessage
                                        name="money"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nameInput">Name</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="nameInput"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{marginTop: "20px"}}
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    style={{marginTop: "20px"}}
                                >
                                    <Link to={"/home"}>Back</Link>
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
