import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";

function Dairy(){
    let dairyProducts=useSelector((state)=>state.products.dairyProducts)
    let dispatch=useDispatch();

        let finalItems=dairyProducts.map((item,index)=>(<li key={index}>{item.name}-${item.price}
        <button onClick={()=>dispatch(addToCart(item))}>Add to Cart</button></li>))

        return(
            <>
            <h1>Dairy Products</h1>
            <ol>{finalItems}</ol>
            </>
        )
}

export default Dairy;