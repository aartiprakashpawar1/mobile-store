import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

//provider
//consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart:[],
    modalOpen:false,
    modalProduct:detailProduct,
    cartSubTotal:0,
    cartTax:0,
    cartTotal:0

  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let products = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });

    this.setState(() => {
      return { products};
    });
  };






getItem =(id)=>{
    const product = this.state.products.find(item => item.id === id)
    return product
}

  handleDetail = (id) => {
   // console.log("hello from detail");
    const product = this.getItem(id)
    this.setState({detailProduct:product})
  };


  addToCart = (id) => {
   // console.log(`hello from add to cart ${id}`);
    let tempProducts =[...this.state.products]
    console.log("product",tempProducts)
    const index = tempProducts.indexOf(this.getItem(id))
    console.log("index",index)
  //const  product = tempProducts[index]
  const product = tempProducts[index];

    console.log("product3",product)
    product.inCart = true
    product.count = 1
    const price = product.price
    product.total = price
    this.setState(
      ()=>{
        
          return { product:tempProducts,
             cart:[...this.state.cart,product]
          }
      },
        
          this.addTotal)
 };

  ModalOpen = id =>{
    const product = this.getItem(id)

    this.setState(()=>{
      return{
        modalProduct:product,modalOpen:true
        
      }
    })
  }

  closeModal= () =>{
    this.setState(()=>{
      return {
        modalOpen:false
        
      }
      
    })
    console.log("modal",this.state.modalOpen)
  }


increment = (id)=> {
  let tempCart = [...this.state.cart]
  const selectedProduct = tempCart.find(item => item.id === id)
  const index = tempCart.indexOf(selectedProduct)
  const product = tempCart[index]

  product.count = product.count + 1

  product.total = product.count * product.price;

  this.setState(()=>{
    return{cart:[...tempCart]}
  },()=>{this.addTotal()})
   
  console.log("increment msg");
}

decrement = (id)=> {
  let tempCart = [...this.state.cart]
  const selectedProduct = tempCart.find(item => item.id === id)
  const index = tempCart.indexOf(selectedProduct)
  const product = tempCart[index]

  product.count = product.count - 1
  if(product.count === 0){
    this.removeItem(id)
  }
  else {
    product.total = product.count * product.price
  }

  this.setState(()=>{
    return{cart:[...tempCart]}
  },()=>{this.addTotal()})

  console.log("decrement msg");
}

removeItem =(id)=>{
 

  let tempProducts =[...this.state.products]
  let tempCart = [...this.state.cart]
  const index = tempProducts.indexOf(this.getItem(id))
  let removedProduct = tempProducts[index]
  console.log(("remove 1",removedProduct.inCart))
  removedProduct.inCart = false
  removedProduct.count = 0
  removedProduct.total = 0

  tempCart = tempCart.filter(item => {
    return item.id !== id
  })

  this.setState(
    ()=>{
    return{
      cart:[...tempCart],
      products:[...tempProducts]
    }
  },
  ()=>{
    this.addTotal()
  })
  
}

clearCart =(id)=>{
  console.log("clearCart item");
  this.setState(()=>{
    return {cart : []}
  },()=>{
    this.setProducts()
    this.addTotal()
  })
}

addTotal =()=>{
let subTotal = 0
this.state.cart.map(item=>(subTotal += item.total))
const tempTax = subTotal * 0.1;
const tax = parseFloat(tempTax.toFixed(2))
const total = subTotal + tax

this.setState(()=>{
  return {
    cartSubTotal:subTotal,
    cartTax:tax,
    cartTotal:total
  }
})
}

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          ModalOpen:this.ModalOpen,
          closeModal:this.closeModal,
          increment:this.increment,
          decrement:this.decrement,
          removeItem:this.removeItem,
          clearCart:this.clearCart

        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
