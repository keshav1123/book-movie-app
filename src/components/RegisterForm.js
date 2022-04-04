import { Button, FormControl, TextField } from '@material-ui/core';
import React, {useState} from 'react'

function RegisterForm() {
    const [isRegistered, setRegistered] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        firstName: {
            value: "",
            errorText: ""
        },
        lastName: {
            value: "",
            errorText: ""
        },
        email: {
            value: "",
            errorText: ""
        },
        password: {
            value: "",
            errorText: ""
        },
        phone: {
            value: "",
            errorText: ""
        },
    });

    const { firstName, lastName, email, password, phone} = registerForm;

    const validateForm = () => {
        let isValid = true;
        if(firstName.value.length===0 || firstName.value===""){
            const state = registerForm;
            state.firstName.errorText = "required";
            setRegisterForm({...state});
            isValid=false;
        }
        if(lastName.value.length===0 || lastName.value===""){
            const state = registerForm;
            state.lastName.errorText = "required";
            setRegisterForm({...state});
            isValid=false;
        }
        if(email.value.length===0 || email.value===""){
            const state = registerForm;
            state.email.errorText = "required";
            setRegisterForm({...state});
            isValid=false;
        }
        if(password.value.length===0 || password.value===""){
            const state = registerForm;
            state.password.errorText = "required";
            setRegisterForm({...state});
            isValid=false;
        }
        if(phone.value.length===0 || phone.value===""){
            const state = registerForm;
            state.phone.errorText = "required";
            setRegisterForm({...state});
            isValid=false;
        }
        return isValid;
    }

    const inputChangeHandler =(e) => {
        const state = registerForm;
        state[e.target.name]['value'] = e.target.value;
        if(e.target.value.length>0){
            state[e.target.name]['errorText'] = "";
        }
        setRegisterForm({...state});
    }

    const onSubmitHandler = () => {
        const isValid = validateForm();
        if(isValid){
            console.log("valid")
            signUp();
        } else{
            console.log("not valid")
        }
    }

    async function signUp(){
        const body = {
            email_address: email.value,
            first_name: firstName.value,
            last_name: lastName.value,
            mobile_number: phone.value,
            password: password.value
        };
        try{
            const rawRepsonse = await fetch('http://localhost:8085/api/v1/signup', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(body)
            });
            const result = await rawRepsonse.json();
            if(rawRepsonse.ok){
                setRegistered(true);
                console.log(rawRepsonse);
            } else{
                const error = new Error();
                error.message = result.message;
                setRegistered(false);
                throw error;
            }
        } catch(e){
            alert(e.message)
        }

    }


    return (
        <div className="register-form-container"><br></br>
            <FormControl><TextField 
                required
                error={firstName.errorText!=="" ? true:false}
                helperText={firstName.errorText}
                key="firstName" 
                label="First Name"
                name="firstName" 
                type="text" 
                value={firstName.value} 
                onChange={inputChangeHandler}
            /><br/>
            <TextField 
                required
                error={lastName.errorText!=="" ? true:false}
                helperText={lastName.errorText}
                key="lastName" 
                label="Last Name"
                name="lastName" 
                type="text" 
                value={lastName.value} 
                onChange={inputChangeHandler}
            /><br/>
            <TextField 
                required
                error={email.errorText!=="" ? true:false}
                helperText={email.errorText}
                key="email" 
                label="Username"
                name="email" 
                type="email" 
                value={email.value} 
                onChange={inputChangeHandler}
            /><br/>
            <TextField 
                required
                error={password.errorText!=="" ? true:false}
                helperText={password.errorText}
                key="password" 
                label="Password"
                name="password" 
                type="password" 
                value={password.value} 
                onChange={inputChangeHandler}
            /><br/>
            <TextField 
                required
                error={phone.errorText!=="" ? true:false}
                helperText={phone.errorText}
                key="phone" 
                label="Contact No."
                name="phone" 
                type="number" 
                value={phone.value} 
                onChange={inputChangeHandler}
            />
            </FormControl><br/><br/>
            {isRegistered && <div><span>Registration Successful. Please Login!</span><br/><br/></div>}
            <Button variant="contained" color="primary" onClick={onSubmitHandler}>Register</Button>
        </div>
    )
}

export default RegisterForm
