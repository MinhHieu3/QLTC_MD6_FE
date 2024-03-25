import "./Accounts.css"
import {useEffect, useState} from "react";
import {Formik, Form, Field} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {editUsers, findById} from "../../service/user/userService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";

export default function Account() {
    const [showUpdateInfo, setShowUpdateInfo] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [showUpdateTable, setShowUpdateTable] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [uploadProgress, setUploadProgress] = useState(0);
    let [imageURL, setImageURL] = useState('');
    const users = useSelector(state => state.users.users);
    const user = useSelector(state => state.users.usersById);
    const userId = user.id;
    const imagDefault = user.avatar;
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
        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setImageURL(url)
            });
        });
    };
    const [oldUserData, setOldUserData] = useState();
    const handleUpdateInfoClick = () => {
        setShowUpdateInfo(true);
        setShowUpdatePassword(false);
        setShowUpdateTable(true);
    };

    const handleUpdatePasswordClick = () => {
        setShowUpdateInfo(false);
        setShowUpdatePassword(true);
        setShowUpdateTable(true);
    };


    useEffect(() => {
        dispatch(findById(users.id)).then(() => {
            setOldUserData({
                name: user.name, phone: user.phone, password: user.password
            })

        })
    }, [])


    const handleSubmit = async (values, actions) => {
        values.username = user.username;
        values.password = user.password;
        values.confirmPassword = user.confirmPassword
        if (imageURL === '') {
            values.avatar = imagDefault;
        } else {
            values.avatar = imageURL;
        }
        try {
            dispatch(editUsers({id: userId, data: values})).then(()=> {
                setOldUserData({
                    name: user.name, phone: user.phone, password: user.password
                })
            })
            setShowUpdateTable(false)
        } catch (error) {
            await dispatch(editUsers({id: userId, data: {...values, avatar: user.avatar}}));
            console.log("User updated successfully:", values);
            await dispatch(editUsers({id: userId, data: values}));
        }
    };

    return (<>
        <div className="flex-container-account border-wallets">
            <div className="title-account">
                <div className="title-account-center">My Account</div>
                <div className="close-title-account">
                    <Link to="/home">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <hr className="hr"/>
            <div>
                <div className="main-account-top1">
                    <div className="child-div">
                        <img className="img-profile-account"
                             src={user.avatar}
                             alt={''}
                        />
                    </div>
                    <div className="child-div profile-account-center" style={{minWidth: 250}}>
                        <div>Username: {users.username}</div>
                        <div className="text-devices">Name: {user.name}</div>
                        <div className="text-devices">Phone: {user.phone}</div>
                    </div>
                    <div className="dropdown">
                        <div className="dropbtn"> Update</div>
                        <div className="dropdown-content">
                            <div onClick={handleUpdateInfoClick}> Info</div>
                            <div onClick={handleUpdatePasswordClick}> Pass</div>
                        </div>
                    </div>
                    <Formik
                        initialValues={oldUserData}
                        onSubmit={(values) => {
                            handleSubmit(values)
                        }}
                        enableReinitialize={true}
                    >
                        <Form>
                            {showUpdateTable && (<div>
                                {showUpdateInfo && (<div className={"border-wallets update-profile-table"}>
                                    <div className="form-group-edit-account close-show-if" onClick={() => {
                                        setShowUpdateInfo(false)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path
                                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                        </svg>
                                    </div>
                                    <div className="form-group-edit-account">
                                        <label htmlFor="avatarInput">Avatar:</label>
                                        <img src={imageURL !== '' ? imageURL : imagDefault} alt="Avatar"
                                             className="img-edit-account"/>
                                        <Field type="file" name="avatar" className="form-control-file"
                                               onChange={getImageData}/>
                                    </div>
                                    <div className="form-group-edit-account">
                                        <label htmlFor="name">Name:</label>
                                        <Field type="text" id="name" name="name" className="form-control"
                                               placeholder="Enter name"/>
                                    </div>
                                    <div className="form-group-edit-account">
                                        <label htmlFor="phone">Phone:</label>
                                        <Field type="text" id="phone" name="phone" className="form-control"
                                               placeholder="Enter phone"/>
                                    </div>
                                    <div className={"close-update-account"}>
                                        <button type="submit" className="btn btn-secondary ">Submit</button>
                                    </div>
                                </div>)}
                                {showUpdatePassword && (<div className={"border-wallets update-profile-table"}>
                                        <div className="form-group-edit-account close-show-if" onClick={() => {
                                            setShowUpdatePassword(false)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor"
                                                 className="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path
                                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                            </svg>
                                        </div>
                                        <div className="form-group-edit-account">
                                            <label htmlFor="password">Password:</label>
                                            <Field type="password" id="password" name="password"
                                                   className="form-control"
                                                   placeholder="Enter password"/>
                                        </div>
                                        <div className="form-group-edit-account">
                                            <label htmlFor="password">Password:</label>
                                            <Field type="password" id="password" name="password"
                                                   className="form-control"
                                                   placeholder="Enter password"/>
                                        </div>
                                        <div className="form-group-edit-account">
                                            <label htmlFor="password">Password:</label>
                                            <Field type="password" id="password" name="password"
                                                   className="form-control"
                                                   placeholder="Enter password"/>
                                        </div>
                                        <div className={"close-update-account"}>
                                            <button type="submit" className="btn btn-secondary">Submit</button>
                                        </div>
                                    </div>

                                )}
                            </div>)}
                        </Form>
                    </Formik>
                </div>
                <div className={"main-account-top3"}>
                    <div className={"list-devices"}>Devices (1/5)</div>
                    <div style={{display: "flex"}}>
                        <div className="icon-container">
                            <div className="icon"></div>
                        </div>
                        <div>
                            <div>Web Browser</div>
                            <div className={"text-devices"}>This device</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"btn-account"}>
                <a href="/login">
                    <button className={"btn btn-secondary sing-out-account-btn"}>Sign out</button>
                </a>
                <button className={"btn btn-danger"} style={{height:40, marginTop:9}}>Delete</button>
            </div>
        </div>
    </>)
}
