import { configureStore, createSlice } from "@reduxjs/toolkit";
import Cart from "./Cart";
import { useSelector } from "react-redux";

const productSlice = createSlice({
  name: "products",
  initialState: {
    veg: [
      { name: "tomato", price: 200 },
      { name: "carrot", price: 50 },
      { name: "brinjal", price: 20 },
      { name: "cabbage", price: 40 },
    ],
    nonveg: [
      { name: "chicken", price: 500 },
      { name: "fish", price: 300 },
      { name: "mutton", price: 700 },
      { name: "crab", price: 900 },
    ],
    dairyProducts: [
      { name: "milk", price: 60 },
      { name: "curd", price: 50 },
      { name: "butter", price: 150 },
      { name: "yogurt", price: 200 },
    ],
  },
  reducers: {},
});


const cartSlice = createSlice({
    name: "cart",
    initialState: [], 
    reducers: {
      addToCart: (state, action) => {  
        const item = state.find((item) => item.name === action.payload.name); 
        if (item) {
          item.quantity += 1; 
        } else {
          state.push({ ...action.payload, quantity: 1 }); 
        }
      },
      increment:(state,action)=>{
        let item=state.find(item=>item.name===action.payload.name);
        if (item) {
          item.quantity += 1;
        }
      },
      decrement: (state, action) => {
        let item = state.find((item) => item.name === action.payload.name);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter((item) => item.name !== action.payload.name);
        }
      },
      remove:(state,action) => {
        return state.filter(item=>item.name!==action.payload.name);
      },
      clearCart:()=>[],

    },
  });
  
  const purchaseDetailsSlice=createSlice({
    name:"purchaseDetails",
    initialState:[],
    reducers:{
      addPurchasedetails:(state,action)=>{
        state.push(action.payload)
      }
    },
  });



  const authSlice = createSlice({
    name: "auth",
    initialState: {
      isAuthenticated: localStorage.getItem("username") ? true : false,
      user: localStorage.getItem("username") || "",
    },
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem("username", action.payload);
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = "";
        localStorage.removeItem("username");
      },
    },
  });

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart:cartSlice.reducer,
    purchaseDetails:purchaseDetailsSlice.reducer,
    auth:authSlice.reducer
  },
});

export default store;
export const {addToCart,increment,decrement,remove,clearCart} = cartSlice.actions;
export const {addPurchasedetails}=purchaseDetailsSlice.actions;
export const { login, logout } = authSlice.actions;