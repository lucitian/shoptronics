import './css/homepage_HotPicks.css'
import Flickity from 'react-flickity-component'

const hotpicksOption = {
  contain: true,
  draggable: false,
  freeScroll: false,
  groupCells: 6,
}

function HotPicks(){
    return(
        <section className="carousel-hotpicks">
          <div className="hotpicks-title">
            <h2 className="hotpicks-title-text">Hot Picks</h2>
          </div>
          <Flickity
            className={'hotpicks-carousel'}
            options={hotpicksOption}
            elementType={'div'}
          >
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Cyberpunk_2077.jpg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Spider-Man_Miles_Morales.jpeg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Sakuna.jpg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Minecraft.jpg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Demons_Souls.jpg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Fall_Guys.jpg" alt="product"/>
            </div>

            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/AC_Valhalla.jpg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Godfall.jpg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Watch_Dogs_Legion.jpg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Doom_Eternal.jpg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/NBA_2k21.jpg" alt="product"/>
            </div>
            <div className="hotpicks-cell">
              <img className="hotpicks-cell-image" src="images/hotpicksection/Ghost_of_Tsushima.jpg" alt="product"/>
            </div>
          </Flickity>
        </section>
    )
}

export default HotPicks