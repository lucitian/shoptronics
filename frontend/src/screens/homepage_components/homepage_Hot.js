import './css/homepage_Hot.css'
import Flickity from 'react-flickity-component'

const hotOptions = {
    setGallerySize: false,
    wrapAround: true,
    autoPlay: 5000,
    pauseAutoPlayOnHover: true,
}  

function HotCarousel(){
    return(
        <section className='carousel-hot'>
          <Flickity 
            className={'hot-carousel'}  
            options={hotOptions}
            elementType={'div'}
          > 
            <div className="hot-products" style={{backgroundImage: "url(images/hotsection/hot_PS5.png)"}}>
              <div className="overlay"></div>
              <div className="inner" alt="ps5-info">
                  <h3 className="subtitle">Slide 1</h3>
                  <h2 className="title">Sample Product</h2>
                  <a href="index.html" className="btn">Tell me more</a>
              </div>
            </div>

            <div className="hot-products" style={{backgroundImage: "url(images/hotsection/hot_xboxx.jpg)"}}>
              <div className="overlay"></div>
              <div className="inner" alt="xboxx-info">
                  <h3 className="subtitle">Slide 2</h3>
                  <h2 className="title">Sample Product</h2>
                  <a href="index.html" className="btn">Tell me more</a>
              </div>
            </div>
          </Flickity>
        </section>
    )
}

export default HotCarousel