import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarts, getAllProducts } from '../actions/productActions';
import Header from '../components/Header';

const Cart = () => {
    const [quantity, setQuantity] = useState([]);
    const dispatch = useDispatch();
    const { productsLoading, products, productsError} = useSelector(state=> state.productsList);
    const { cartLoading, cartList, cartError} = useSelector(state=> state.cartListStore);
    useEffect(()=>{
        dispatch(getAllProducts());
        dispatch(getCarts());
    },[]);

    useEffect(()=>{
        if(cartLoading === false && cartList.length !== 0){
            let quan = [];
            cartList.forEach((element) => {
                quan =  [...quan, [...element.products]];
            });
            setQuantity(quan);
        }
        
    },[cartLoading]);

    const addMinus = (cartIndex, productIndex, addOrMinus) =>{
        if(addOrMinus){
            setQuantity((current)=>{
                let temp = [...current];
                temp[cartIndex][productIndex].quantity++;
                return temp;
            })
        }else{
            setQuantity((current)=>{
                let temp = [...current];
                if(temp[cartIndex][productIndex].quantity !== 1)
                    temp[cartIndex][productIndex].quantity--;
                return temp;
            })
        }
    }

    return <>
        <Header/>
        <div className='container-fluid'>
            {cartList && cartList.length > 0 && products.length > 0 && quantity.length > 0 && cartList.map((elem, cartIndex)=>{
                let total = 0;
                return <div key={elem.id} className='border p-3 mb-3'> 
                    <h5>Date : {String(elem.date).slice(0, 10)}</h5>
                    {elem.products ?.map((product, productIndex)=>{
                        total += products[product.productId-1].price * product.quantity;
                        return <div className="card" key={product.productId} >
                            <div className="card-horizontal p-2">
                                <div className="img-square-wrapper d-flex align-items-center mr-2">
                                    <img width='120' height='100' src={products[product.productId-1].image} alt="Card image cap"/>
                                </div>
                                <div className="card-body p-2 pl-0">
                                    <h6 className="card-title">{products[product.productId-1].title}</h6>
                                    <p className="card-text text-primary">Price: &#8377; {products[product.productId-1].price}</p>
                                    <div className='w-100'>
                                        <button className='btn btn-dark' onClick={e=> addMinus(cartIndex, productIndex, false)}>-</button> 
                                        <span className='mx-2'>{quantity[cartIndex][productIndex].quantity}</span> 
                                        <button className='btn btn-dark' onClick={e=> addMinus(cartIndex, productIndex, true)}>+</button> 
                                        <button className='btn btn-danger rounded ml-1' onClick={e=> alert('Product removed from cart. (NOTE: NO API CALL)')}><i className="fa-solid fa-trash-can"></i></button> 
                                        <h5 className='float-sm-right mt-sm-2 text-primary'>Subtotal: {(products[product.productId-1].price * product.quantity).toFixed(2)}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                    <div className='d-flex justify-content-between mt-2'>
                        <h4 className='text-primary'>Gross Total: &#8377; {total.toFixed(2)}</h4>
                        <button className='btn btn-primary rounded'>Buy</button>
                    </div>
                </div>
            })}
            {(cartLoading || productsLoading) && <div><span className="spinner-border text-primary"></span> Loading...</div> }
        </div>
    </>
}

export default Cart