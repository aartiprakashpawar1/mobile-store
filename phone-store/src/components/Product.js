import React, { Component } from 'react'

import styled from  'styled-components'
import {Link} from 'react-router-dom'
import {ProductConsumer} from '../context'
import PropTypes from "prop-types"

export default class Product extends Component {
    render() {

        const {id,title,img,price,inCart} = this.props.product

        return (
            <Productwrapper className="col-9 mx-auto col-lg-3 my-3">
            
               <div className="card">

               <ProductConsumer>
               {(value)=>{
                   return (
                    <div className="img-container p-5" onClick={()=>{value.handleDetail(id)}}>
                    <Link to="/details">
                    <img src={img} alt="product" className="card-img-top"/>
                    </Link>
                    <button className="cart-btn" 
                    disabled={inCart? true : false}
                    onClick={()=>{value.addToCart(id)
                                 value.ModalOpen(id)}}>
                      
                      
                        {inCart?(
                            <p className="text-capitalize mb-0" disabled>
                        
                        in cart
                        </p>
                        ):(
                            <i className="fas fa-cart-plus"/>
                            )}
                    </button>
                   </div>
                   )
               
               }}
             
            
               </ProductConsumer>
                           {/* cart  footer */}
                            <div className=" mt-2 mb-3 cart-footer d-flex justify-content-between " style={{backgroundColor: "#f2f2f2"}}>
                                <p className="ms-4 me-auto mb-0">
                                    {title}
                                
                                </p>
                                <h5 className="me-4 text-blue font-italic mb-0">
                                    <span className="me-1">₹</span>
                                    {price}
                                </h5>
                            </div>
               </div>
           
            </Productwrapper>
            
        )
    }
}


Product.propTypes = {
    product:PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    }).isRequired

}

const Productwrapper = styled.div`
.cart{
    border-color:transparent;
    transition:all 1s linear;
}
.card-footer{
    background:transparent;
    border-top:transparent;
    transition:all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
       box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
   }
   .card-footer{
       background:rgba(247,247,247);
   }
}
   .img-container{
       position:relative;
       overflow:hidden;

   }

   .card-img-top{
       transition:all 1s linear;
   }
   .img-container:hover .card-img-top{
       transform: scale(1.2)
   }

   .cart-btn{
       position:absolute;
       bottom:0;
       right:0;
       padding: 0.2rem 0.4rem;
       background:var(--lightBlue);
       border:none;
       color:var(--mainwhite);
       font-size:1.4rem;
       border-radius:0.5rem 0 0 0;
       transform: translate(100%, 100%);
       transition: all 1s ease-in-out;
   }
   .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }

`