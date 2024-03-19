import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import "./AddWallet.css"

export default function AddWallet() {
    const initialValues = {
        avatar: '',
        description: '',
        money: '',
        name: ''
    };
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        description: Yup.string().required('Description is required'),
        money: Yup.number().required('Money is required'),
        name: Yup.string().required('Name is required')
    });

    const onSubmit = async (values, actions) => {
        navigate("/home")
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className={"custom-form"}>
                            <div className="form-group">
                                <label htmlFor="avatarInput">Avatar</label>
                                <Field type="file" name="avatar" className="form-control-file" id="avatarInput"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="descriptionInput">Description</label>
                                <Field type="text" name="description" className="form-control" id="descriptionInput"/>
                                <ErrorMessage name="description" component="div" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="moneyInput">Money</label>
                                <Field type="number" name="money" className="form-control" id="moneyInput"/>
                                <ErrorMessage name="money" component="div" className="text-danger"/>
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Wallet type
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button className="dropdown-item" type="button">Basic wallet</button>
                                    <button className="dropdown-item" type="button">Linked wallet</button>
                                    <button className="dropdown-item" type="button">Credit Wallet</button>
                                    <button className="dropdown-item" type="button">Savings wallet</button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>Submit</button>
                            <button type="submit" className="btn btn-secorry" style={{marginTop:"20px"}}><Link to={"/home"}>Back</Link></button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}