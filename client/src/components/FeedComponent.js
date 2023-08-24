




const FeedComponent = ({transType, ticker, price, quantity, date, setRefreshKey}) => {
    console.log(ticker)

    return (
       (ticker && quantity) && (
            <div className="feed__cols">
                <div>{transType}</div>
                <div>{ticker}</div>
                <div>{price}</div>
                <div>{quantity}</div>
                <div>{date}</div>
            </div>
            
       ) 
       
    )
}

export default FeedComponent