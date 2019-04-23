import React, { useState, useEffect, Component } from 'react'

import Auxil from '../../../hoc/Auxil/Auxil'
import classes from './WishL.module.css'
import FeedProd from '../../feedProdList/feedProd/FeedProd'
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
                                <div key={indProd.id} className={classes.FeedProd}>
                                    <FeedProd 
                                        name={indProd.name}
                                        content={indProd.content}
                                        price={indProd.price}
                                        imageSrc={indProd.imageSrc}
                                        imgAlt={indProd.imgAlt}
                                        styleClass={classes}/>
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