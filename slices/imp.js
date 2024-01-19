// searching for an element is array and deleting It
let arr = [
  {
    id: 1,
    name: "adi",
    quantity: 1,
  },
  {
    id: 2,
    name: "akash",
    quantity: 1,
  },
  {
    id: 3,
    name: "akshat",
    quantity: 1,
  },
];

const payload_struct = {
  id: 1,
  name: "Arjun",
  quantity: 1,
};

// add iteam (takes an struct(with,id,name,quantity:1) as payload)
const addItem = (payload_struct) => {
  flag = true;
  // check if the item already exists
  arr.map((item) => {
    if (item.id === payload_struct.id) {
      // if item exists in cart, increase it's quantity by 1
      item.quantity += 1;
      flag = false;
    }
  });

  // else add item to the cart
  if (flag) {
    arr.push(payload_struct);
  }
};

// remove item (takes product_id as payload)
const removeItem = (payload_id) => {
  arr.map((item) => {
    if (item.id === payload_id) {
      const index = arr.indexOf(item);
      arr1 = arr.slice(0, index);
      arr2 = arr.slice(index + 1);
      arr = arr1.concat(arr2);
    }
  });
};

// remove all (clear list)
const removeAllItems = () => {
  arr.length = 0;
};

// increase the quantity of product (using it's id)
const increment = (payload_id) => {
  arr.map((item) => {
    if (item.id === payload_id) {
      item.quantity += 1;
    }
  });
};

// decrease the quantity of product (using it's id)
const decrement = (payload_id) => {
  arr.map((item) => {
    if (item.id === payload_id) {
      item.quantity -= 1;
    }
  });
};

///////////// if item quantity is zero call removeItem function by passing it's id






// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, incrementByAmount } from '../../slices/counterSlice'

// const count = useSelector((state) => state.counter.value)
//   const dispatch = useDispatch()