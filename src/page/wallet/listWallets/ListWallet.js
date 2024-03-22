import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {deleteWallet} from "../../../service/wallet/walletService";
import "./ListWallet.css";

export default function ListWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wallets = useSelector(state => state.wallets.wallets);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [selectedFruit, setSelectedFruit] = useState('Select any fruit');
    const [isShow, setIsShow] = useState(false);
    const [selectedWalletIndex, setSelectedWalletIndex] = useState(null);
    let wallet = wallets[selectedWalletIndex];
    const handleSelectChange = (e) => {

        setSelectedFruit(e.target.value);
    };
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
    };

    const handleDeleteWallet = (id) => {
        dispatch(deleteWallet(id))
            .then(() => {
                setShowToast(true);
            })
            .catch((error) => {
                setErrorMessage('Error deleting wallet');
                setShowToast(true);
            });
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
        <>
            <div className="flex-container-account-wallet">
                <div className={"title-nav-wallet"}>
                    <div className={"title-nav-center"}>My Wallets</div>
                    <div className="clone-myWallet" onClick={() => {
                        navigate("/home")
                    }}>X
                    </div>
                </div>
                <div className="profile-myWallet">
                    {wallets.map((wallet,index) => (
                        <>
                            <hr/>
                            <div className="main-myWallet-top1">
                                <div className="img-myWallet">
                                    <img className="img-profile-account"
                                         src={wallet.avatar}
                                         alt=""
                                    />
                                </div>
                                <div className="profile-myWallet-center">
                                    <div>Name: {wallet.name}</div>
                                    <div>Money: {formatMoney(wallet.money)}</div>
                                    <div>Description: {wallet.description}</div>
                                </div>
                                <div className="btn-myWallet">
                                    <Link to={`/home/edit-wallets/${wallet.id}`}>Edit</Link>
                                </div>
                                <div className="btn-myWallet pay" onClick={() => handlePaymentButtonClick(index)}>Payment</div>
                                <div className="btn-myWallet">
                                    <Link to={`/home/edit-wallets/${wallet.id}`}>Del</Link>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            {showPayment && (
                <div className={"border-payment"}>
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
                            <svg style={{marginRight: 10}} xmlns="http://www.w3.org/2000/svg" width="30" height="30"
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
                                    style={{borderRadius:50,height: 40, width: 40, marginRight: 10}}
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
                        <input type="number" className="form-control" id="floatingPassword"
                               placeholder="transferred"/>
                    </div>
                    <div className={`outer ${isShow ? 'show' : ''}`}>
                        <div className="mb-3">
                            <h6 style={{marginTop: 10}}>Enjoyment account</h6>
                            <select className="form-control" id="formGroupExampleInput" value={selectedFruit}
                                    onChange={handleSelectChange}>
                                {wallets.map((wallet, index) => (
                                    <option key={wallet.id} value={index}>
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
                        <button type="button" className="btn btn-secondary">Send
                        </button>
                    </div>
                </div>

            )}
        </>
    );
}
