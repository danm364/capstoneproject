import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import FeedComponent from "./FeedComponent";
import filterArrow from '../assets/images/filter-arrow.svg';
import filterImage from '../assets/images/filter.svg'


const TransactionFeed = ({buyTicker, sellPrice, buyPrice, currentAccount}) => {
    
    let dropdownTransType = useRef(null)
    let dropdownSymbol = useRef(null)
    let dropdownPrice = useRef(null)
    let dropdownQuantity = useRef(null)
    let dropdownDate = useRef(null)

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
        if(eventType === 'mouseover' && targetID === "quantity-filter") {
            
            dropdownQuantity.current.style.display = 'flex';
        }
        if(eventType === 'mouseover' && targetID === "date-filter") {
            
            dropdownDate.current.style.display = 'flex';
        }

      }

      function applyFilters(e) {
        e.preventDefault()
        
        dropdownTransType.current.style.display = 'none';
        dropdownSymbol.current.style.display = 'none';
        dropdownPrice.current.style.display = 'none';
        dropdownQuantity.current.style.display = 'none';
        dropdownDate.current.style.display = 'none';

        
        let selectAllDropdownOptions = document.querySelectorAll(".feed__dropdown-input") 

        //different filter flags
        let anyFiltersAddedFlag = false;
        let transtypeColumnIsCheckedFlag = false;
        let tickerColumnIsCheckedFlag = false;
        let priceColumnIsCheckedFlag = false;
        let quantityColumnsIsCheckedFlag = false;
        let dateColumnsIsCheckedFlag = false;


        //select different checkboxes so we can check which columns need to be filtered
        let selectTranstypeColumn = document.querySelectorAll("#transtype-input")
        let selectTickerColumn = document.querySelectorAll("#ticker-input")
        let selectPriceColumn = document.querySelectorAll("#price-input")
        let selectQuantityColumn = document.querySelectorAll("#quantity-input")
        let selectDateColumn = document.querySelectorAll("#date-input")

        let transTypeColChecks = 0
        let tickerColChecks = 0
        let priceColChecks = 0
        let quantityColChecks = 0
        let dateColChecks = 0

        let checkedFilters = []
        let uncheckedFilters = []

        let rows = []
        let newData = [...data]

        console.log(selectAllDropdownOptions)

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

        for (let i = 0; i < selectQuantityColumn.length; i++) {
            if (selectQuantityColumn[i].checked) {
                quantityColChecks = true;
                quantityColChecks++;
            } 
        }

        for (let i = 0; i < selectDateColumn.length; i++) {
            if (selectDateColumn[i].checked) {
                dateColChecks = true;
                dateColChecks++;
            } 
        }

        console.log(rows)

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

            if (checkedFilters.includes(String(newData[i].quantity))) {
                rows[i]["quantityCol"] = true
            }
            else if (quantityColChecks === 0) {
                rows[i]["quantityCol"] = null
            }
            else {
                rows[i]["quantityCol"] = false
            }
            if (checkedFilters.includes(new Date(newData[i].transaction_date).toDateString())) {
                rows[i]["dateCols"] = true
            }
            else if (dateColChecks === 0) {
                rows[i]["dateCols"] = null
            }
            else {
                rows[i]["dateCols"] = false
            }
        }

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
        dropdownQuantity.current.style.display = 'none';
        dropdownDate.current.style.display = 'none';
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
                        <div className="feed__scale-down"  onMouseOver={toggleFilter}>
                            <img className="feed__filter-arrow" src={filterImage} alt="^" id="quantity-filter"/>
                        </div>
                        <form className="feed__dropdown" ref={dropdownQuantity} onMouseLeave={toggleFilter} onSubmit={applyFilters}>
                            {data.reduce((acc,curr) => {
                                if(!acc.includes(curr["quantity"])) {
                                    acc.push(curr["quantity"])
                                }
                                return acc;

                            }, []).map((element, index) => (
                                <label htmlFor={`quantity-input`} className="feed__dropdown-component" >
                                        {element}
                                        <input id={`quantity-input`} className="feed__dropdown-input" type="checkbox" />
                                </label>

                            ))
                        
                            }
                            <button className="feed__dropdown-sub-btn" >Ok</button>
                        </form>
                    </div>
                    {columnData.map((element, index) => (
           
                        <div> {element.quantity}</div>
                    
                    ))}  
                </div>
                <div className="feed__header-border">      
                    <div className="feed__svg-container">
                        <div >Date</div>
                        <div className="feed__scale-down" onMouseOver={toggleFilter}>
                            <img className="feed__filter-arrow" src={filterImage} alt="^" id="date-filter"/>
                        </div>
                        <form className="feed__dropdown" ref={dropdownDate} onMouseLeave={toggleFilter} onSubmit={applyFilters}>
                            {data.reduce((acc,curr) => {
                                if(!acc.includes(new Date(curr["transaction_date"]).toDateString())) {
                                    acc.push(new Date(curr["transaction_date"]).toDateString())
                                }
                                return acc;

                            }, []).map((element, index) => (
                                <label htmlFor={`date-input`} className="feed__dropdown-component" >
                                        {element}
                                        <input id={`date-input`} className="feed__dropdown-input" type="checkbox" />
                                </label>

                            ))
                        
                            }
                            <button className="feed__dropdown-sub-btn" >Ok</button>
                        </form>
                    </div>
                    {columnData.map((element, index) => (
           
                        <div> {new Date(element.transaction_date).toLocaleString()}</div>
                    
                    ))}   
                </div>  
            </div>
        
        </div>
    )
}

export default TransactionFeed