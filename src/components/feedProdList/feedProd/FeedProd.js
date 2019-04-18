import React from 'react'
import classes from './FeedProd.module.scss'
import image from './image.png'

const FeedProd = (props) => {
    return(
        <div className={classes.feedProd}>
            <img src={props.imageSrc} alt={props.imgAlt} className={classes.img}/>
           
             {/* <svg height="10" width="450"> */}
            
                {/*   */}
                
            {/* </svg> */}
          
            {/* <div className={classes.svg2}>
             <svg height="210" width="500">
                <line x1="60" y1="-100" x2="300" y2="0" />
            </svg>
            </div> */}

           
            <div className={classes.content}>
            <img src={image}  className={classes.svg1}/>
            <h2><strong>{props.name}</strong></h2>
            <p className={classes.cont}><i>{props.content}</i></p>
            <p><strong>{props.price}</strong></p>
            {/* <p>Ingredients : {ingredientOutput}</p>
            <p>Price : <strong>USD {(props.price).toFixed(2)}</strong></p> */}
            </div>
        </div>
    )
}
    


export default FeedProd