import { useSelector } from "react-redux";

function Orders(){

    const purchaseHistory=useSelector(state=>state.purchaseDetails);

    

   

    const finalData = purchaseHistory.map((purchase, index) => (
        <li key={index}>
            <p>Date: {purchase.date}</p> 
            <p>Total Amount: ${purchase.totalPrice.toFixed(2)}</p>
            <ul>
                {purchase.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                        {item.name} - ${item.price} * {item.quantity}
                    </li>
                ))}
            </ul>
        </li>
    ));
    
    return (
        <div>
            <h1>Purchase History</h1>
            {purchaseHistory.length > 0 ? (
                <ul>{finalData}</ul>
            ) : (
                <p>No purchase history</p>
            )}
        </div>
    );
    
}
export default Orders;