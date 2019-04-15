import React, { useState, useEffect } from 'react'

import Auxil from '../../hoc/Auxil/Auxil'
import FeedProd from './feedProd/FeedProd'

//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
//import axios from '../../axios-orders'


const FeedProdList = () => {

    const iniList = [
        {
            id: 1,
            name:"iPhone XS", 
            content:"Super Retina. In big and bigger.",
            price:"$1500",
            imageSrc:"http://d176tvmxv7v9ww.cloudfront.net/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone-xs-space-select-2018_av2_1_1.jpg",
            imgAlt:"iPhone XS image"
        },
        {
            id: 2,
            name:"Samsung S10+", 
            content:"The phone that doesn’t just stand out, it stands apart",
            price:"$1800",
            imageSrc:"https://drop.ndtv.com/albums/GADGETS/samsung-galaxy-s10plus/galaxys10plusgallerycover_640x480.jpg",
            imgAlt:"Samsung S10+ image"
        }
    ]

    const [prodList, prodUpdt] = useState(iniList)
    console.log(prodList)
    return(
        <Auxil>
            <div>
                {prodList.map(indProd => (
                    <div key={indProd.id}>
                    <FeedProd 
                        name={indProd.name}
                        content={indProd.content}
                        price={indProd.price}
                        imageSrc={indProd.imageSrc}
                        imgAlt={indProd.imgAlt}
                        />
                    </div>
                ))}
            </div>
        </Auxil>
    )
}

export default FeedProdList;