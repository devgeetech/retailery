import React, { useState, useEffect, Component } from 'react'

import Auxil from '../../../hoc/Auxil/Auxil'
import classes from './WishL.module.scss'
import FeedProd from '../../feedProdList/feedProd/FeedProd.js'
//import firebase from './node_modules/firebase'
import Spinner from '../../UI/Spinner/Spinner'
import firebase from 'firebase'


const WishL = (props) => {
    const [pComp,updComp]=useState((<Spinner/>))
    const [compList,upWComp]=useState([])
        let cmpList = []
        const indProdu = []
        const db = firebase.firestore();

        useEffect(()=>{
            const srchRef = db.collection("customer").doc(props.userId)
            srchRef.onSnapshot(snapshot => {
                cmpList = snapshot.data().wish
                upWComp(cmpList)
            }) 
        },[])

        useEffect(()=>{
            if(compList[0] == null){
                updComp(<p>No results</p>)
            }
            else{
                compList.forEach(prodId => {
                    db.collection("products").doc(prodId).get()
                        .then(snapshot => {
                            indProdu.push(snapshot.data())
                            updComp(indProdu.map(indProd => (
                                <div key={indProd.id} className={classes.WishList}>
                               
                                <div className={classes.WfeedProd}>
                                 <img src={props.imageSrc} alt={props.imgAlt} className={classes.Wimg}/>
                                <div className={classes.contents}>
                                 <h2><strong>{props.name}</strong></h2>
                                 <p className={classes.cont}><i>{props.content}</i></p>
                                 <p><strong>{props.price}</strong></p>
                                 </div>
                                 </div>
                                 </div>
                            )))
                        })        
                })
                
            }
        },[pComp])

        return(
            <Auxil>
                <div>
                    {pComp}
                </div>
            </Auxil>
        )
}

export default WishL