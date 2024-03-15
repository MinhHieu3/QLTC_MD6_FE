import "./showWallet.css"

export default function Wallet() {
    return (
        <div className={"full-app"}>
            <div className={"wrap-my-wallet show-wallet-header"}>
                <div className={"wrap-header-title"}>
                    <a href="link_to_home_page" style={{margin: "20px", color:"black"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                             className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                    </a>
                    <span className={"title"}>
                       My title
                    </span>
                </div>
            </div>
            <div className="container d-flex flex-column align-items-center">
                <div className="wallet-container">
                    <div className="included-from-total-title">Excluded from Total</div>
                    <div className="included-from-total-wallet d-flex bd-highlight">
                        <div className="wallet-img p-2 bd-highlight">
                            <img className={"img-show-wallet"} src="https://static.moneylover.me/img/icon/icon.png"
                                 alt=""/>
                        </div>
                        <div className="wallet-info p-2 flex-grow-1 bd-highlight">
                            <span className="align-self-start input-wallet-info">Duy</span>
                            <span className="align-self-start ">+45.000đ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}