import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./Wallet.css";
import {getDetails} from "../../service/detail/detailService";

export default function Wallet() {
    const dispatch=useDispatch();
    const wallets = useSelector(state => state.wallets.wallets);
    const detailWallets = useSelector(state => state.details.details);
    const selectedWalletIndex = useSelector(state => state.wallets.index);
    const wallet = wallets[selectedWalletIndex];
    const money = wallet ? wallet.money : 0;
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
    };
    const total = wallet ? (wallet.money || 0) : 0;

    console.log(detailWallets)
    return (
        <>
            <Link to={'add-wallets'} className={'nav-create-wallet'}>
                <div className="btn-show-form">
                    Add Transaction
                </div>
            </Link>
            <div className="container-wallet">
                <div className="nav-date">
                    <div className="btn-lastMonth">
                        <p>Last Month</p>
                    </div>
                    <div className="btn-thisMonth">
                        <p>This Month</p>
                    </div>
                    <div className="btn-future">
                        <p>Future</p>
                    </div>
                </div>
                <hr/>
                <div className="total-wallet">
                    <div className="name-total-wallet">
                        <p>Inflow</p>
                        <p>Outflow</p>
                    </div>
                    <div className="info-wallet">
                        <p>{formatMoney(money)}</p>
                        <p>+ 0</p>
                        <hr/>
                        <p>+ {formatMoney(total)}</p>
                    </div>
                </div>
            </div>
            <div className="hr-div"></div>
            <div className="container-detail-wallet">

            </div>

        </>
    )
}
