import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState ={
    items :[],
    totalAmount:0
};

const cartReducer = (state, action)=>{
if (action.type ==='ADD'){

    const updatedTotalAmount =state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

    const existingCartitem = state.items[existingCartItemIndex];

    let updateditems ;


    if(existingCartitem) {
       const  updatedItem ={
        ...existingCartitem,
        amount: existingCartitem.amount + action.item.amount
    };
        updateditems = [...state.items];
        updateditems[existingCartItemIndex] = updatedItem;
    } else{        
        updateditems= state.items.concat(action.item);
    }
    return {
        items: updateditems,
        totalAmount: updatedTotalAmount,
    };
}

if(action.type ==='REMOVE'){

    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updateditems;
    if(existingItem.amount === 1){
        updateditems =state.items.filter (item => item.id !== action.id);
    }else{

        const updatedItem = {...existingItem, amount: existingItem.amount - 1}
        updateditems=[...state.items]
        updateditems[existingCartItemIndex] = updatedItem;
    }
    return {
        items:updateditems,
        totalAmount:updatedTotalAmount
    }
};


    return defaultCartState;
}

const CartProvider = props => {

    const [cartState, dispatchCartAction]= useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) =>{
        dispatchCartAction({type:'ADD', item:item})
    };

    const remoeItemFromCartHander = (id) =>{
        dispatchCartAction({type:'REMOVE', id:id})
    };

     const cartContext = {

        items :cartState.items,
        totalAmount : cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: remoeItemFromCartHander,
    
    };

    return <CartContext.Provider value={cartContext} >
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;