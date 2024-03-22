import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {deleteWallet} from "../../../service/wallet/walletService";
import "./ListWallet.css";

export default function ListWallet() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const wallets = useSelector(state => state.wallets.wallets);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
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
    return (
        <>
            <div className="flex-container-account-wallet">
                <div className={"title-nav-wallet"}>
                    <div className={"title-nav-center"}>My Wallets</div>
                    <div className="clone-myWallet" onClick={()=>{
                        navigate("/home")
                    }}>X</div>
                </div>
                <div className="profile-myWallet">
                {wallets.map(wallet => (
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
                                <Link to={`/home/edit-wallets/${wallet.id}`}>Edit
                                </Link>
                            </div>
                            <div className="btn-myWallet">
                                <Link to={`/home/edit-wallets/${wallet.id}`}>Pay
                                </Link>
                            </div>
                            <div className="btn-myWallet">
                                <Link to={`/home/edit-wallets/${wallet.id}`}>Del
                                </Link>
                            </div>
                        </div>
                    </>

                ))}
                </div>
            </div>
        </>
    );
}
