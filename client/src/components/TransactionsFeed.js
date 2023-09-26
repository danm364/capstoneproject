import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import FeedComponent from "./FeedComponent";
import filterArrow from '../assets/images/filter-arrow.svg';
import filterImage from '../assets/images/filter.svg'


const TransactionFeed = ({buyTicker, sellPrice, buyPrice, currentAccount}) => {
    
    let dropdown = useRef(null)

    const [data, setData] = useState([]);
    const [columnData, setColumnData] = useState([]);
    

    useEffect(() => {

        axios.post("http://localhost:3500/transactions/retrieveTrans", {
            currentAccount : currentAccount.currentAccount
        })
        .then(response => {

            setData(JSON.parse(response.data))
            setColumnData(JSON.parse(response.data))

        })
        .catch(error => console.log(error));

      }, [buyTicker, sellPrice, buyPrice]);

      function toggleFilter(e) {

        if(e.type === 'mouseover') {
            dropdown.current.style.display = 'flex';
        }
        else if (e.type === 'mouseleave') {
            dropdown.current.style.display = 'none';
        }

      }

      function applyFilters(e) {
        e.preventDefault()
        dropdown.current.style.display = 'none';
        let selectAllDropdownOptions = document.querySelectorAll(".feed__dropdown-input") 
        // console.log(e)
        // console.log(e.target)
        // console.log(e.target.elements[0].checked.input)
        console.log(selectAllDropdownOptions[0].checked)

        let checkedFilters = []

        for (let i = 0; i < selectAllDropdownOptions.length; i++) {
            if (selectAllDropdownOptions[i].checked) {
                checkedFilters.push(selectAllDropdownOptions[i].parentNode.textContent)
            } 
        }
        let newData = [...columnData]

        setColumnData(newData.filter(element => checkedFilters.includes(element.transactionType)))

        

        console.log(data)
        // console.log(filteredData)


      }

    return (
        <div className="feed__section">
            <div className="feed__cols">
                <div className="feed__header-border">
                    <div className="feed__svg-container">
                        <div className="feed__column-header">Transaction Type</div>
                        <div className="feed__scale-down"  onMouseOver={toggleFilter} >
                            <img className="feed__filter-arrow" src={filterImage} alt="^" />
                        </div>
                        <form className="feed__dropdown" ref={dropdown} onMouseLeave={toggleFilter} onSubmit={applyFilters}>
                            {data.reduce((acc,curr) => {
                                if(!acc.includes(curr["transactionType"])) {
                                    acc.push(curr["transactionType"])
                                }
                                return acc;

                            }, []).map((element, index) => (
                                <label htmlFor={`label-${element}`} className="feed__dropdown-component" >
                                        {element}
                                        <input id={`label-${element}`} className="feed__dropdown-input" type="checkbox" />
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
                        <div className="feed__scale-down"  onClick={toggleFilter}>
                            <img className="feed__filter-arrow" src={filterImage} alt="^" />
                        </div>
                        <div className="feed__dropdown">
                        {data.reduce((acc,curr) => {
                                if(!acc.includes(curr["symbol"])) {
                                    acc.push(curr["symbol"])
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
           
                        <div> {element.symbol}</div>
                    
                    ))} 
                    
                </div>
                <div className="feed__header-border">
                    <div className="feed__svg-container">
                        <div >Price</div>
                        <div className="feed__scale-down"  onClick={toggleFilter}>
                            <img className="feed__filter-arrow" src={filterImage} alt="^" />
                        </div>
                        <div className="feed__dropdown">
                        {data.reduce((acc,curr) => {
                                if(!acc.includes(curr["price"])) {
                                    acc.push(curr["price"])
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