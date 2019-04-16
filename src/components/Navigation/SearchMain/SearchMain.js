import React, { useState, useEffect } from 'react'

// import Auxil from '../../hoc/Auxil/Auxil'
// import FeedProd from './feedProd/FeedProd'
// import classes from './FeedProdList.module.css'
// import firebase from 'firebase'
// import Spinner from '../UI/Spinner/Spinner'
import Input from '../../UI/Input/Input'


const SearchMain = () => {

    const inputEl = {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Search'
            },
            value: '',
            touched: false
        }

    const [inpEl, chInp] = useState(inputEl)   

    const inputChangedHandler = (event) => {
        const updatedFormElement = {...inpEl}
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        chInp(updatedFormElement)
        //inpEl.srchEl = updatedFormElement
    }

    return(
        <Input 
            key='search'
            elementType='input'
            elementConfig={inpEl.elementConfig}
            value={inpEl.value}
            invalid={false}
            touched={inpEl.touched}
            shouldValidate={false}
            changed={(event) => inputChangedHandler(event)}/>
    )
}

export default SearchMain