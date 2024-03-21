import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./AddWallet.css";
import CustomToast from "../../toas/CustomToast";
import { useEffect, useState } from "react";
import 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { addWallet } from "../../../service/wallet/walletService";


export default function AddWallet() {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    let [imageURL, setImageURL] = useState('');
    const imagDefault='https://firebasestorage.googleapis.com/v0/b/case-md6-68a8f.appspot.com/o/images%2F5987z5246087815947_fa57ab69e4a1ba4aeff67ee738276e49.jpg?alt=media&token=a7689751-f68f-4e72-a862-fc54ce7647c4'
    const navigate = useNavigate();
    const firebaseConfig = {
        apiKey: "AIzaSyDi3k1wLzdUDz_UPUeuKatQBGvdcuMjPrQ",
        authDomain: "case-md6-68a8f.firebaseapp.com",
        projectId: "case-md6-68a8f",
        storageBucket: "case-md6-68a8f.appspot.com",
        messagingSenderId: "175511547154",
        appId: "1:175511547154:web:57ebb36215dfe8983357cb",
        measurementId: "G-PM3PDD7DJT"
    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const getImageData = (e) => {
        const file = e.target.files[0];
        const fileName = Math.round(Math.random() * 9999) + file.name;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImageURL(url)
                });
            }
        );
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().matches(/^[\p{L}\s]+$/u, 'Name should only contain letters and spaces').required('Name is required'),
        money: Yup.string().matches(/^\d{1,3}(,\d{3})*$/, 'Money format should be like 10,000').required('Money is required'),
        description: Yup.string().max(200, 'Description must be at most 200 characters').required('Description is required')
    });
    const handleCreateWallet = async (values) => {
        let moneyValue = values.money.replace(/\D/g, '');
        moneyValue = parseFloat(moneyValue);

        if (isNaN(moneyValue)) {
            setErrorMessage('Invalid money format');
            setShowToast(true);
            return;
        }
        values.money = moneyValue;
        if (imageURL === '') {
            values.avatar = imagDefault;
        } else {
            values.avatar = imageURL;
        }
        try {
            await dispatch(addWallet(values));
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            setErrorMessage('Error adding wallet');
            setShowToast(true);
        }
    }
    return (
        <>
            {showToast && <CustomToast message={errorMessage}/>}
            <div className="container-create">
                <div className="nav-top-content">
                    <div className="title-name">Create Wallet</div>
                    <Link to={'/home'} className="close">X</Link>
                </div>

                <Formik
                    initialValues={{
                        description: '',
                        name: '',
                        user: {
                            id: users.id
                        }
                    }
                    }
                    validationSchema={validationSchema}
                    onSubmit={
                        (values) => {
                            handleCreateWallet(values).then()
                        }
                    }
                >
                    <Form className="justify-content-center">
                        <div className="form-group">
                            <div className="form-input-create">
                                <div className="input-create">
                                    <label>Name : </label>
                                    <Field className="input-text" type={"text"} name={'name'}/>
                                    <ErrorMessage name="name" component="div" className="error-message"/>
                                </div>
                                <div className="input-create">
                                    <label>Money :</label>
                                    <Field className="input-text" type={"text"} name={'money'}/>
                                    <ErrorMessage name="money" component="div" className="error-message"/>
                                </div>
                                <div className="input-create">
                                    <label>Description :</label>
                                    <Field className="input-textarea" as="textarea" name={'description'}/>
                                    <ErrorMessage name="description" component="div" className="error-message"/>
                                </div>
                            </div>
                            <div className="form-input-avatar">

                                <div className="show-avatar-wallet">
                                    <img
                                        src={imageURL !== '' ? imageURL : imagDefault}
                                        alt=""/>
                                </div>

                                <div className="input-image">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="avatar-input"
                                        onChange={getImageData}
                                    />
                                    {uploadProgress > 0 && uploadProgress < 100 && (
                                        <div className="upload-progress">
                                            {uploadProgress}%
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="btn-submit-create">
                            <button type="submit">Submit</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
        ;
}
