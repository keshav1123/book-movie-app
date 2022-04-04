import { createStore } from "redux"

const initialState = {
    accessToken: "",
    userDetails: "",
}

function movieStore(state = initialState, action){
    switch(action.type){
        case "add-update":
            const accessToken = action.payload.accessToken;
            const userDetails = action.payload.userDetails;
            return {...state, accessToken: accessToken, userDetails: userDetails} 
        case "delete":
            return {...state, accessToken: "", userDetails: ""}   
        default: 
            return state;    
    }
}

export default createStore(movieStore);