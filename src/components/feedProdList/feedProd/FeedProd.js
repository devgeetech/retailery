import React from 'react'
import classes from './FeedProd.module.css'

const FeedProd = (props) => {
    console.log(props.content)
    return(
        <div className={classes.feedProd}>
            <img src={props.imageSrc} alt={props.imgAlt} className={classes.img}/>
            <h2><strong>{props.name}</strong></h2>
            <p className={classes.cont}><i>{props.content}</i></p>
            <p><strong>{props.price}</strong></p>
            {/* <p>Ingredients : {ingredientOutput}</p>
            <p>Price : <strong>USD {(props.price).toFixed(2)}</strong></p> */}
        </div>
    )
}
    


export default FeedProd