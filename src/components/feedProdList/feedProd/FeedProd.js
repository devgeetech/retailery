import React from 'react'
import classes from './FeedProd.module.scss'
import image from './image.png'

const FeedProd = (props) => {
    return(
        <div className={classes.feedProd}>
            <img src={props.imageSrc} alt={props.imgAlt} className={classes.img}/>
            <div className={classes.content}>
                <h2><strong>{props.name}</strong></h2>
                <p className={classes.cont}><i>{props.content}</i></p>
                <p><strong>{props.price}</strong></p>
            </div>
        </div>
    )
}
    


export default FeedProd