import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getCategoryList } from '../actions/productActions';
import Rating from 'react-rating';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';

const ProductsList = () => {
    const [productList, setProductList] = useState();
    const [searchString, setSearchString] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSort, setSelectedSort] = useState('asc');
    const history = useHistory();
    const dispatch = useDispatch();
    const { productsLoading, products, productsError} = useSelector(state=> state.productsList);
    const { categoriesLoading, categories, categoriesError} = useSelector(state=> state.categories);
    useEffect(()=>{
        dispatch(getAllProducts());
        dispatch(getCategoryList());
    },[]);

    useEffect(()=>{
        if(productsLoading === false && products.length > 0){
            setProductList(products);
        }
    },[productsLoading]);

    useEffect(()=>{
        if(productsLoading === false && products.length > 0 && (!searchString)){
            setProductList(products);
        }
    },[selectedCategory, searchString]);

    useEffect(()=>{
        if(productList){
            if(selectedSort === 'asc' && productList[0].id !== 1){
                setProductList(()=>{
                    let temp = [...productList];
                    temp.reverse();
                    return temp;
                })
            }
            if(selectedSort === 'desc' && productList[0].id === 1){
                setProductList((current)=>{
                    let temp = [...current];
                    temp.reverse();
                    return temp;
                })
            }
        }
    },[selectedSort]);

    const filteredProducts = () => {
        let query = searchString.toLowerCase(); 
        let result = products.filter((elem) => {
            if (
            elem.title.toLowerCase().includes(query) ||
            elem.category.toLowerCase().includes(query)
            ) {
            return elem
            }
        });
        setProductList(result);
    }
    
    return <>
        <Header/>
        <div className='container-fluid'>
            <div className="input-group mb-3 search-bar mx-auto">
                <input type="text" className="form-control" placeholder="Search" value={searchString} onChange={e => setSearchString(e.target.value)}/>
                <div className="input-group-append">
                    <button className="btn btn-danger" type="button" onClick={e=> {setSearchString(''); setSelectedSort('asc'); setProductList(products)}}><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={e=> filteredProducts()}>Search</button>
                </div>
            </div>
            <div className='d-flex justify-content-between'>
                <div>
                    <label htmlFor="category">Category: </label>
                    <select className='ml-1' id="category" name="category" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="all">All products</option>
                        {categoriesLoading == false && categories && categories.map((elem)=>{
                            return <option value={elem} key={elem}>{elem.charAt(0).toUpperCase() + elem.slice(1)}</option>
                            })
                        }
                    </select>
                </div>
                <div className='ml-auto'>
                    <label htmlFor="sort">Sort: </label>
                    <select className='ml-1' id="sort" name="sort" value={selectedSort} onChange={e => setSelectedSort(e.target.value)}>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                { productsLoading === false && productList ? 
                    productList.map((elem)=> selectedCategory === 'all' || elem.category === selectedCategory ?
                        <div className="card product-card m-3 p-1" key={elem.id} onClick={e=> history.push({
                                pathname: '/product-details',
                                state: { data: elem }
                            })}>
                            <img className="card-img-top" src={elem.image} alt="Card image"/>
                            <div className="card-body position-relative">
                                <h5 className="card-title text-truncate text-truncate--3">{elem.title}</h5>
                                <div className='position-absolute' style={{bottom: 10 + 'px'}}>
                                    <div className='rating'>
                                        <Rating
                                            emptySymbol="fa fa-star-o fa-2x"
                                            fullSymbol="fa fa-star fa-2x"
                                            initialRating={elem.rating.rate}
                                            readonly
                                        />
                                    </div>
                                    <div className=' mt-3'><h5 className='text-primary'>&#8377; {elem.price}</h5></div>
                                </div>
                            </div>
                        </div> : null
                    ) : <div><span className="spinner-border text-primary"></span> Loading...</div>
                }
                { productsLoading === false && productList && productList.length === 0 && <h4>No Product found</h4> }
            </div>
        </div>
    </>
}

export default ProductsList