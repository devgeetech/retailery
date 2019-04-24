import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import LoginIcon from '../../../assets/icons/login.svg'
import home from '../../../assets/icons/home-button.png'
import wish from '../../../assets/icons/heart.png'
import plusIcon from '../../../assets/icons/plus.svg'


const navigationItems = (props) =>{
    //const isCust = localStorage.getItem('isCust'); 
    console.log(props.isCust)
    let isShop = null
    if(props.isCust===true)
        isShop=false
    else
        isShop=true

    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact clicked={props.clicked}>
                    <img src={home} className={classes.Home} alt= "alt" />Home
            </NavigationItem>
            {props.isAuthenticated && (props.isCust===true) ? <NavigationItem link="/wish" clicked={props.clicked}>
                <img src={wish} className={classes.WiSh} alt="alt" />Wishlist
            </NavigationItem> : null}
            {props.isAuthenticated && isShop ? <NavigationItem link="/AddProd" clicked={props.clicked}>
                <img src={plusIcon} className={classes.WiSh} alt="alt" />Add Product
            </NavigationItem> : null}
            {!props.isAuthenticated
                ? <NavigationItem link="/auth" clicked={props.clicked}>
                    <img src={LoginIcon} className={classes.WiSh} alt="alt" />Login</NavigationItem>
                : <NavigationItem link="/logout" clicked={props.clicked}>
                    <img src={LoginIcon} className={classes.WiSh} alt="alt" />Logout</NavigationItem>}
        </ul>
    )
}
    


export default navigationItems