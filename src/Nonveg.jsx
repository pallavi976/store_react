import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";

function Nonveg(){
    let nonvegItems=useSelector((state)=>state.products.nonveg)
    let dispatch=useDispatch();

        let finalItems=nonvegItems.map((item,index)=>(<li key={index}>{item.name}-${item.price}
        <button onClick={()=>dispatch(addToCart(item))}>Add to Cart</button>
        </li>))

        return(
            <>
            <h1>Nonveg Items</h1>
            <ol>{finalItems}</ol>
            </>
        )
}

export default Nonveg;