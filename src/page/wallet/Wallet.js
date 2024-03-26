import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import "./Wallet.css";
import {useState} from "react";

export default function Wallet() {
    const dispatch = useDispatch();
    const wallets = useSelector(state => state.wallets.wallets);
    const detailWallets = useSelector(state => state.details.details);
    const selectedWalletIndex = useSelector(state => state.wallets.index);
    const wallet = wallets[selectedWalletIndex];
    const money = wallet ? wallet.money : 0;
    const [showInfoWallets, setShowInfoWallets] = useState(false);
    const [testDetail, setTestDetail] = useState();

    const handleInfoWallets = () => {
        setShowInfoWallets(true);
    };
    const handleCloseInfoWallets = () => {
        setShowInfoWallets(false);
    };
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
    };
    const total = wallet ? (wallet.money || 0) : 0;

    const productDetail = detailWallets.filter((item) => item.id === testDetail);
    console.log('productDetail',productDetail);
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
            <div className="show-detail" onClick={handleInfoWallets}>
                <div className="hr-div"></div>
                {detailWallets && detailWallets.map((detail, index) => (
                    <div onClick={() => {
                        setTestDetail(detail.id);
                    }} key={detail.id}>
                        <div className="container-detail-wallet" >
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
            {productDetail && productDetail.map((detail) => (
                <div>
                    {showInfoWallets && (
                        <div className={"show-detail-if-wallets"}>
                            <div className={"show-detail-if-wallets-title"}>
                                <div className={"show-detail-if-wallets-title-title"}>Transaction details</div>
                                <div className={"show-detail-if-wallets-title-close"} onClick={handleCloseInfoWallets}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path
                                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                    </svg>
                                </div>
                            </div>
                            <hr/>
                            <div className={"show-detail-if-wallets-mid"}>
                                <div className={"avatar-detail-wallets"}><img
                                    src="https://png.pngtree.com/png-clipart/20201208/original/pngtree-isolated-parcel-box-vector-icon-png-image_5592575.jpg"
                                    className={"img-detail-wallets"}/></div>
                                <div>
                                    <div className={"title-name-1"}>Other Income</div>
                                    <div className={"title-name-2"}>Description: {detail.description}
                                    </div>
                                    <div className={"title-name-3"}>Time: {detail.localDate}</div>
                                    <hr/>
                                </div>
                            </div>
                            <div className={"show-wallets-bottoms"}>
                                <div className={"title-bottoms-wallets"}>Adjust Balance</div>
                                <div className={"show-money-wallets-detail"}>{formatMoney(detail.money)}</div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}
