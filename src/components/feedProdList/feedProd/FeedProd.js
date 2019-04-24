import React from 'react'
import classes from './FeedProd.module.scss'
import image from './star.png'

const FeedProd = (props) => {
    return(
        <div className={classes.feedProd}>
            <img src={props.imageSrc} alt={props.imgAlt} className={classes.img}/>
            <div className={classes.content}>
            <div className={classes.edit}>
                <h2><strong>{props.name}</strong></h2>
                <div className={classes.price}>
                <p><strong>{props.price}</strong></p></div>
                </div>
                <div className={classes.cont}>
                <img src={image} className={classes.rating} />
                <p><i>{props.content}</i></p>
               </div>
               
                
                {/* <a href="tel:+919645171179">Call</a> */}
            </div>
        </div>
    )
}
    


export default FeedProd