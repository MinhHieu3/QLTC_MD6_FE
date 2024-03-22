import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {deleteWallet} from "../../../service/wallet/walletService";

export default function ListWallet() {
    const dispatch = useDispatch();
    const wallets = useSelector(state => state.wallets.wallets);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
            <div className="flex-container-account border-wallets">
                <div style={{ color: "black" }}>
                    <div className={"title-account"}>
                        <div className={"title-account-center"}>My Wallets</div>
                        <div className={"close-title-account"}>
                            <Link to="/home" style={{ color: "black" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <hr />
                </div>
                {wallets.map(wallet => (
                    <div key={wallet.id}>
                        <div className="main-account-top1">
                            <div className="child-div">
                                <img className="img-profile-account"
                                     src={wallet.avatar}
                                     alt=""
                                />
                            </div>
                            <div className="child-div profile-account-center" style={{ minWidth: 250 }}>
                                <div>Name: {wallet.name}</div>
                                <div>Money: {wallet.money}</div>
                                <div>Description: {wallet.description}</div>
                            </div>
                            <div className="child-div profile-account-center">
                                <Link to={`/home/edit-wallets/${wallet.id}`}>
                                    <button className="btn btn-secondary">Edit</button>
                                </Link>
                                {/*<button className="btn btn-secondary">Transfer</button>*/}
                                <button className={'btn btn-danger'} onClick={() => handleDeleteWallet(wallet.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
