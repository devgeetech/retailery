import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router";
import classes from './ProdSingleView.module.scss'
import firebase from 'firebase'
import StarRatings from 'react-star-ratings';
import Spinner from '../../UI/Spinner/Spinner'
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import phone from '../../../assets/icons/phone.svg'
import heartIcon from '../../../assets/icons/heart.svg'
import mapIcon from '../../../assets/icons/mapIcon.svg'
//import console = require('console');

const ProdSingleView = (props) => {
    const [ratVal, upRatVal] = useState(0)
    let usrLat = 9.318226
    let usrLng = 76.613996
    const [prodComp, updProd] = useState(<Spinner />)
    const [contInfo, updCont] = useState(<Spinner />)
    let rating = null 
    let starVal = 0

    const changeRating = (event) =>{
        starVal = event
    }

    const ratSubmit = (event) => {
        console.log(props.userId)
        console.log(props.prodId)
        console.log(starVal)
        // const ratgq = {
        //     query: `
        //         mutation: {
        //             updRating(ratingDat: {usId: "${props.userId}",prId: "${props.prodId}", starVal: "${starVal}"})
        //         }
        //     `
        // }
        const ratgq = {
            query: `
                mutation: {
                    updRating(ratingDat: {usId: "1EiNJXZrM2e0zznFRKzqJccCMH82",prId: "1Fa3b8MJkGVZ0KkwhE2Q", starVal: 3})
                }
            `
        }
        fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratgq)
        })
        .then(res => {
            console.log(res)
            return res.json();
        })
        // const ratMain = db.collection('products')
        // const ratSet = db.collection('products').doc(props.prodId)
        //     const ratRef = db.collection('products').doc(props.prodId).get()
        //     .then(snpshot => {
        //         const snapshot = snpshot.data()
        //         snapshot.custRatings.push(props.userId)
        //         let ratVals = ((((snapshot.ratingVals.noOfRating)*(snapshot.ratingVals.ratingValue)) + starVal)/(snapshot.ratingVals.noOfRating + 1))
        //         const setRat = ratSet.update({
        //             custRatings : snapshot.custRatings,
        //             ratingVals : {
        //                 noOfRating : (snapshot.ratingVals.noOfRating + 1),
        //                 ratingValue : ratVals
        //             }
        //         })
        //         window.location.reload();
        //     })
    }

    const addWishList = () => {
        console.log("Added to wishlist")
        // let fullDat = null
        // let boot = 0;
        // if(props.userId!==null){
        //     const addWish = db.collection("customer")
        //     const addWshRef = db.collection("customer").doc(props.userId).get()
        //     .then(snapshot => {
        //         fullDat = snapshot.data()
        //         const oldWishList = fullDat.wish
        //         oldWishList.map(wishIt => {
        //             if (wishIt === props.prodId){
        //                 boot = 1
        //             }
        //         })
        //         if(!boot){
        //             oldWishList.push(props.prodId)
        //             addWish.doc(props.userId).update({
        //                 wish: oldWishList
        //             })
        //         }
        //     })
        // }
    }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position => {
            usrLat = (position.coords.latitude)
            usrLng = (position.coords.longitude)
        })
        const graphqlQuery = {
            query: `
                query {
                    prodSrch(prId: "${props.prodId}") {
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
        fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            let proData=resData.data.prodSrch
            if(props.userId){
                const bootChk = proData.custRatings.includes(props.userId)
                if(!bootChk){
                    rating=(
                        <div>
                            <p>Rate this Product :</p>
                            <StarRatings
                            rating={ratVal}
                            starRatedColor="blue"
                            changeRating={event => changeRating(event)}
                            numberOfStars={5}
                            name='ProdRating'
                            starDimension="20px"
                            starSpacing="7px"/>
                            <Button onClick={event => ratSubmit(event)}>Submit</Button>
                        </div>)
                }else{
                    rating = null
                }
            }   
            updProd(<div className={classes.ProdSingleView}>
                        <img src={proData.imageSrc} alt={proData.imgAlt} className={classes.img}/>
                            <div className={classes.content}>
                                <h2><strong>{proData.brand}{" "}{proData.name}</strong></h2>
                                <p>Rating: {(proData.ratingVals.ratingValue).toFixed(1)}</p>
                                <p className={classes.cont}><i>{proData.content}</i></p>
                                <p><strong>{proData.price}</strong></p>
                                <p>{proData.isInStock===0? "Out of stock": "In stock"}</p>
                            </div>
                            {rating}
                    </div>)
            return proData.sellerId;
        })
        .then(sId =>{
            const shopQuery= {
                query: `
                    query {
                        shopSrch(shId: "${sId}") {
                            name
                            loc {
                              lat
                              lng
                            }
                            phone
                          }
                    }
                `
            }

            fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shopQuery)
            })
            .then(res => {
                return res.json();
            })
            .then(resData => {
                let shopData=resData.data.shopSrch
                const sellerName = shopData.name
                const telPhone = "tel:"+shopData.phone
                const srchParam = {
                    origin: usrLat+","+usrLng,
                    destination: shopData.loc.lat+","+shopData.loc.lng
                }

                const url = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBSS-C2AaaEAxXFJXGvwb7xL9MFcjuButE&origin="+srchParam.origin+"&destination="+srchParam.destination
                //console.log(usrLat)
                
                updCont(
                    <div className={classes.page}>
                        <p>Seller : <strong>{sellerName}</strong></p>
                        <div className={classes.navIcons}>
                        <div className={classes.wish}>
                            <Fab variant="extended" aria-label="Delete" className={classes.fab} >
                                <img src={heartIcon} alt="phoneIcon" className={classes.phoneIcon} onClick={addWishList}/>
                            </Fab>
                            </div>
                            <div className={classes.wish}>
                            <a href={telPhone}>
                            <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                                    <img src={phone} alt="phoneIcon" className={classes.phoneIcon}/>
                                </Fab>     
                            </a>
                            </div>
                            
                            <div className={classes.wish}>
                            <a href = {url} target="_blank" >
                            
                                <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                                    <img src={mapIcon} alt="phoneIcon" className={classes.phoneIcon}/>
                                </Fab>
                                
                            </a>
                            </div>
                        </div>
                    </div>
                )

            })
        })

        // const srchRef = db.collection("products").doc(props.prodId).get()
        // .then(snapshot => {
        //     const proData = snapshot.data()
        //     viewCount = proData.views + 1
        //     db.collection("products").doc(props.prodId).update({views:viewCount});
        //     upDat(proData)
        //     if(props.userId){
        //         // rat = ratSrch.where("id","==",props.prodId).where("custRatings", "array-contains", props.userId)
        //         // rat.onSnapshot(snsh => {
        //         //         const ratsnp = snsh.data()
        //         //         console.log(ratsnp)
        //         //     }) 

        //         const bootChk = proData.custRatings.includes(props.userId)

        //         if(!bootChk){
        //             rating=(
        //                     <div>
        //                         <p>Rate this Product :</p>
        //                         <StarRatings
        //                         rating={ratVal}
        //                         starRatedColor="blue"
        //                         changeRating={event => changeRating(event)}
        //                         numberOfStars={5}
        //                         name='ProdRating'
        //                         starDimension="20px"
        //                         starSpacing="7px"/>
        //                         <Button onClick={event => ratSubmit(event)}>Submit</Button>
        //                     </div>)
        //         }else{
        //             rating = null
        //         }
                     
        //     }
        //     updProd(<div className={classes.ProdSingleView}>
        //                 <img src={proData.imageSrc} alt={proData.imgAlt} className={classes.img}/>
        //                 <div className={classes.content}>
        //                     <h2><strong>{proData.brand}{" "}{proData.name}</strong></h2>
        //                     <p>Rating: {(proData.ratingVals.ratingValue).toFixed(1)}</p>
        //                     <p className={classes.cont}><i>{proData.content}</i></p>
        //                     <p><strong>{proData.price}</strong></p>
        //                     <p>{proData.isInStock===0? "Out of stock": "In stock"}</p>
        //                 </div>
        //                 {rating}

        //             </div>)
        //     const shopRef = db.collection("shop").doc(proData.sellerId).get()
        //         .then(snapshot => {
        //             const shopData = snapshot.data()
        //             const sellerName = snapshot.data().name
        //             const telPhone = "tel:"+shopData.phone
                    
        //             const srchParam = {
        //                 origin: usrLat+","+usrLng,
        //                 destination: shopData.loc.lat+","+shopData.loc.lng
        //             }

        //             const url = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBSS-C2AaaEAxXFJXGvwb7xL9MFcjuButE&origin="+srchParam.origin+"&destination="+srchParam.destination
        //             console.log(usrLat)
                    
        //             updCont(
        //                 <div className={classes.page}>
        //                     <p>Seller : <strong>{sellerName}</strong></p>
        //                     <div className={classes.navIcons}>
        //                     <div className={classes.wish}>
        //                         <Fab variant="extended" aria-label="Delete" className={classes.fab} >
        //                             <img src={heartIcon} alt="phoneIcon" className={classes.phoneIcon} onClick={addWishList}/>
        //                         </Fab>
        //                         </div>
        //                         <div className={classes.wish}>
        //                         <a href={telPhone}>
        //                         <Fab variant="extended" aria-label="Delete" className={classes.fab}>
        //                                 <img src={phone} alt="phoneIcon" className={classes.phoneIcon}/>
        //                             </Fab>     
        //                         </a>
        //                         </div>
                                
        //                         <div className={classes.wish}>
        //                         <a href = {url} target="_blank" >
                              
        //                             <Fab variant="extended" aria-label="Delete" className={classes.fab}>
        //                                 <img src={mapIcon} alt="phoneIcon" className={classes.phoneIcon}/>
        //                             </Fab>
                                    
        //                         </a>
        //                        </div>
        //                     </div>
        //                 </div>
        //             )
        //         })
        // })
        
    },[])


    return(
        <div>
            {prodComp}
            {contInfo}
        </div> 
    )
}
    


export default withRouter(ProdSingleView)