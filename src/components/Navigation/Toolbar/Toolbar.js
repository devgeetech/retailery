import React from 'react'

import classes from './Toolbar.module.css'
//import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import SearchMain from '../SearchMain/SearchMain'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked = {props.drawerToggleClicked} />
        {/* <div className={classes.Logo}>
            <Logo />
        </div> */}
        <SearchMain/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;