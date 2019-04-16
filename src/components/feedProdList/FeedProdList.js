import React, { useState, useEffect } from 'react'

import Auxil from '../../hoc/Auxil/Auxil'
import FeedProd from './feedProd/FeedProd'
import classes from './FeedProdList.module.css'
import firebase from 'firebase'
import Spinner from '../UI/Spinner/Spinner'

const FeedProdList = () => {
    let fetchedProd = []
    const [prodList, prodUpdt] = useState(fetchedProd)
    const [pComp,updComp]=useState((<Spinner/>))

    useEffect(()=>{
        firebase.database().ref('Products/').once('value').then(
            function(snapshot) {
                const v=snapshot.val()
                console.log(snapshot.val())
    
                for(let indProd in v){
                    fetchedProd.push({
                        ...v[indProd],
                        id: indProd
                    })
                }
                prodUpdt(fetchedProd)
                updComp(prodList.map(indProd => (
                    <div key={indProd.id}>
                    <FeedProd 
                        name={indProd.name}
                        content={indProd.content}
                        price={indProd.price}
                        imageSrc={indProd.imageSrc}
                        imgAlt={indProd.imgAlt}
                        />
                    </div>
                )))
            }
        )     
    },[])

    return(
        <Auxil>
            <div className={classes.FeedProdList}>
                {pComp}
            </div>
        </Auxil>
    )
}

export default FeedProdList;