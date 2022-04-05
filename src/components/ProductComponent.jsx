import React from 'react'
import Rating from 'react-rating';
import { useHistory } from 'react-router-dom';

const ProductComponent = ({product}) => {
    const history = useHistory();
    return (
        <div className="card product-card m-3 p-1" onClick={e=> history.push({
                pathname: '/product-details',
                state: { data: product }
            })}>
            <img className="card-img-top" src={product.image} alt="Card image"/>
            <div className="card-body position-relative">
                <h5 className="card-title text-truncate text-truncate--3">{product.title}</h5>
                <div className='position-absolute' style={{bottom: 10 + 'px'}}>
                    <div className='rating'>
                        <Rating
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            initialRating={product.rating.rate}
                            readonly
                        />
                    </div>
                    <div className=' mt-3'><h5 className='text-primary'>&#8377; {product.price}</h5></div>
                </div>
            </div>
        </div> 
    )
}

export default ProductComponent
