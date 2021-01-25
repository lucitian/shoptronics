import './css/homepage_HotProd.css'

function HotProd(){
    return(
        <section className='block-hot-products'>
            <div className='block-hot-products-container1'>
                <div className='block-hot-products-cell1'>
                    <a href="/playstation" className="block-hot-products-promo">   
                        <div className="block-hot-products-promo-image">
                            <img src='images/Block-section/PS5-PS4.jpg' alt=""/>
                        </div>
                    </a>
                    <div className="block-hot-products-promo-text1">
                        <h2 id="PS5-text">PlayStation</h2>
                        <a className="block-promo-btn" href="/playstation">Shop Now</a>
                    </div>
                </div>
                <div className='block-hot-products-cell2'>
                    <a href="index.html" className="block-hot-products-promo">   
                        <div className="block-hot-products-promo-image">
                            <img src='images/Block-section/Xbox_X.jpg' alt=""/>
                        </div>
                    </a>
                    <div className="block-hot-products-promo-text1">
                        <h2 id="Xbox-text">Xbox</h2>
                        <a className="block-promo-btn" href="index.html">Shop Now</a>
                    </div>
                </div>
            </div>

            <div className='block-hot-products-container2'>
                <div className='block-hot-products-cell3'>
                    <a href="index.html" className="block-hot-products-promo">   
                        <div className="block-hot-products-promo-image">
                            <img src='images/Block-section/Nintendo_Switch.jpg' alt=""/>
                        </div>
                    </a>
                    <div className="block-hot-products-promo-text2">
                        <h2 id="Nintendo-text">Nintendo</h2>
                        <a className="block-promo-btn" href="index.html">Shop Now</a>
                    </div>
                </div>
                <div className='block-hot-products-cell4'>
                    <a href="index.html" className="block-hot-products-promo">   
                        <div className="block-hot-products-promo-image">
                            <img src='images/Block-section/All_Consoles.jpg' alt=""/>
                        </div>
                    </a>
                    <div className="block-hot-products-promo-text2">
                        <h2 id="All_Consoles-text">Accessories</h2>
                        <a className="block-promo-btn" href="index.html">Shop Now</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HotProd