import React from "react";

const Pricing = () => {
    return (
        <main className="pricing">
            <div className="pricing__card">
                <h2 className="pricing__header">Bronze</h2>
                <h3 className="pricing__rate">15$</h3>
                <p className="pricing__users">per user/monthly paid annually</p>
                <ul className="pricing__info-list">
                    <li className="pricing__info-item">Upload Data up to 5GB</li>
                    <li className="pricing__info-item">Unlimited Storage</li>
                    <li className="pricing__info-item">Technical Support during Local Business time</li>
                    <li className="pricing__info-item">API integrations</li>
                </ul>
                <div className="pricing__btn-container">
                    <button className="pricing__btn">Buy</button>
                </div>
            </div>
            <div className="pricing__card">
                <h2 className="pricing__header">Silver</h2>
                <h3 className="pricing__rate">25$</h3>
                <p className="pricing__users">per user/monthly paid annually</p>
                <ul className="pricing__info-list">
                    <li className="pricing__info-item">Upload Data up to 10GB</li>
                    <li className="pricing__info-item">Unlimited Storage</li>
                    <li className="pricing__info-item">Technical Support during Local Business time</li>
                    <li className="pricing__info-item">API integrations</li>
                </ul>
                <div className="pricing__btn-container">
                    <button className="pricing__btn">Buy</button>
                </div>
            </div>
            <div className="pricing__card">
                <h2 className="pricing__header">Gold</h2>
                <h3 className="pricing__rate">50$</h3>
                <p className="pricing__users">per user/monthly paid annually</p>
                <ul className="pricing__info-list">
                    <li className="pricing__info-item">Upload Data up to 5GB</li>
                    <li className="pricing__info-item">Unlimited Storage</li>
                    <li className="pricing__info-item">Technical Support during Local Business time</li>
                    <li className="pricing__info-item">API integrations</li>
                </ul>
                <div className="pricing__btn-container">
                    <button className="pricing__btn">Buy</button>
                </div>
            </div>
        </main>

    )
}

export default Pricing