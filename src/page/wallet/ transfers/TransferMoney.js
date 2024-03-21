import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import CustomToast from "../../toas/CustomToast";
import { useEffect, useState } from "react";
import 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { transferMoney } from "../../../service/wallet/walletService";


export default function TransferMoney() {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    let [imageURL, setImageURL] = useState('');
    const imagDefault='https://firebasestorage.googleapis.com/v0/b/case-md6-68a8f.appspot.com/o/images%2F5987z5246087815947_fa57ab69e4a1ba4aeff67ee738276e49.jpg?alt=media&token=a7689751-f68f-4e72-a862-fc54ce7647c4'
    const navigate = useNavigate();
    const firebaseConfig = {
        // Your Firebase config here
    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const getImageData = (e) => {
        // Your code to upload image here
    };
    const validationSchema = Yup.object().shape({
        senderId: Yup.string().required('Sender ID is required'),
        receiverId: Yup.string().required('Receiver ID is required'),
        amount: Yup.string().matches(/^\d+(\.\d{1,2})?$/, 'Amount must be a valid number').required('Amount is required')
    });
    const handleTransferMoney = async (values) => {
        try {
            await dispatch(transferMoney(values));
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            setErrorMessage('Error transferring money');
            setShowToast(true);
        }
    }
    return (
        <>
            {showToast && <CustomToast message={errorMessage}/>}
            <div className="container-create">
                <div className="nav-top-content">
                    <div className="title-name">Transfer Money</div>
                    <Link to={'/home'} className="close">X</Link>
                </div>

                <Formik
                    initialValues={{
                        senderId: '',
                        receiverId: '',
                        amount: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleTransferMoney}
                >
                    <Form className="justify-content-center">
                        <div className="form-group">
                            <div className="form-input-create">
                                <div className="input-create">
                                    <label>Sender ID : </label>
                                    <Field className="input-text" type={"text"} name={'senderId'}/>
                                    <ErrorMessage name="senderId" component="div" className="error-message"/>
                                </div>
                                <div className="input-create">
                                    <label>Receiver ID :</label>
                                    <Field className="input-text" type={"text"} name={'receiverId'}/>
                                    <ErrorMessage name="receiverId" component="div" className="error-message"/>
                                </div>
                                <div className="input-create">
                                    <label>Amount :</label>
                                    <Field className="input-text" type={"text"} name={'amount'}/>
                                    <ErrorMessage name="amount" component="div" className="error-message"/>
                                </div>
                            </div>
                        </div>
                        <div className="btn-submit-create">
                            <button type="submit">Transfer Money</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}
