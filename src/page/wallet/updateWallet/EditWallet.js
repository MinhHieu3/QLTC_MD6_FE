import {Field, Form, Formik, ErrorMessage} from 'formik';
import * as Yup from "yup";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./EditWallet.css";
import CustomToast from "../../toas/CustomToast";
import {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";
import {editWallet} from "../../../service/wallet/walletService";

export default function EditWallet() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wallets = useSelector(state => state.wallets.wallets);
    const wallet = wallets.find(wallet => wallet.id === parseInt(id));
    const [imageURL, setImageURL] = useState(wallet?.avatar || '');
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
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validationSchema = Yup.object().shape({
        name: Yup.string().matches(/^[\p{L}\s]+$/u, 'Name should only contain letters and spaces').required('Name is required'),
        description: Yup.string().max(200, 'Description must be at most 200 characters').required('Description is required')
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const storageRef = ref(storage, `images/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.then(snapshot => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log("Upload is " + progress + "% done");
                }).catch(error => {
                    console.log(error);
                });

                uploadTask.then(snapshot => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        console.log("File available at", url);
                        setImageURL(url);
                    });
                }).catch(error => {
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }
        }
    };


    const handleSubmit = async (values, actions) => {
        try {
            await dispatch(editWallet({id, data: {...values, avatar: imageURL}}));
            console.log("Wallet updated successfully:", values);
            navigate("/home");
        } catch (error) {
            console.error("Error updating wallet:", error);
        }
    };

    return (
        <>
            {showToast && <CustomToast message={errorMessage}/>}
            <div className="container-edit container">
                <div className="row justify-content-center-edit">
                    <div className="col-md-6-edit">
                        <Formik
                            initialValues={wallet}
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({isSubmitting}) => (
                                <Form className={"custom-form-edit"}>
                                    <div className="div-button-back">
                                        <div className="div-btn-err">Edit Wallet</div>
                                        <div className="div-btn-back">
                                            <Link to="/home/profile-wallets" style={{color: "black"}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor"
                                                     className="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="form-group-edit">
                                        <label htmlFor="avatarInput">Avatar</label>
                                        <div className="input-image-edit">
                                            {imageURL && (
                                                <img src={imageURL} alt="Avatar Preview" style={{marginLeft: "35px"}}/>
                                            )}
                                            <input
                                                type="file"
                                                id="avatarInput"
                                                name="avatarInput"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                style={{paddingLeft:"34px",paddingTop:"10px"}}

                                            />

                                            {uploadProgress > 0 && uploadProgress < 100 && (
                                                <div className="upload-progress">
                                                    {uploadProgress}%
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group-edit">
                                        <label htmlFor="nameInput">Name</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            className="form-control-edit"
                                            id="nameInput"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-danger-edit"
                                        />
                                    </div>
                                    <div className="form-group-edit">
                                        <label htmlFor="moneyInput">Money</label>
                                        <Field
                                            type="text"
                                            name="money"
                                            className="form-control-edit"
                                            id="moneyInput"
                                        />
                                        <ErrorMessage
                                            name="money"
                                            component="div"
                                            className="text-danger-edit"
                                        />
                                    </div>
                                    <div className="form-group-edit">
                                        <label>Description :</label>
                                        <Field className="form-control-edit" as="textarea" name={'description'}/>
                                        <ErrorMessage name="description" component="div" className="text-danger"/>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary-edit"
                                        style={{marginTop: "20px", marginLeft: "240px", backgroundColor: "#A8A8A8"}}
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}
