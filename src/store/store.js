import { createStore } from "redux";

const defaultState = {
  isLoggedIn: false,
  userToken: "",
  userEmail: "",
  userId: "",
  userName: "",
  cartItems: [],
  cartMsg: "",
  cartTotalAmount: 0,
  userContact: null,
  userSince: "",
  isAdmin: false,
  labelName: "",
  type: "",
  adminView: false,
};

const storeReducer = (state = defaultState, action) => {
  if (action.type === "log in") {
    const data = action.data;
    const user = data.user;

    const obj = {
      ...state,
      isLoggedIn: true,
      userToken: data.token,
      userEmail: user.email,
      userId: user.id,
      userName: user.name,
      userContact: user.contact,
      userSince: user.userSince,
      labelName: user.name,
      isAdmin: user.isAdmin,
      type: data.type,
      adminView: data.adminView ? true : false,
    };

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      isLoggedIn: true,
      userToken: data.token,
      userEmail: user.email,
      userId: user.id,
      userName: user.name,
      userContact: user.contactNum,
      userAddress: user.address,
      userSince: user.userSince,
      labelName: user.name,
      isAdmin: user.isAdmin,
      type: data.type,
      adminView: data.adminView ? true : false,
    };
  }

  if (action.type === "logout") {
    localStorage.clear();
    return { ...defaultState };
  }

  if (action.type === "adminLogin") {
    const data = action.data;
    const obj = {
      ...state,
      isLoggedIn: true,
      isAdmin: true,
      adminView: true,
      userToken: data.token,
      userName: data.name || "Admin",
      userEmail: data.email,
      type: "admin",
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return obj;
  }

  if (action.type === "adminLogout") {
    localStorage.clear();
    return { ...defaultState };
  }

  if (action.type === "addToCart") {
    let amount = 0;
    const product = action.data; // Fixed: was action.product, should be action.data
    const cartItems = state.cartItems || []; // Fixed: ensure cartItems is always an array
    let alreadyFound = cartItems.find((item) => {
      return item.name === product.name && item.price === product.price; // Fixed: use name+price for comparison since rental items might not have id
    });

    if (alreadyFound) {
      return {
        ...state,
        cartMsg: "Item already in cart",
      };
    }

    let updatedCartItems = [...(state.cartItems || []), product]; // Fixed: ensure state.cartItems is always an array

    for (const item of updatedCartItems) {
      amount += Number(item.price.replace("₹", "").replace(",", ""));
    }

    const obj = {
      ...state,
      cartItems: updatedCartItems,
      cartMsg: "Added to cart",
      cartTotalAmount: amount,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      cartItems: updatedCartItems,
      cartMsg: "Added to cart",
      cartTotalAmount: amount,
    };
  }

  if (action.type === "itemRemover") {
    const product = action.data; // Fixed: use action.data to get the product to remove
    const cartItems = state.cartItems || []; // Fixed: ensure cartItems is always an array

    if (cartItems.length === 1) {
      const obj = {
        ...state,
        cartItems: [],
        cartMsg: "Removed",
        cartTotalAmount: 0,
      };
      localStorage.setItem("state", JSON.stringify(obj));
      return {
        ...state,
        cartItems: [],
        cartMsg: "Removed",
        cartTotalAmount: 0,
      };
    }

    let amount = 0;
    const updatedCartItems = cartItems.filter((item) => {
      return !(item.name === product.name && item.price === product.price); // Fixed: use name+price for comparison
    });

    for (const item of updatedCartItems) {
      amount += Number(item.price.replace("₹", "").replace(",", ""));
    }

    const obj = {
      ...state,
      cartItems: updatedCartItems,
      cartMsg: "Removed",
      cartTotalAmount: amount,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      cartItems: updatedCartItems,
      cartMsg: "Removed",
      cartTotalAmount: amount,
    };
  }

  if (action.type === "clearCart") {
    const localStr = JSON.parse(localStorage.getItem("state"));
    const obj = {
      ...localStr,
      cartItems: [],
      cartMsg: "",
      cartTotalAmount: 0,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      cartItems: [],
      cartMsg: "",
      cartTotalAmount: 0,
    };
  }

  if (action.type === "clearCartMsg") {
    return {
      ...state,
      cartMsg: "",
    };
  }

  if (action.type === "reload") {
    return {
      ...action.data,
      adminView: action.data.adminView ? true : false,
    };
  }

  return state;
};

const store = createStore(storeReducer);

export default store;
