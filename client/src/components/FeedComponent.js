




const FeedComponent = (props) => {

    

    return (
       
            <div className="feed__cols">
                <div>{props.transType}</div>
                <div>{props.ticker}</div>
                <div>{props.price}</div>
                <div>{props.quantity}</div>
                <div>{props.date}</div>
            </div>
            
            
    )
}

export default FeedComponent