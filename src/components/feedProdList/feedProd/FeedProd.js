import React from 'react'
import classes from './FeedProd.module.scss'
import image from './star.png'

const FeedProd = (props) => {
    return(
        <div className={classes.feedProd}>
            <img src={props.imageSrc} alt={props.imgAlt} className={classes.img}/>
            <div className={classes.content}>
                <h2><strong>{props.name}</strong></h2>
                <p className={classes.cont}><i>{props.content}</i></p>
                <p><strong>{props.price}</strong></p>
                <img src={image} className={classes.rating} />
                
                {/* <a href="tel:+919645171179">Call</a> */}
            </div>
        </div>
    )
}
    


export default FeedProd