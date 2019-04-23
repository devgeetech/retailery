import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import home from './home-button.png'
import wish from './heart.png'

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact clicked={props.clicked}>
        <img src={home} className={classes.Home} />Home
               </NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/wish">
        <img src={wish} className={classes.WiSh} />Wishlist
        </NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth" clicked={props.clicked}>Login</NavigationItem>
            : <NavigationItem link="/logout" clicked={props.clicked}>Logout</NavigationItem>}
    </ul>
)

export default navigationItems