import React, { useState, useEffect, Component } from 'react'
import { withRouter } from "react-router";

import { apiLink } from '../../../keys/keyStore'
import Auxil from '../../../hoc/Auxil/Auxil'
import classes from './WishL.module.css'
import FeedProd from '../../feedProdList/feedProd/FeedProd'
//import firebase from './node_modules/firebase'
import Spinner from '../../UI/Spinner/Spinner'
import firebase from 'firebase'
import Button from '../../UI/Button/Button'
import deleteIcon from '../../../assets/icons/deleteIcon.svg'



const WishL = (props) => {
    const [pComp,updComp]=useState((<Spinner/>))
    const [cmpList,upWComp]=useState([])
    const [wcList, upWcList]=useState([])
        let compList = []
        let indProdu = []
        const db = firebase.firestore();

        const showSpecProd = (proDet) =>{
            const queryPar = encodeURIComponent(proDet);
    
            props.history.push({
            pathname: "/ProdView",
            search: "?" + queryPar
            });
        }

        const delProd = (event, prId) => {
            // event.preventDefault();
            //console.log(prId)
            const srchRef = db.collection("customer").doc(props.userId).get()
            .then(snapshot => {
                let cpList = snapshot.data().wish
                //console.log(cpList)
                cpList.splice( cpList.indexOf(prId), 1 );
                //console.log(cpList)
                db.collection("customer").doc(props.userId).update({
                    wish: cpList
                })
                props.history.push({
                    pathname: "/wish"
                });
            })
            
        }

        useEffect(()=>{
            const graphqlUserQuery = {
                query: `
                    query {
                        userSrch(usId: "${props.userId}") {
                            wish
                        }
                    }
                `
            }
            fetch(apiLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(graphqlUserQuery)
            })
            .then(res => {
                return res.json();
            })
            .then(resData => {
                let usData = resData.data.userSrch
                console.log(usData.wish)
                if (usData.wish == null){
                    updComp(<p>No results</p>)
                }else{
                    usData.wish.forEach(prId => {
                        const graphqlPrQuery = {
                            query: `
                                query {
                                    prodSrch(prId: "${prId}") {
                                        id
                                        name
                                        content
                                        price
                                        imageSrc
                                        imgAlt
                                        isInStock
                                        sellerId
                                        custRatings
                                        ratingVals {
                                            noOfRating
                                            ratingValue
                                        }
                                    }
                                }
                            `
                        }
                        fetch(apiLink, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(graphqlPrQuery)
                        })
                        .then(res => {
                            return res.json();
                        })
                        .then(resData => {
                            let prData = resData.data.prodSrch
                            indProdu.push(prData)
                            updComp(indProdu.map(indProd => (
                                <Auxil key={indProd.id}>
                                    <div className={classes.FeedProd} onClick={event => showSpecProd(indProd.id)}>
                                    <FeedProd 
                                        name={indProd.name}
                                        content={indProd.content}
                                        price={indProd.price}
                                        imageSrc={indProd.imageSrc}
                                        imgAlt={indProd.imgAlt}
                                        styleClass={classes} />   
                                    </div>
                                    <div className={classes.deButton}>
                                        <Button clicked={event => delProd(event, indProd.id)}><img src={deleteIcon} className={classes.Home} alt= "alt" /></Button>
                                    </div>
                                </Auxil>
                            )))
                        })
                    })
                    
                }
            })
        },[])



            // const srchRef = db.collection("customer").doc(props.userId)
            // .onSnapshot(snapshot => {
            //     updComp(<Spinner/>)
            //     indProdu = []
            //     compList = snapshot.data().wish
            //     upWComp(compList)

            //     if(compList[0] == null){
            //         updComp(<p>No results</p>)
            //     }
            //     else{
            //         compList.forEach(prodId => {

            //          db.collection("products").doc(prodId).get()
            //             .then(snapshot => {
                            
            //                 indProdu.push(snapshot.data())
            //                 updComp(indProdu.map(indProd => (
            //                     <Auxil>
            //                         <div key={indProd.id} className={classes.FeedProd} onClick={event => showSpecProd(indProd.id)}>
            //                         <FeedProd 
            //                             name={indProd.name}
            //                             content={indProd.content}
            //                             price={indProd.price}
            //                             imageSrc={indProd.imageSrc}
            //                             imgAlt={indProd.imgAlt}
            //                             styleClass={classes} />   
            //                         </div>
            //                         <div className={classes.deButton}>
            //                             <Button clicked={event => delProd(event, indProd.id)}><img src={deleteIcon} className={classes.Home} alt= "alt" /></Button>
            //                         </div>
            //                     </Auxil>
            //                 )))
            //             })          
            //         })
            //     }
            // })

        
        return(
            <Auxil>
                <div>
                    {pComp}
                </div>
            </Auxil>
        )
}

export default withRouter(WishL)