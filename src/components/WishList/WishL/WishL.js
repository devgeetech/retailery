import React, { useState, useEffect, Component } from 'react'
import { withRouter } from "react-router";

import Auxil from '../../../hoc/Auxil/Auxil'
import classes from './WishL.module.css'
import FeedProd from '../../feedProdList/feedProd/FeedProd'
//import firebase from './node_modules/firebase'
import Spinner from '../../UI/Spinner/Spinner'
import firebase from 'firebase'



const WishL = (props) => {
    const [pComp,updComp]=useState((<Spinner/>))
    const [cmpList,upWComp]=useState([])
        let compList = []
        const indProdu = []
        const db = firebase.firestore();

        const showSpecProd = (proDet) =>{
            console.log("clicked")
            console.log(proDet)
            const queryPar = encodeURIComponent(proDet);
    
            props.history.push({
            pathname: "/ProdView",
            search: "?" + queryPar
            });
        }

        useEffect(()=>{
            const srchRef = db.collection("customer").doc(props.userId)
            srchRef.onSnapshot(snapshot => {
                compList = snapshot.data().wish
                upWComp(compList)

                if(compList[0] == null){
                    updComp(<p>No results</p>)
                }
                else{
                    compList.forEach(prodId => {

                     db.collection("products").doc(prodId).get()
                        .then(snapshot => {
                            
                            indProdu.push(snapshot.data())
                            updComp(indProdu.map(indProd => (
                                <div key={indProd.id} className={classes.FeedProd} onClick={event => showSpecProd(indProd.id)}>
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
            })
        },[])
        
        return(
            <Auxil>
                <div>
                    {pComp}
                </div>
            </Auxil>
        )
}

export default withRouter(WishL)