
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import "./Wallet.css";

export default function Wallet() {
    const dispatch = useDispatch();
    const wallets = useSelector(state => state.wallets.wallets);
    const detailWallets = useSelector(state => state.details.details);
    const selectedWalletIndex = useSelector(state => state.wallets.index);
    const wallet = wallets[selectedWalletIndex];
    const money = wallet ? wallet.money : 0;
    console.log(detailWallets)
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
    };
    const total = wallet ? (wallet.money || 0) : 0;
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
            <div className="show-detail">
                <div className="hr-div"></div>
                {detailWallets && detailWallets.map((detail, index) => (
                    <div key={detail.id}>
                        <div className="container-detail-wallet">
                            <div className="date-wallet-detail">
                                <div className="date-time">26</div>
                                <div className="time">{detail.localDate}</div>
                            </div>
                            <div className="money-wallet-detail">
                                <p>{formatMoney(detail.money)}</p>
                            </div>
                        </div>
                        {index !== detailWallets.length - 1 && <hr className="hrs"/>}
                    </div>
                ))}
            </div>
        </>
    )
}
