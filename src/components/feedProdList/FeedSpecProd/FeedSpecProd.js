import React, { useState, useEffect } from 'react'

import Auxil from '../../../hoc/Auxil/Auxil'
import FeedProd from '../feedProd/FeedProd'
import classes from '../FeedProdList.module.css'
//import firebase from './node_modules/firebase'
import Spinner from '../../UI/Spinner/Spinner'
import firebase from 'firebase'

const FeedSpecProd = (props) => {

    const [pComp,updComp]=useState((<Spinner/>))
    const [queryPar, chngQ]=useState(null)

    const query = new URLSearchParams(props.location.search)
    chngQ(query)
        let queryLis = []
        for(let param of query.entries()){
            queryLis.push(param)
        }
    const compList = []



    useEffect(()=>{
        
        const rootRef = firebase.database().ref()
        const srchRef = rootRef.child('Products').orderByChild('name').equalTo(queryLis[0][0])
            
        srchRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                compList.push(childData)
                });
                updComp(compList.map(indProd => (
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
        })  
    },[queryPar])
    
     
    return(
        <Auxil>
            <div className={classes.FeedProdList}>
                {pComp}
            </div>
        </Auxil>
    )
}

export default FeedSpecProd