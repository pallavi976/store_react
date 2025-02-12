import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPurchasedetails, clearCart, decrement, increment, remove } from "./store";
import './app.css';

function Cart(){

    let cartObjects=useSelector(state=> state.cart);
    let dispatch=useDispatch();

    let totalPrice;
    totalPrice=cartObjects.reduce((sum,item) => sum+item.quantity*item.price,0);

    const [discountPercentage , setDiscountPercentage ]= useState(0);

    const[showDiscount , setShowDiscount] = useState(false);

    const [couponCode,setCouponCode]=useState("");

    const[showCoupon,setShowCoupon]=useState(false);

    const[couponCodeDiscountPercentage,setCouponCodeDiscountPercentage]=useState(0);

    let handlingCouponPercentage=()=>{
        switch (couponCode.toUpperCase()) {
            case 'ZORO10':setCouponCodeDiscountPercentage(10);
             break;
             case 'ZORO20':setCouponCodeDiscountPercentage(20);
             break;
             case 'ZORO30':setCouponCodeDiscountPercentage(30);
             break;
             case 'ZORO40':setCouponCodeDiscountPercentage(40);
             break;
        
            default:alert("Invalid Coupon Code");
            setCouponCodeDiscountPercentage(0);
                break;
        }
    };

    let couponDiscountPrice=totalPrice*couponCodeDiscountPercentage/100;

    

    let discountPrice=totalPrice*discountPercentage/100;

    let finalPrice=totalPrice-discountPrice-couponDiscountPrice;

   
    let cartItems=cartObjects.map((item,index)=>(<li key={index}>{item.name}-{item.price}
    
    </li>));

    let handleCompletePurchase=()=>{
        const purchaseDate=new Date().toLocaleDateString();
        let purchaseDetails={
            date:purchaseDate,
            items:[...cartObjects],
            totalPrice:totalPrice
        }
        dispatch(clearCart());
        dispatch(addPurchasedetails(purchaseDetails));
 }
    
    const emptyCartImage="cartimage.jpg";


    return(
        <>
        {cartObjects.length>0?(
        <div>
        <h3>Welcome to Cart</h3>
        <ul>
        {cartObjects.map((item, index) => (
         <li key={index}>
         {item.name} - ${item.price} 

     <button onClick={()=>dispatch(increment(item))}>+</button>
     <button onClick={()=>dispatch(decrement(item))}>-</button>
     quantity:{item.quantity}
     <button onClick={() => dispatch(remove({ name: item.name }))}>Remove</button>


         </li>
        ))}
        </ul>

        <p style={{color:"purple",fontFamily:'cursive'}}>Your Total Price{totalPrice}</p>
        { showDiscount &&
        <div>
        <p style={{color:"green",fontFamily:'revert'}}>Discount Applied{discountPercentage}</p>
        <p style={{color:"violet",fontFamily:'initial'}}>Your Discount Price{discountPrice}</p>
        </div>
        }
        { showCoupon &&
        <div>
        <p style={{color:"green",fontFamily:'revert'}}>Coupon Applied{couponCodeDiscountPercentage}</p>
        <p style={{color:"violet",fontFamily:'initial'}}>Your Coupon Discount Price{couponDiscountPrice}</p>
        </div>
        }
        <p style={{color:"orange",fontFamily:'serif'}}>Your Net Amount to pay{finalPrice}</p>

    <button className="button" onClick={()=>{setDiscountPercentage(10);setShowDiscount(true);}}>Apply 10% discount</button>
    <button className="button"  onClick={()=>{setDiscountPercentage(20); setShowDiscount(true);}}>Apply 20% discount</button>
    <button className="button"  onClick={()=>{setDiscountPercentage(30);setShowDiscount(true);}}>Apply 30% discount</button>
    <p>
    <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="apply coupon code"
            />
    <button onClick={()=>{handlingCouponPercentage();setShowCoupon(true);}}>Apply Coupon</button>
    </p>

        </div>)
        :(
        <div style={{ textAlign: "center" }}>
        <img
            src={emptyCartImage}  
            alt="Empty Cart"
            style={{ width: '200px', height: '200px', marginBottom: '20px' }}/>
        <p style={{color:"blue",fontFamily:'fantasy'}}>Your cart is empty</p>
        </div>
        )
    }
    <button onClick={handleCompletePurchase}>Complete Purchase</button>
    </>
    )
}
export default Cart;