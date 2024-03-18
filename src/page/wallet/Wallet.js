import "./Wallet.css";

export default function Wallet() {
    return (
        <>
            <div className="container-wallet">
                <div className="nav-create-wallet">
                    <div className="btn-show-form">
                        <p>Create</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="30" height="30" style={{border: 'none'}}>
                            <rect x="20" y="40" width="60" height="20" style={{fill:'#40A551'}} />
                            <rect x="40" y="20" width="20" height="60" style={{fill:'#40A551'}} />
                        </svg>
                    </div>
                </div>
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
            </div>
        </>
    )
}