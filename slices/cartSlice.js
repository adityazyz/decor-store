import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'

//// using previous cart from cookies at navbar  
//// will clear the cookies at time of logout (localCart)

const cookies = new Cookies(); 

const initialState = {
  cartItems: [] 
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // takes in an struct as payload (with id, name, and quantity)
    addItem : (state,action) => {
        let flag = true;
        // check if the item already exists
        if(state.cartItems.length > 0){
          state.cartItems.map((item) => {
            if ((item.product_id === action.payload.product_id)&&(item.selected_size === action.payload.selected_size) && (item.selected_color === action.payload.selected_color)) {
              // if item exists in cart, increase it's quantity by 1
              item.product_quantity += 1;
              flag = false;
            }
          });
        }
        // else add item to the cart
        if (flag) {
          state.cartItems.push(action.payload);
        }

        // storing the updated cart in cookies
        cookies.set("localCart",state.cartItems  )
      },

     
    // remove item (takes product_id as payload) 
    // takes in a struct payload -> {product_id : ___ }
    removeItem : (state,action) => {
        state.cartItems.map((item) => {
          if (item.product_id === action.payload.product_id) {
            let index = state.cartItems.indexOf(item);
            let arr1 = state.cartItems.slice(0, index);
            let arr2 = state.cartItems.slice(index + 1);
            state.cartItems = arr1.concat(arr2);
          }
        });

        // storing the updated cart in cookies 
        cookies.set("localCart",state.cartItems  )
    },

    // remove all (clear list)
    removeAllItems : (state) => {
        state.cartItems.length = 0;

        // storing the updated cart in cookies 
        cookies.set("localCart",state.cartItems  )
    },

    // increase the quantity of product (using it's id)
    // takes in a struct payload -> {product_id : ___ }
    increaseQuantity : (state, action) => {
        state.cartItems.map((item) => {
          if (item.product_id === action.payload.product_id) {
            item.product_quantity += 1;
          }
        });

        // storing the updated cart in cookies 
        cookies.set("localCart",state.cartItems  )
    },

    // decrease the quantity of product (using it's id)
    // takes in a struct payload -> {product_id : ___ }
    decreaseQuantity : (state, action) => {
        state.cartItems.map((item) => {
          if (item.product_id === action.payload.product_id) {    // no negative
            if((item.product_quantity ) > 0){
              item.product_quantity -= 1;
              // if value becomes 0 ...remove item
              if((item.product_quantity ) === 0){
                state.cartItems.map((item) => {
                  if (item.product_id === action.payload.product_id) {
                    let index = state.cartItems.indexOf(item);
                    let arr1 = state.cartItems.slice(0, index);
                    let arr2 = state.cartItems.slice(index + 1);
                    state.cartItems = arr1.concat(arr2);
                }
              });
            }
          }
        }
      });
      // storing the updated cart in cookies 
      cookies.set("localCart",state.cartItems  )

    },

    // searches for saved cart in local storage...during loading of cart
    // sets state.cartItems = localStorage.getItem('localCart')
    savedCart : (state,action) => {
      state.cartItems = action.payload
  },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, removeAllItems, increaseQuantity, decreaseQuantity, savedCart } = cartSlice.actions

export default cartSlice.reducer