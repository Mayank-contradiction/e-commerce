import React, { useState } from 'react';
import Rating from 'react-rating';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';

const ProductDetails = (props) => {
    const [numOfItem , setNumOfItem] = useState(1);
    const history = useHistory();
    
    return <>
        <Header/>
        <div className='container-fluid'>
            {props.location.state.data && <>
                <div className="row">
                    <div className="col-12 col-sm-6 text-center">
                        <img src={props.location.state.data.image} className='image mb-3 mb-sm-0' alt='product image'/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h4>{props.location.state.data.title}</h4>
                        <p>Category: {props.location.state.data.category}</p>
                        <hr/>
                        <div className='rating'>
                            <Rating
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                initialRating={props.location.state.data.rating.rate}
                                readonly
                            />
                        </div>
                        <p>({props.location.state.data.rating.count} reviews)</p>
                        <hr/>
                        <div className=' mt-3'>
                            <h5 className='text-primary'>&#8377; {props.location.state.data.price}</h5>
                        </div>
                        <hr/>
                        <div>
                            <button className='btn btn-dark' onClick={e=> {numOfItem !== 1 && setNumOfItem((current)=>current-1)}}>-</button> 
                            <span className='mx-2'>{numOfItem}</span> 
                            <button className='btn btn-dark' onClick={e=> setNumOfItem((current)=>current+1)}>+</button> 
                            <button className='btn btn-primary rounded' onClick={e=> alert('Product added to cart successfully!(NOTE: NO API CALL.)')}>Add to cart</button>
                        </div>
                        <hr/>
                        <h5>Satus: <span className='text-success'>InStock</span></h5>
                        <hr/>
                        <h4>Description:</h4>
                        <p>{props.location.state.data.description}</p>
                    </div>
                </div>
                <div className='text-center mt-3'>
                    <button onClick={e=> history.goBack()} className='btn btn-primary rounded mb-3'>Back to product list</button>
                </div>
                </>
            }
        </div>
    </>
}

export default ProductDetails