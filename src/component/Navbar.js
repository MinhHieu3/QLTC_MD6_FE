
import React from "react";

export default function Navbar() {
    return (
        <>
            <div className="lib-item-tab">
                <div className="lib-item-tab-left" style={{width: '700px', height: '48px', marginLeft: '-29px'}}>
                    <div className="lib-item-tab-left-toolbar">
                        <div className={'icon-menu'}> <span className='site-bar'></span></div>
                        <div className="wallet-tool-bar">
                            <img data-v-48ecc7dc="" src="https://static.moneylover.me/img/icon/icon.png"
                                 onError="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon.png'"
                                 name="4" className="wallet-icon wallet-icon-all"
                                 style={{width: '40px', height: '40px'}}/>
                        </div>
                        <div className="menuspan">
                            <span className="name" style={{width: '82px', height: '21px'}}>Name</span>

                            <span className="amount" style={{width: '82px', height: '21px'}}>Số Tiền</span>
                        </div>
                    </div>
                </div>

                <div className="lib-item-tab-right" style={{width: '700px', height: '48px'}}>
                    <div className="menubutton">
                        <button className="my-span" style={{width: '40px', height: '40px'}}><span data-v-6240d44b=""
                                                                                                  className="today"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-calendar-date" viewBox="0 0 16 16">
  <path
      d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23"/>
  <path
      d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg></span>
                        </button>
                        <button className="my-span" style={{width: '40px', height: '40px'}}><span
                            className="today"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                   fill="currentColor" className="bi bi-eye-slash"
                                                   viewBox="0 0 16 16">
  <path
      d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
  <path
      d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path
      d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg></span></button>
                        <button className="my-span" style={{width: '40px', height: '40px'}}><span
                            className="today"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                   fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path
      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></span></button>
                    </div>

                </div>

            </div>


        </>

    );
}
