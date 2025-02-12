import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";

function Veg(){
    let vegItems=useSelector((state)=>state.products.veg)
    let dispatch=useDispatch();

        let finalItems=vegItems.map((item,index)=>(<li key={index}>{item.name}-${item.price}
        <button onClick={()=>dispatch(addToCart(item))}>Add to Cart</button></li>))

        return(
            <>
            <h1>Veg Items</h1>
            <ol>{finalItems}</ol>
            </>
        )
}

export default Veg;