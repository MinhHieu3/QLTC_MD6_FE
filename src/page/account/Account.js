import "./Accounts.css"
import {useEffect, useState} from "react";
import {Formik, Form, Field} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {findById} from "../../service/user/userService";
import {useNavigate} from "react-router-dom";

export default function Account() {
    const [showUpdateTable, setShowUpdateTable] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateClick = () => {
        setShowUpdateTable(true);
    };
    const users = useSelector(state => {
        return state.users.users
    })

    const user = useSelector(state => {
        console.log("user",state.users.usersById)
        return state.users.usersById
    })
    useEffect(()=> {
        dispatch(findById(users.id))
    },[])

    const oldUserData = {
        avatar: user.avatar,
        name: user.name,
        phone: user.phone
    };
    const handleSubmit=(values)=>{

    }
    return (
        <>
            <div className="flex-container-account border-wallets">
                <div style={{color: "black"}}>
                    <div className={"title-account"}>
                        <div className={"title-account-center"}>My Account</div>
                        <div className={"close-title-account"}>
                            <a href="/home" style={{color: "black"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <hr/>
                </div>
                <div>
                    <div className="main-account-top1">
                        <div className="child-div">
                            <img className="img-profile-account"
                                 src="https://th.bing.com/th/id/R.c11b6f38dffc24a4508217513b0e50bd?rik=Pt%2bkITlukiMkWg&riu=http%3a%2f%2fwww.emmegi.co.uk%2fwp-content%2fuploads%2f2019%2f01%2fUser-Icon.jpg&ehk=zjS04fF4nxx%2bpkvRPsSezyic3Z7Yfu%2fuoT75KnbNv1Y%3d&risl=&pid=ImgRaw&r=0"
                                 alt=""
                            />
                        </div>
                        <div className="child-div profile-account-center" style={{minWidth:250}}>
                            <div>Username: {users.username}</div>
                            <div className="text-devices">Name: {user.name}</div>
                            <div className="text-devices">Phone: {user.phone}</div>
                        </div>
                        <div className="child-div profile-account-center">
                            <button className="btn btn-secondary" onClick={handleUpdateClick}>Update</button>
                        </div>
                        <Formik
                            initialValues={oldUserData}
                            onSubmit={(values)=>{
                                handleSubmit(values)
                            }}
                            enableReinitialize={true}
                        >
                            <Form>
                                {showUpdateTable && (
                                    <div>
                                        <div className={"border-wallets update-profile-table"}>
                                            <div className="form-group">
                                                <label htmlFor="avatarInput">Avatar</label>
                                                <Field type="file" name="avatar" className="form-control-file" id="avatarInput"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <Field type="text" id="name" name="name" className="form-control" placeholder="Enter name"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone</label>
                                                <Field type="number" id="phone" name="phone" className="form-control" placeholder="Enter phone"/>
                                            </div>
                                            <button type="submit" className="btn btn-secondary">Submit</button>
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
                <div style={{marginLeft: "auto", marginTop: "auto"}}>
                    <a href="/login">
                        <button className={"btn btn-secondary sing-out-account-btn"}>Sign out</button>
                    </a>
                    <button className={"btn btn-danger"}>Delete Account</button>
                </div>
            </div>
        </>
    )
}