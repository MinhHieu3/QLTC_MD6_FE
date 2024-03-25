import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import {addDetail, deleteDetail} from "../../service/detail/detailService"; // Import action từ slice detailSlice
import "./Wallet.css";

export default function Wallet() {
    const wallets = useSelector(state => state.wallets.wallets);
    const selectedWalletIndex = useSelector(state => state.wallets.index);
    const wallet = wallets[selectedWalletIndex];
    const total = wallet ? (wallet.money || 0) : 0;
    const details = useSelector(state => state.details.details);
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseNote, setExpenseNote] = useState("");
    return (
        <>
            <Link to={'add-wallets'} className={'nav-create-wallet'}>
                <div className="btn-show-form">
                    Add Transaction
                </div>
            </Link>
            {wallet && (
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
                    <hr />
                    <div className="total-wallet">
                        <div className="name-total-wallet">
                            <p>Inflow</p>
                            <p>Outflow</p>
                        </div>
                        <div className="info-wallet">
                            <p>{formatMoney(wallet.money)}</p>
                            <p>0 đ</p>
                            <hr />
                            <p>+ {formatMoney(total)}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
