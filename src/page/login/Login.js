import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../service/user/userService";
import CustomToast from "../toas/CustomToast";
import {getWallets} from "../../service/wallet/walletService";


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showToastFail, setShowToastFail] = useState(false);
    useEffect(() => {
        localStorage.removeItem('loginError');
    }, []);

    const handleLogin = async (values) => {
        try {
            await dispatch(getUsers(values)); // Dispatch getUsers action
            const error = localStorage.getItem('loginError');
            if (error !== null) {
                setShowToast(false);
                setShowToastFail(true);
                localStorage.removeItem('loginError');
            } else {

                setShowToastFail(false);
                setShowToast(true);
                setTimeout(() => {
                    navigate('/home');

                }, 2000)

            }
        } catch (error) {
            setShowToast(false);
            setShowToastFail(true);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (<>
            {showToast && <CustomToast message="Login done!"/>}
            {showToastFail && <CustomToast message="Login no!"/>}
            <div className="form">
                <div className="form-title-text">
                    <span>Login</span>
                </div>
                <div className="wrap-form-body">
                    <div className="social">
                        <div className="social-description">
                            <span>Using social networking accounts</span>
                        </div>
                        <div className="social-items">
                            <button>
                                <span className={"v-btn__content"}>
                                <svg data-v-8cacc26a="" id="Group_818" data-name="Group 818"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     className="social-item-icon"><g id="Group_862" data-name="Group 862"><rect
                                    id="Rectangle_326" data-name="Rectangle 326" width="24" height="24"
                                    fill="none"></rect><path id="Path_3814" data-name="Path 3814"
                                                             d="M261.529,3012.3a5.143,5.143,0,0,1,3.551,1.34l2.592-2.481a8.919,8.919,0,0,0-6.143-2.339,9.2,9.2,0,0,0-8.2,4.959l2.969,2.26a5.54,5.54,0,0,1,5.231-3.739"
                                                             transform="translate(-249.345 -3005.818)" fill="#ff3e3e"
                                                             fill-rule="evenodd"></path><path id="Path_3815"
                                                                                              data-name="Path 3815"
                                                                                              d="M270.345,3018.018a7.545,7.545,0,0,0-.194-1.84h-8.622v3.34h5.061a4.388,4.388,0,0,1-1.878,2.92l2.9,2.2a8.712,8.712,0,0,0,2.733-6.62"
                                                                                              transform="translate(-249.345 -3005.818)"
                                                                                              fill="#3b8aff"
                                                                                              fill-rule="evenodd"></path><path
                                    id="Path_3816" data-name="Path 3816"
                                    d="M256.3,3019.6a5.423,5.423,0,0,1-.306-1.78,5.712,5.712,0,0,1,.3-1.781l-2.969-2.259a8.817,8.817,0,0,0,0,8.08Z"
                                    transform="translate(-249.345 -3005.818)" fill="#ffce12" fill-rule="evenodd"></path><path
                                    id="Path_3817" data-name="Path 3817"
                                    d="M261.529,3026.818a8.858,8.858,0,0,0,6.081-2.18l-2.9-2.2a5.677,5.677,0,0,1-8.408-2.84l-2.969,2.26a9.182,9.182,0,0,0,8.2,4.96"
                                    transform="translate(-249.345 -3005.818)" fill="#27b648" fill-rule="evenodd"></path></g></svg>
                            </span>
                                <span className={"social-item-name"}>Connect with Google</span></button>
                            <button>
                                <span className={"v-btn__content"}><svg data-v-edfbec8c="" id="Group_817"
                                                                        data-name="Group 817"
                                                                        xmlns="http://www.w3.org/2000/svg" width="24"
                                                                        height="24" viewBox="0 0 24 24"
                                                                        className="social-item-icon"><g id="Group_816"
                                                                                                        data-name="Group 816"><g
                                    id="Group_786" data-name="Group 786" transform="translate(2.728 2.881)"><path
                                    id="Exclusion_1" data-name="Exclusion 1"
                                    d="M5776.945-352.489h-2.015a6.422,6.422,0,0,1-3.4-.59,3.99,3.99,0,0,1-1.669-1.667,6.448,6.448,0,0,1-.589-3.4v-7.075a6.44,6.44,0,0,1,.589-3.4,4.014,4.014,0,0,1,1.669-1.669,6.441,6.441,0,0,1,3.4-.588H5782a6.438,6.438,0,0,1,3.4.588,4.015,4.015,0,0,1,1.669,1.669,6.425,6.425,0,0,1,.59,3.4v7.075a6.433,6.433,0,0,1-.59,3.4,3.991,3.991,0,0,1-1.669,1.667,6.419,6.419,0,0,1-3.4.59h-2.144v-6.626h2.179l.407-2.689h-2.584V-363.6a1.4,1.4,0,0,1,1.4-1.4h1.28v-2.282a12.034,12.034,0,0,0-1.975-.194c-.2,0-.391.009-.56.025a3.223,3.223,0,0,0-2.9,2.346,5.7,5.7,0,0,0-.135,1.5c.016.43.007,1.383,0,1.773v.021H5774.6v2.689h2.341v6.626Z"
                                    transform="translate(-5769.272 370.881)" fill="#1877f2" stroke="rgba(0,0,0,0)"
                                    stroke-miterlimit="10" stroke-width="1"></path></g><rect id="Rectangle_308"
                                                                                             data-name="Rectangle 308"
                                                                                             width="24" height="24"
                                                                                             fill="none"></rect></g></svg></span>
                                <span>Connect with Facebook</span>
                            </button>
                        </div>
                    </div>
                    <div className="ml-hr">
                        <hr/>
                    </div>
                    <Formik initialValues={{
                        username: '', password: '',
                    }} onSubmit={(values) => {
                        handleLogin(values).then()
                    }}>
                        <Form>
                            <div className="ml-network">
                                <div className="using-ml-account-text">
                                    <span>Using Money Lover account</span>
                                </div>
                                <div className="form-input">
                                    <Field className={'input'} type={'text'} name={'username'} placeholder={" Email"}/>
                                    <div style={{position: 'relative'}}> {}
                                        <Field className={'input'} type={showPassword ? 'text' : 'password'}
                                               name={'password'} placeholder={" Password"}/>
                                        <span
                                            className="eye-icon"
                                            style={{
                                                position: 'absolute',
                                                top: '35%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={togglePasswordVisibility}
                                        >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
                                    </div>
                                    <Link to={"/edi"}>Forgot Password</Link>
                                    <button className={'btn-form'} type={'submit'}>Login</button>
                                    <p> Don’t have an account? <Link to={'register'}>Register</Link></p>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>

    )
}