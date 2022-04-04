import React from 'react'
import Logo from '../../assets/logo.svg';
import { Button } from '@material-ui/core';
import "./Header.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';





export default function Header(props) {

    //const [accessToken, setAccessToken] = useState("");
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.accessToken);

    useEffect(() => {
        getAccessToken();
    }, [accessToken]);

    function getAccessToken(){
        const userDetails = window.sessionStorage.getItem('user-details');
        const token = window.sessionStorage.getItem("access-token");
        //setAccessToken(token);
        dispatch({
            type: "add-update",
            payload: {
                accessToken: token,
                userDetails: userDetails
            }
        });
        console.log(token);
    }

    async function logOut(){
        //console.log(accessToken);
        try{
            const rawResponse = await fetch('http://localhost:8085/api/v1/auth/logout', {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "authorization": `Bearer ${accessToken}`
                }    
            });
            console.log(rawResponse)
            if(rawResponse.ok){
                window.sessionStorage.removeItem('user-details');
                window.sessionStorage.removeItem('access-token')
                console.log("Logged Out")
                //setAccessToken("");
                dispatch({
                    type: "delete",
                    payload: {
                        accessToken: "",
                        userDetails: ""
                    }
                });
            } else {
                const error = new Error();
                error.message = "Something went wrong!";
                throw error;
            }
        } catch(e){
            alert(e.message)
        }
    }


  

    return (
        <div className="header-container">
            <img alt="Logo" src={Logo} className="header-logo"/>
            <div className="header-button-container">
                {props.children}
                {
                    accessToken===null || accessToken.length===0 
                    ? <Button variant="contained" size="small" onClick={props.onClickLogin}>Login</Button>
                    : <Button variant="contained" size="small" onClick={logOut}>Logout</Button>
                }
            </div>
        </div>
    )
}

