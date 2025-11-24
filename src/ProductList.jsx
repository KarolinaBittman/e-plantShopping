import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();

    // Redux store: Get cart items
    const cartItems = useSelector(state => state.cart.items);

    // Calculate cart quantity in icon
    const calculateTotalQuantity = () => {
        return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    };

    // PLANT DATA: Copy/paste or edit freely!
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2012/03/01/00/30/flower-19699_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18"
                }
            ]
        },
        {
            category: "Tropical Plants",
            plants: [
                {
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2016/03/05/20/07/rubber-plant-1233092_1280.jpg",
                    description: "Large glossy leaves, easy to grow indoors.",
                    cost: "$20"
                },
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2017/06/02/18/24/aloe-vera-2366346_1280.jpg",
                    description: "Medicinal sap, purifies air, easy maintenance.",
                    cost: "$10"
                }
            ]
        }
    ];

    // Simple navbar styles
    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    // Navbar event handlers
    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };
    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    // ADD TO CART
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prev) => ({
            ...prev,
            [plant.name]: true,
        }));
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" style={{ height: "60px" }} />
                        <a href="/" onClick={handleHomeClick}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div>
                        <a href="#" style={styleA}>Plants</a>
                    </div>
                    <div style={{position: 'relative'}}>
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <h1 className='cart' style={{margin:0, position:'relative'}}>
                                {/* You can put a cart SVG here if needed */}
                                <span className="cart-count" style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-25px',
                                    background: '#f44336',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '2px 8px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                }}>
                                    {calculateTotalQuantity()}
                                </span>
                                🛒
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
            {
                !showCart ? (
                    <div className="product-grid">
                        {plantsArray.map((category, idx) => (
                            <div key={idx} style={{marginBottom:'40px'}}>
                                <h1>
                                    <div>{category.category}</div>
                                </h1>
                                <div className="product-list" style={{display:'flex', flexWrap:'wrap', gap:'30px'}}>
                                    {category.plants.map((plant, pIdx) => (
                                        <div className="product-card" key={pIdx} style={{
                                            border: '1px solid #cfcfcf', borderRadius:'8px', padding:'20px', minWidth:'200px', textAlign:'center', background:'white'
                                        }}>
                                            <img className="product-image" src={plant.image} alt={plant.name} style={{width: "120px", height:"120px", objectFit:"cover", borderRadius:'8px'}} />
                                            <div className="product-title" style={{fontWeight:'bold', fontSize:'18px', marginTop:'10px'}}>{plant.name}</div>
                                            <div className="product-description" style={{margin:'10px 0'}}>{plant.description}</div>
                                            <div className="product-cost" style={{fontWeight:'bold', color:'#388e3c'}}>{plant.cost}</div>
                                            <button
                                                className="product-button"
                                                style={{
                                                    marginTop:'10px', background:'#4CAF50', color:'white', border:'none', padding:'8px 16px', borderRadius:'4px', cursor:'pointer'
                                                }}
                                                disabled={!!addedToCart[plant.name]}
                                                onClick={() => handleAddToCart(plant)}
                                            >
                                                {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <CartItem onContinueShopping={handleContinueShopping} />
                )
            }
        </div>
    );
}

export default ProductList;
