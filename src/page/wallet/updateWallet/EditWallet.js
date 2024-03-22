import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import * as Yup from "yup";
import {editWallet} from "../../../service/wallet/walletService";
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function EditWallet() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wallets = useSelector(state => state.wallets.wallets);
    const wallet = wallets.find(wallet => wallet.id === parseInt(id));
    const [imageURL, setImageURL] = useState(wallet?.avatar || '');


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
            await dispatch(editWallet({ id, data: { ...values, avatar: imageURL } }));
            console.log("Wallet updated successfully:", values);
            await dispatch(editWallet({id, data: values}));
            navigate("/home");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImageUrl = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container edit-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Formik
                        initialValues={wallet}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({isSubmitting}) => (
                            <Form className={"custom-form"}>
                                <div className="div-button-back">
                                    <div className="div-btn-err"></div>
                                    <div className="div-btn-back">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                        </svg>
                                    </div>

                            </div>
                                <div className="form-group">
                                    <label htmlFor="avatarInput">Avatar</label>
                                    {imageURL && (
                                        <img src={imageURL} alt="Avatar Preview" />
                                    )}
                                </div>

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
