import React, {useState} from 'react'
import { FormControl, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';

function LoginForm({onClose}) {
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState({
        email: {
            value: "",
            errorText: "",
        },
        password: {
            value: "",
            errorText: ""
        }
    });
    const {email, password} = loginForm;

    function validateForm(){
        let isValid = true
        if(email.value.length===0 || email.value===""){
            const state = loginForm;
            state.email.errorText = "required";
            setLoginForm({...state});
            isValid = false;
        }
        if(password.value.length===0 || password.value===""){
            const state = loginForm;
            state.password.errorText = "required";
            setLoginForm({...state});
            isValid = false;
        } 
        return isValid;
    }

    function inputChangeHanlder(e){
        const state = loginForm;
        state[e.target.name]['value'] = e.target.value;
        if(e.target.value.length>0){
            state[e.target.name]['errorText'] = "";
        }
        setLoginForm({...state});
    }

    function onSubmitHandler(){
        const isValid = validateForm();
        if(isValid){
            signIn();
        }
    }

    async function signIn(){
        const params = window.btoa(`${email.value}:${password.value}`);
        try{
            const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    "Authorization": `Basic ${params}`
                }
            });
            const result = await rawResponse.json();
            if(rawResponse.ok){
                console.log(result);
                window.sessionStorage.setItem('user-details', JSON.stringify(result));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                dispatch({
                    type: "add-update",
                    payload: {
                        accessToken: JSON.stringify(result),
                        userDetails: rawResponse.headers.get('access-token')
                    }
                });
                onClose();
            } else {
                const error = new Error();
                error.message = result.message;
                throw error;
            }
        } catch(e){
            alert(e.message);
        }
    }
    
    return (
        <div className="login-form-container">
            <br/><form key="login-form">
            <FormControl key="login-tab-email" required={true}>
                <TextField 
                    required
                    error={email.errorText!=="" ? true:false}
                    helperText={email.errorText}
                    key="email" 
                    label="Username"
                    name="email" 
                    type="email" 
                    value={email.value} 
                    onChange={inputChangeHanlder}/>
            </FormControl>
            <br/><br/>
            <FormControl key="login-tab-password">
                <TextField 
                    required
                    error={password.errorText!==""? true:false}
                    helperText={password.errorText}
                    key="password" 
                    label="Password"
                    value={password.value} 
                    onChange={(e) => inputChangeHanlder(e)} 
                    name="password" 
                    type="password"/>
            </FormControl>
            <br/><br/>
            <Button 
                onClick={onSubmitHandler} 
                color="primary" 
                variant="contained">
                    Login
            </Button>
            </form>
            
        </div>
    )
}

export default LoginForm
