import "./Accounts.css"
import {useEffect, useState} from "react";
import {Formik, Form, Field} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {findById} from "../../service/user/userService";
import {Link, useNavigate} from "react-router-dom";

export default function Account() {
    const [showUpdateTable, setShowUpdateTable] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateClick = () => {
        setShowUpdateTable(!showUpdateTable);
    };
    const users = useSelector(state => {
        return state.users.users
    })

    const user = useSelector(state => {
        console.log("user", state.users.usersById)
        return state.users.usersById
    })

    useEffect(() => {
        dispatch(findById(users.id))
    }, [])
    const oldUserData = {
        // avatar: user.avatar,
        name: user.name,
        phone: user.phone,
        password:users.password
    };
    const handleSubmit = (values) => {

    }
    return (
        <>
            <div className="flex-container-account border-wallets">
                <div className="title-account">
                    <div className="title-account-center">My Account</div>
                    <div className="close-title-account">
                        <Link to="/home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path
                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <hr className="hr" />
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
                        <div className="child-div profile-account-center">
                            <button className="btn btn-secondary" onClick={handleUpdateClick}>Update</button>
                        </div>
                        <Formik
                            initialValues={oldUserData}
                            onSubmit={(values) => {
                                handleSubmit(values)
                            }}
                            enableReinitialize={true}
                        >
                            <Form>
                                {showUpdateTable && (
                                    <div>
                                        <div className={"border-wallets update-profile-table"}>
                                            <div className="form-group-edit-account">
                                                <label htmlFor="avatarInput">Avatar:</label>
                                                <img src={user.avatar} alt="Avatar" className="img-edit-account" />
                                                <Field type="file" name="avatar" className="form-control-file"
                                                       id="avatarInput"/>
                                            </div>
                                            <div className="form-group-edit-account">
                                                <label htmlFor="name">Name:</label>
                                                <Field type="text" id="name" name="name" className="form-control"
                                                       placeholder="Enter name"/>
                                            </div>
                                            <div className="form-group-edit-account">
                                                <label htmlFor="phone">Phone:</label>
                                                <Field type="number" id="phone" name="phone" className="form-control"
                                                       placeholder="Enter phone"/>
                                            </div>
                                            <div className={"close-update-account"}>
                                                <button type="submit" className="btn btn-secondary ">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
                    <button className={"btn btn-danger"}>Delete</button>
                </div>
            </div>
        </>
    )
}