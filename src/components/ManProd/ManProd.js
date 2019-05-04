import React, { useState, useEffect } from 'react'

import Auxil from '../../hoc/Auxil/Auxil'
import classes from './ManProd.module.scss'
//import firebase from './node_modules/firebase'
import Spinner from '../UI/Spinner/Spinner'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Backdrop from '../UI/Backdrop/Backdrop'
import deleteIcon from '../../assets/icons/deleteIcon.svg'



import firebase from 'firebase'
import axios from 'axios'
//import console = require('console');


const ManProd = (props) => {

    const [pComp,updComp]=useState((<Spinner/>))
    const [loadComp, upLoadcomp]=useState(null)
    const [diagComp, upDiag]=useState(null)
    const [snComp, upSnk]=useState(null)
    //let usrLoc = null
    const userId = localStorage.getItem('userId');
    let compList = []

    const predictSales = (event, viewVal) => {

        console.log(viewVal)
        let headers = {
            'Content-Type': 'text/plain'
        }
        axios.post('https://salespredict.herokuapp.com/predict',{'chk':viewVal},{headers: headers})
            .then(res => {
                const strLen = res.data.y_pred.length
                const resNo = res.data.y_pred.substring(1, strLen-1);
                console.log(resNo)
                alert("Predicted Sales : "+resNo)
                upLoadcomp(false)
            })
    }

    const togStock = (event, prId, inSt) => {
        const srchRef = firebase.firestore().collection("products").doc(prId) 
        const stk = inSt===1? 0:1
        srchRef.update({
            isInStock: stk
        })
        upLoadcomp(false)
    }

    useEffect(()=>{
        // navigator.geolocation.getCurrentPosition(position => {
        //     console.log(position)
        //     usrLoc={lat:position.coords.latitude, lng:position.coords.longitude}
        // })
        
       

        const db = firebase.firestore();
        const srchRef = db.collection("products");
        const srchRes = srchRef.where("sellerId", "==", userId)
        srchRes.onSnapshot(function(snapshot) {
            updComp(<Spinner/>)
            compList = []
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.data();
                compList.push(childData)
                console.log(compList)
            });    

            if(compList[0] == null){
                updComp(<p>No results</p>)
            }else{
                updComp(compList.map(proData => (
                    <div key={proData.id}>
                        <div className={classes.ProdSingleView}>
                            <img src={proData.imageSrc} alt={proData.imgAlt} className={classes.img}/>
                            <div className={classes.content}>
                                <h2><strong>{proData.brand}{" "}{proData.name}</strong></h2>
                                <p>Rating: {(proData.ratingVals.ratingValue).toFixed(1)}</p>
                                <p><strong>{proData.price}</strong></p>
                                <p>Views: {proData.views}</p>
                                </div>
                                <div className={classes.predict}>
                                    <div className={classes.ostock}>
                                        <Button
                                            onClick={event => {
                                                upLoadcomp(true)
                                                togStock(event, proData.id,proData.isInStock)
                                            }}
                                            className={classes.Button}>{proData.isInStock===1? "Out of stock": "In stock"}</Button>
                                    </div>
                                    <div className={classes.sales}>
                                        <Button
                                            onClick={event => {
                                                upLoadcomp(true)
                                                predictSales(event, proData.views)
                                            }}
                                            className={classes.Button}>Predict Sales</Button>
                                    </div> 
                                    </div>
                                    <div className={classes.Delete}>
                                    <Button clicked={event => delProd(event, proData.id)}><img src={deleteIcon} className={classes.Home} alt= "alt" /></Button>
                                    </div>   
                                    
                                    
                                {/* <p>Views: {proData.views}</p> */}
                            
                        </div>                    
                    </div>
                ))) 
            }        
        })  
    },[updComp])
    
    return(
        <Auxil>
            <div className={classes.page}>
               {loadComp? <Backdrop show={true} />:null} 
               <div className={classes.FeedSpecProdList}>
                    {pComp}
                </div>
            </div>
        </Auxil>
    )
}

export default ManProd