import { BrowserRouter, Route } from 'react-router-dom' 

import HotCarousel from './homepage_components/homepage_Hot'
import HotPicks from './homepage_components/homepage_HotPicks'
import HotProd from './homepage_components/homepage_HotProd'

function Homepage() {
    return (
        <BrowserRouter>
            <Route path="/" component={HotCarousel}exact ></Route> 
            <Route path="/" component={HotPicks}exact ></Route> 
            <Route path="/" component={HotProd}exact ></Route> 

        </BrowserRouter>
    )
}

export default Homepage