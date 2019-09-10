import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router";

import { apiLink } from '../../../keys/keyStore'
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
        const ratgq = {
            query: `
                mutation {
                    updRating(ratingDat: {usId: "${props.userId}",prId: "${props.prodId}", starVal: ${starVal}})
                }
            `
        }
        fetch(apiLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratgq)
        })
        .then(res => {
            return res.json();
        })
        window.location.reload();
    }

    const addWishList = () => {
        const wisgq = {
            query: `
                mutation {
                    addWish(addWishDat: {usId: "${props.userId}",prId: "${props.prodId}"})
                }
            `
        }
        fetch(apiLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wisgq)
        })
        alert("Added to wishlist")
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
        fetch(apiLink, {
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

            fetch(apiLink, {
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

                const url = "https://www.google.com/maps/embed/v1/directions?key=KEY&origin="+srchParam.origin+"&destination="+srchParam.destination
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

    },[])


    return(
        <div>
            {prodComp}
            {contInfo}
        </div> 
    )
}
    


export default withRouter(ProdSingleView)