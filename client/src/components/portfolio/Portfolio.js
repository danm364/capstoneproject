import React from "react";
import Holdings from "./holdings/Holdings";




const Portfolio = () => {
    return (

        <div className="portfolio__section">
            <div className="portfolio__container">
                <div className="portfolio__graphs"></div>
                <div className="portfolio__graphs"></div>
            </div>
            <div className="portfolio__holdings">
                <div className="portfolio__headers">
                    <div>Ticker</div>
                    <div>Cost</div>
                    <div>Market Value</div>
                </div>
                < Holdings />
                < Holdings />
                < Holdings />
                < Holdings />
                < Holdings />
                

            </div>
        </div>

    )
}

export default Portfolio