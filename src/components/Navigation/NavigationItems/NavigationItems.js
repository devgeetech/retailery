import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact clicked={props.clicked}>Home</NavigationItem>
        <NavigationItem link="/Wishlist" clicked={props.clicked}>Wishlist</NavigationItem>
    </ul>
)

export default navigationItems