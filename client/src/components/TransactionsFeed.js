import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import FeedComponent from "./FeedComponent";
import filterArrow from '../assets/images/filter-arrow.svg';
import filterImage from '../assets/images/filter.svg'


const TransactionFeed = ({buyTicker, sellPrice, buyPrice, currentAccount}) => {
    
    let dropdownTransType = useRef(null)
    let dropdownSymbol = useRef(null)
    let dropdownPrice = useRef(null)

    const [data, setData] = useState([]);
    const [columnData, setColumnData] = useState([]);
    

    useEffect(() => {

        axios.post("http://localhost:3500/transactions/retrieveTrans", {
            currentAccount : currentAccount.currentAccount
        })
        .then(response => {
            let allCheckBoxes = document.querySelectorAll(".feed__dropdown-component")

            for (let i = 0; i < allCheckBoxes.length; i++) {
                allCheckBoxes[i].checked = false
            }

            setData(JSON.parse(response.data))
            setColumnData(JSON.parse(response.data))

        })
        .catch(error => console.log(error));

      }, [buyTicker, sellPrice, buyPrice]);

      function toggleFilter(e) {

        let targetID = e.target.id
        let eventType = e.type

        //exiting and entering filter
        if(eventType === 'mouseover' && targetID === "transtype-filter") {
            dropdownTransType.current.style.display = 'flex';
        }
        else if (eventType === 'mouseleave') {
            dropdownTransType.current.style.display = 'none';
        }

        if(eventType === 'mouseover' && targetID === "ticker-filter") {
            dropdownSymbol.current.style.display = 'flex';
        }
        else if (eventType === 'mouseleave') {
            dropdownSymbol.current.style.display = 'none';
        }

        if(eventType === 'mouseover' && targetID === "price-filter") {
            
            dropdownPrice.current.style.display = 'flex';
        }
      }

      function applyFilters(e) {
        e.preventDefault()
        let anyFiltersAddedFlag = false;
        dropdownTransType.current.style.display = 'none';
        dropdownSymbol.current.style.display = 'none';
        dropdownPrice.current.style.display = 'none';
        let selectAllDropdownOptions = document.querySelectorAll(".feed__dropdown-input") 

        //different filter flags
        let transtypeColumnIsCheckedFlag = false;
        let tickerColumnIsCheckedFlag = false;
        let priceColumnIsCheckedFlag = false;


        //select different checkboxes so we can check which columns need to be filtered
        let selectTranstypeColumn = document.querySelectorAll("#transtype-input")
        let selectTickerColumn = document.querySelectorAll("#ticker-input")
        let selectPriceColumn = document.querySelectorAll("#price-input")

        let transTypeColChecks = 0
        let tickerColChecks = 0
        let priceColChecks = 0

        let checkedFilters = []
        let uncheckedFilters = []

        let row1 = {
            column1 : false,
            column2 : false,
            column3 : false
        }

        let rows = []
        let newData = [...data]

        //creates the grid
        for (let i = 0; i < newData.length; i++) {
            rows.push({})
        }

        //checks to see what flags have been checked off, if they have adds it to the checked flags/filters, which will be used to in the final filter 

        for (let i = 0; i < selectAllDropdownOptions.length; i++) {
            if (selectAllDropdownOptions[i].checked) {
                checkedFilters.push(selectAllDropdownOptions[i].parentNode.textContent)
                anyFiltersAddedFlag = true;
                
            } 
            else {
                uncheckedFilters.push(selectAllDropdownOptions[i].parentNode.textContent)
            }
        }
        for (let i = 0; i < selectTranstypeColumn.length; i++) {
            if (selectTranstypeColumn[i].checked) {
                transtypeColumnIsCheckedFlag = true;
                transTypeColChecks++;
            } 
        }

        for (let i = 0; i < selectTickerColumn.length; i++) {
            if (selectTickerColumn[i].checked) {
                tickerColumnIsCheckedFlag = true;
                tickerColChecks++;
            } 
        }

        for (let i = 0; i < selectPriceColumn.length; i++) {
            if (selectPriceColumn[i].checked) {
                priceColumnIsCheckedFlag = true;
                priceColChecks++;
            } 
        }

        for (let i = 0; i < newData.length; i++) {
            if (checkedFilters.includes(newData[i].transactionType)) {
                rows[i]["transTypeCol"] = true
            }
            else if (transTypeColChecks === 0){
                rows[i]["transTypeCol"] = null
            }
            else {
                rows[i]["transTypeCol"] = false
            }
            if (checkedFilters.includes(newData[i].symbol)) {
                rows[i]["symbolCol"] = true
            }
            else if (tickerColChecks === 0) {
                rows[i]["symbolCol"] = null
            }
            else {
                rows[i]["symbolCol"] = false
            }
            if (checkedFilters.includes(newData[i].price)) {
                rows[i]["priceCol"] = true
            }
            else if (priceColChecks === 0) {
                rows[i]["priceCol"] = null
            }
            else {
                rows[i]["priceCol"] = false
            }
        }

        console.log(rows)

        console.log(Object.values(newData[1]))


        // apply our filters
        if (anyFiltersAddedFlag) {
                setColumnData(newData.filter((element, index) => {
                    if (Object.values(rows[index]).every(value => value != false)) {
                        return element
                    }
                }
                ))
        }
        else {
            setColumnData(newData)
        }

        dropdownPrice.current.style.display = 'none';
      }

    return (
        <div className="feed__section">
            <div className="feed__cols">
                <div className="feed__header-border">
                    <div className="feed__svg-container">
                        <div className="feed__column-header">Transaction Type</div>
                        <div className="feed__scale-down"  onMouseOver={toggleFilter} >
                            <img className="feed__filter-arrow" src={filterImage} alt="^" id="transtype-filter"/>
                        </div>
                        <form className="feed__dropdown" ref={dropdownTransType} onMouseLeave={toggleFilter} onSubmit={applyFilters}>
                            {data.reduce((acc,curr) => {
                                if(!acc.includes(curr["transactionType"])) {
                                    acc.push(curr["transactionType"])
                                }
                                return acc;

                            }, []).map((element, index) => (
                                <label htmlFor={`transtype-input`} className="feed__dropdown-component" >
                                        {element}
                                        <input id={`transtype-input`} className="feed__dropdown-input" type="checkbox" />
                                </label>

                            ))
                        
                            }
                            <button className="feed__dropdown-sub-btn" >Ok</button>
                        </form>
                    </div>
                    {columnData.map((element, index) => (
                        
                        <div> {element.transactionType}</div>
                    
                    ))} 
                </div>
                <div className="feed__header-border">
                    <div className="feed__svg-container">
                        <div >Ticker</div>
                        <div className="feed__scale-down"  onMouseOver={toggleFilter}>
                            <img className="feed__filter-arrow" src={filterImage} alt="^" id="ticker-filter"/>
                        </div>
                        <form className="feed__dropdown" ref={dropdownSymbol} onMouseLeave={toggleFilter} onSubmit={applyFilters}>
                            {data.reduce((acc,curr) => {
                                if(!acc.includes(curr["symbol"])) {
                                    acc.push(curr["symbol"])
                                }
                                return acc;

                            }, []).map((element, index) => (
                                <label htmlFor={`ticker-input`} className="feed__dropdown-component" >
                                        {element}
                                        <input id={`ticker-input`} className="feed__dropdown-input" type="checkbox" />
                                </label>

                            ))
                        
                            }
                            <button className="feed__dropdown-sub-btn" >Ok</button>
                        </form>
                    </div>
                    {columnData.map((element, index) => (
           
                        <div> {element.symbol}</div>
                    
                    ))} 
                    
                </div>
                <div className="feed__header-border">
                    <div className="feed__svg-container">
                        <div >Price</div>
                        <div className="feed__scale-down"  onMouseOver={toggleFilter} >
                            <img className="feed__filter-arrow" src={filterImage} alt="^" id="price-filter"/>
                        </div>
                        <form className="feed__dropdown" ref={dropdownPrice} onMouseLeave={toggleFilter} onSubmit={applyFilters}>
                            {data.reduce((acc,curr) => {
                                if(!acc.includes(curr["price"])) {
                                    acc.push(curr["price"])
                                }
                                return acc;

                            }, []).map((element, index) => (
                                <label htmlFor={`price-input`} className="feed__dropdown-component" >
                                        {element}
                                        <input id={`price-input`} className="feed__dropdown-input" type="checkbox" />
                                </label>

                            ))
                        
                            }
                            <button className="feed__dropdown-sub-btn" >Ok</button>
                        </form>
                    </div>
                    {columnData.map((element, index) => (
           
                        <div> {element.price}</div>
                    
                    ))}  
                </div>
                <div className="feed__header-border">    
                    <div className="feed__svg-container">
                        <div >Quantity</div>
                        <div className="feed__scale-down"  onClick={toggleFilter}>
                            <img className="feed__filter-arrow" src={filterImage} alt="^" />
                        </div>
                        <div className="feed__dropdown">
                        {data.reduce((acc,curr) => {
                                if(!acc.includes(curr["quantity"])) {
                                    acc.push(curr["quantity"])
                                }
                                return acc;

                            }, []).map((element, index) => (
                                <div className="feed__dropdown-component">
                                        {element}
                                        <div></div>
                                
                                </div>

                            ))
                        
                            }
                        </div>
                    </div>
                    {data.map((element, index) => (
           
                        <div> {element.quantity}</div>
                    
                    ))}  
                </div>
                <div className="feed__header-border">      
                    <div className="feed__svg-container">
                        <div >Date</div>
                        <div className="feed__scale-down" onClick={toggleFilter}>
                            <img className="feed__filter-arrow" src={filterImage} alt="^" />
                        </div>
                        <div className="feed__dropdown">
                        {data.reduce((acc,curr) => {
                                if(!acc.includes(curr["transaction_date"])) {
                                    acc.push(curr["transaction_date"])
                                }
                                return acc;

                            }, []).map((element, index) => (
                                <div className="feed__dropdown-component">
                                        {new Date(element).toLocaleDateString()}
                                        <div></div>
                                
                                </div>

                            ))
                        
                            }
                        </div>
                    </div>
                    {data.map((element, index) => (
           
                        <div> {new Date(element.transaction_date).toLocaleString()}</div>
                    
                    ))}   
                </div>  
            </div>
        
        </div>
    )
}

export default TransactionFeed