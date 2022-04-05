import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getCategoryList, getProductsByCate } from '../actions/productActions';
import Header from '../components/Header';
import ReactPaginate from 'react-paginate';
import ProductComponent from '../components/ProductComponent';

const PER_PAGE = 8;

const ProductsList = () => {
    const [productList, setProductList] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchString, setSearchString] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSort, setSelectedSort] = useState('asc');
    const ALL_PRODUCTS =  useRef([]);

    const dispatch = useDispatch();

    const { productsLoading, products } = useSelector(state=> state.productsList);
    const { categoriesLoading, categories } = useSelector(state=> state.categories);

    useEffect(()=>{
        if(products.length === 0){
            dispatch(getAllProducts());
        }
        if(categories.length === 0){
            dispatch(getCategoryList());
        }
    },[]);

    useEffect(()=>{
        if(productsLoading === false && products.length > 0){
            setProductList(products);
            if(selectedCategory === 'all'){
                ALL_PRODUCTS.current = products;
            }
        }
    },[productsLoading, products]);

    useEffect(()=>{
        setSelectedSort('asc')
        if(selectedCategory !== 'all'){
            dispatch(getProductsByCate(selectedCategory));
        }else{
            dispatch(getAllProducts());
        }
    },[selectedCategory]);

    useEffect(()=>{
        if(productList){
            if(selectedSort === 'asc' && productList[0].id > productList[productList.length-1].id){
                setProductList(()=>{
                    let temp = [...productList];
                    temp.reverse();
                    return temp;
                })
            }
            if(selectedSort === 'desc' && productList[0].id < productList[productList.length-1].id){
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
        let result = ALL_PRODUCTS.filter((elem) => {
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
                    <button className="btn btn-danger" type="button" onClick={e=> {setSearchString(''); setSelectedSort('asc'); setProductList(ALL_PRODUCTS); setSelectedCategory('all')}}><i className="fa-solid fa-xmark"></i></button>
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
                        {categoriesLoading === false && categories && categories.map((elem)=>{
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
            { productsLoading === false && productList ? 
                <>
                    <div className="d-flex flex-wrap justify-content-center">
                        { productList.slice(currentPage * PER_PAGE, currentPage * PER_PAGE + PER_PAGE).map((elem)=> <ProductComponent product={elem} key={elem.id}/> 
                        )} 
                    </div>
                    <div className='d-flex justify-content-center'> 
                        <ReactPaginate
                            previouslabel = "Prev"
                            nextLabel = "Next"
                            pageCount = {Math.ceil(productList.length / PER_PAGE)}
                            onPageChange = {({selected : selectedPage}) => setCurrentPage(selectedPage)}
                            containerClassName="list-unstyled list-group list-group-horizontal mb-3"
                            pageLinkClassName="btn"
                            previousLinkClassName="btn btn-primary"
                            nextLinkClassName="btn btn-primary"
                            activeClassName="border"
                        />
                    </div>
                </> : <div className="text-center">
                    <span className="spinner-border text-primary"></span> Loading...
                </div>
            }
            { productsLoading === false && productList && productList.length === 0 && <div className="text-center"><h4>No Product found</h4></div> }
        </div>
    </>
}

export default ProductsList