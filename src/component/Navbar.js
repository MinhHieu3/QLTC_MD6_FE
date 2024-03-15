
import React from "react";

export default function Navbar() {
    return (
        <>
            <div className="lib-item-tab">
                <div className="lib-item-tab-left">
                    <div className="lib-item-tab-left-toolbar">
                        <img data-v-48ecc7dc="" src="https://static.moneylover.me/img/icon/icon.png"
                             onError="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon.png'"
                             name="4" className="wallet-icon wallet-icon-all"/>
                    </div>
                    <div className="content-wallet">
                        <p>Money</p>
                    </div>
                </div>
                <div className="lib-item-tab-right">
                    <div className="icon-jumptoday">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24"
                             aria-labelledby="ic_calendar_empty" version="1.1">
                            <defs></defs>
                            <g id="Icons/account/ic_account" stroke="none" strokeWidth="1"
                               fill="rgba(0,0,0,0.54)" fillRule="evenodd">
                                <rect id="blue-background" fillOpacity="0" fill="#FFFFFF" x="0"
                                      y="0" width="24" height="24"></rect>
                                <path
                                    d="M16,1 L16,3 L8,3 L8,1 L6,1 L6,3 L5,3 C3.895,3 3.01,3.895 3.01,5 L3,19 C3,20.105 3.895,21 5,21 L19,21 C20.105,21 21,20.105 21,19 L21,5 C21,3.895 20.105,3 19,3 L18,3 L18,1 L16,1 L16,1 Z M5,19 L5,8 L19,8 L19,19 L5,19 Z"
                                    id="Shape"></path>
                            </g>
                        </svg>
                        <span data-v-6240d44b="" className="today">15</span>
                    </div>
                    <div className="icon-eyes">
                        <svg data-v-0698e127="" data-v-6240d44b="" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="ic_view_by_category" version="1.1"><defs data-v-0698e127=""></defs> <g data-v-0698e127="" id="Icons/account/ic_account" stroke="none" stroke-width="1" fill="rgba(0,0,0,0.54)" fill-rule="evenodd"><rect data-v-0698e127="" id="blue-background" fill-opacity="0" fill="#FFFFFF" x="0" y="0" width="24" height="24"></rect> <path data-v-0698e127="" d="M22.3161056,13.4417307 L17.75,11.25 L16.9855232,11.6169489 C16.7896764,9.03569417 14.6311241,7 12,7 C9.24,7 7,9.24 7,12 C7,14.5912586 8.97447379,16.7241572 11.5,16.9752745 L11.5,19.4895971 C6.71674598,19.2901826 2.672042,16.2429274 1,12 C2.73,7.61 7,4.5 12,4.5 C17.005,4.5 21.27,7.61 23,12 C22.8037753,12.4979344 22.5749374,12.9794014 22.3161056,13.4417307 Z M14.9400559,12.5987732 L11.5,14.25 L11.5,14.9583906 C10.0824015,14.7198722 9,13.4846738 9,12 C9,10.345 10.345,9 12,9 C13.655,9 15,10.345 15,12 C15,12.2050033 14.9793629,12.40525 14.9400559,12.5987732 Z"></path> <path data-v-0698e127="" d="M17.25,23 L12.5,20.8023256 L12.5,16.1627907 L17.25,18.3604651 L17.25,23 Z M18.25,23 L18.25,18.3604651 L23,16.1627907 L23,20.8023256 L18.25,23 Z M12.5,14.9418605 L17.75,12.5 L23,14.9418605 L17.75,17.3837209 L12.5,14.9418605 Z"></path></g></svg>
                    </div>
                    <div className="icon-search">
                        <svg data-v-0698e127="" data-v-6240d44b="" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="ic_search" version="1.1"><defs data-v-0698e127=""></defs> <g data-v-0698e127="" id="Icons/account/ic_account" stroke="none" stroke-width="1" fill="rgba(0,0,0,0.54)" fill-rule="evenodd"><rect data-v-0698e127="" id="blue-background" fill-opacity="0" fill="#FFFFFF" x="0" y="0" width="24" height="24"></rect> <path data-v-6240d44b="" d="M16.8472,15.1496 L16.564,15.4328 L15.5056,14.3744 C16.5632,13.068 17.2,11.408 17.2,9.6 C17.2,5.4096 13.7904,2 9.6,2 C5.4096,2 2,5.4096 2,9.6 C2,13.7904 5.4096,17.2 9.6,17.2 C11.408,17.2 13.068,16.5632 14.3744,15.5056 L15.4328,16.564 L15.1496,16.8472 L19.9512,21.6488 L21.648,19.952 L16.8472,15.1496 L16.8472,15.1496 Z M9.6008,14.8 C6.7336,14.8 4.4008,12.4672 4.4008,9.6 C4.4008,6.7328 6.7336,4.4 9.6008,4.4 C12.468,4.4 14.8008,6.7328 14.8008,9.6 C14.8008,12.4672 12.4672,14.8 9.6008,14.8 L9.6008,14.8 Z" id="icon-search" data-v-0698e127=""></path></g></svg>
                    </div>
                </div>
            </div>


        </>

    );
}
