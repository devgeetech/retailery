import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact clicked={props.clicked}>Home</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/wish">Wishlist</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth" clicked={props.clicked}>Login</NavigationItem>
            : <NavigationItem link="/logout" clicked={props.clicked}>Logout</NavigationItem>}
    </ul>
)

export default navigationItems