import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {deleteWallet, findByIdWallet} from "../../../service/wallet/walletService";
import "./ListWallet.css";
import axios from "axios";
import {Form, Formik} from "formik";
import CustomToast from "../../toas/CustomToast";

export default function ListWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wallets = useSelector(state => state.wallets.wallets);
    const walletById = useSelector(state => state.wallets.findByIdWallet);
    const [showToast, setShowToast] = useState(false);
    const [showToastDel, setShowToastDel] = useState(false);
    const [showToastFail, setShowToastFail] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedFruit, setSelectedFruit] = useState(wallets.length > 0 ? wallets[0].id : '');
    const [isShow, setIsShow] = useState(false);
    const [selectedWalletIndex, setSelectedWalletIndex] = useState(null);
    let wallet = wallets[selectedWalletIndex];
    console.log(walletById)
    const handleSelectChange = async (e) => {
        const selectedValue = e.target.value;
        await dispatch(findByIdWallet(selectedValue));
        setSelectedFruit(selectedValue);
    };
    const handlePayMoney = async () => {
        let money = document.getElementById("money").value;
        let restMoney = wallet.money - parseInt(money);
        let newMoney = walletById.money + parseInt(money);
        if (selectedWalletIndex !== null && walletById !==[]) {
            console.log(restMoney)
            console.log(newMoney)
            if (wallet) {

                try {
                    await axios.put(`http://localhost:8080/users/wallets?walletId=${wallet.id}&newMoneyValue=${restMoney}`);
                    await axios.put(`http://localhost:8080/users/wallets?walletId=${selectedFruit}&newMoneyValue=${newMoney}`);
                    setShowToast(true);
                    setShowPayment(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } catch (error) {
                    console.error('Lỗi khi chuyển tiền:', error);
                    setShowToastFail(true);
                }
            } else {
                setShowToastFail(true);
            }
        }
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
    };

    const handleDeleteWallet = (id) => {
        dispatch(deleteWallet(id))
            .then(() => {
                setShowToastDel(true);
            })
    };

    const handlePaymentButtonClick = (index) => {
        if (selectedWalletIndex === index) {
            setShowPayment(!showPayment);
        } else {
            setSelectedWalletIndex(index);
            setShowPayment(true);
        }
    };
    return (
        <>{showToast && <CustomToast message="Successful money transfer!"/>}
            {showToastDel && <CustomToast message="Deleted successfully!!"/>}
            {showToastFail && <CustomToast message="money transfer failed"/>}
            <div className="flex-container-account-wallet">
                <div className={"title-nav-wallet"}>
                    <div className={"title-nav-center"}>My Wallets</div>
                    <div className="clone-myWallet" onClick={() => {
                        navigate("/home")
                    }}>X
                    </div>
                </div>
                <div className="profile-myWallet">
                    {wallets.map((currentWallet, index) => (
                        <>
                            <hr/>
                            <div className="main-myWallet-top1">
                                <div className="img-myWallet">
                                    <img className="img-profile-account"
                                         src={currentWallet.avatar}
                                         alt=""
                                    />
                                </div>
                                <div className="profile-myWallet-center">
                                    <div>Name: {currentWallet.name}</div>
                                    <div>Money: {formatMoney(currentWallet.money)}</div>
                                    <div>Description: {currentWallet.description}</div>
                                </div>
                                <div className="btn-myWallet">
                                    <Link to={`/home/edit-wallets/${currentWallet.id}`}>Edit</Link>
                                </div>
                                <div className="btn-myWallet pay"
                                     onClick={() => handlePaymentButtonClick(index)}>Payment
                                </div>
                                <div className="btn-myWallet del"
                                     onClick={() => handleDeleteWallet(currentWallet.id)}>Del
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            {showPayment && (
                <div className={"border-payment"}>
                    <Formik initialValues={{}} onSubmit={(values) => {
                        handlePayMoney()
                    }}>
                        <Form>
                            <div>
                                <div className={"close-payment show-form-payment"} onClick={() => {
                                    setShowPayment(false);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path
                                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                    </svg>
                                </div>
                                <h3 style={{textAlign: "center"}}>
                                    <svg style={{marginRight: 10}} xmlns="http://www.w3.org/2000/svg" width="30"
                                         height="30"
                                         fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                                        <path
                                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                    </svg>
                                    Payment
                                </h3>

                            </div>
                            <hr/>
                            <div>
                                <div className="mb-3">
                                    <h6>Source account</h6>
                                    <div style={{display: "flex"}}>
                                        <div style={{marginLeft: 10, marginTop: 8}}><img
                                            style={{borderRadius: 50, height: 40, width: 40, marginRight: 10}}
                                            src={wallet.avatar}
                                            alt=""/>
                                        </div>
                                        <div className={"input-hidden"} style={{margin: "auto"}}>
                                            <div style={{fontSize: 19}}>{wallet.name}</div>
                                            <div style={{fontSize: 16}}>{formatMoney(wallet.money)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating">
                                <input type="number" className="form-control" id="money"
                                       placeholder="transferred"/>
                            </div>
                            <div className={`outer ${isShow ? 'show' : ''}`}>
                                <div className="mb-3">
                                    <h6 style={{marginTop: 10}}>Enjoyment account</h6>
                                    <select className="form-control" id="formGroupExampleInput" value={selectedFruit}
                                            onChange={handleSelectChange}>
                                        {wallets.map((wallet, index) => (
                                            <option key={wallet.id} value={wallet.id}>
                                                {wallet.name} - {wallet.money && formatMoney(wallet.money)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-floating">
                    <textarea className="form-control textarea-height" placeholder="Money transfer content"
                              id="floatingTextarea"></textarea>
                            </div>
                            <hr/>
                            <div style={{
                                width: "auto", display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <button type="submit" className="btn btn-secondary">Send
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>

            )}
        </>
    );
}
