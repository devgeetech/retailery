import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import firebase from "firebase";

import classes from './SearchMain.module.css';

// import Auxil from '../../hoc/Auxil/Auxil'
// import FeedProd from './feedProd/FeedProd'
// import classes from './FeedProdList.module.css'
// import Spinner from '../UI/Spinner/Spinner'
import Input from "../../UI/Input/Input";
import OutlinedInput from '@material-ui/core/OutlinedInput';



const SearchMain = props => {
  const inputEl = {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Search"
    },
    value: "",
    touched: false
  };

  const [inpEl, chInp] = useState(inputEl);

  const srchHandler = event => {
    event.preventDefault();

    const queryParams = encodeURIComponent(inpEl.value);

    props.history.push({
      pathname: "/FeedM",
      search: "?" + queryParams
    });

    // const rootRef = firebase.database().ref()
    // const srchRef = rootRef.child('Products').orderByChild('name').equalTo(inpEl.value)

    // srchRef.once('value', function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //       var childKey = childSnapshot.key;
    //       var childData = childSnapshot.val();
    //       console.log(childKey)
    //       console.log(childData)
    //     });
    // });
  };

  const inputChangedHandler = event => {
    const updatedFormElement = { ...inpEl };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    chInp(updatedFormElement);
    //inpEl.srchEl = updatedFormElement
  };

  return (
    <form onSubmit={srchHandler} className = {classes.searchbar}>
      {/* <Input
        key="search"
        elementType="input"
        elementConfig={inpEl.elementConfig}
        value={inpEl.value}
        invalid={false}
        touched={inpEl.touched}
        shouldValidate={false}
        changed={event => inputChangedHandler(event)}
      /> */}
      <OutlinedInput
        key="search"
        type="input"
        // elementConfig={inpEl.elementConfig}
        value={inpEl.value}
        // invalid={false}
        // touched={inpEl.touched}
        // shouldValidate={false}
        onChange={event => inputChangedHandler(event)}
      /> 
    </form>
  );
};

export default withRouter(SearchMain);
