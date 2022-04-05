import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getAccessToken, setToken } from '../services/localStorage';

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [isValid, setIsValid] = useState({
        userName: "" ,
        password: "" ,
    });

    const history = useHistory();

    useEffect(()=>{
        if(getAccessToken()){
            history.push('/products')
        }
    },[]);

    const validation = ()=>{
        let result = true;
        let isValidTemp = {
            userName: "" ,
            password: "" ,
        };

        //Validation for UserName
        if(!userName){
            isValidTemp.userName = "Error: This field is mandatory.";
            result = false;
        }else{
            isValidTemp.userName = "";
        }

        //Validation for password
        if(!password){
            isValidTemp.password = "Error: This field is mandatory.";
            result = false;
        }else{
            isValidTemp.password = "";
        }

        setIsValid(isValidTemp);
        return result;
    }

    //Handle form submission
    const handleFormData = () =>{
        //setToken("json")
        if(validation()){
            setToken('MAY!@AN!!K@)))');
            history.push('/products')
        //     fetch('https://fakestoreapi.com/auth/login',{
        //     method:'POST',
        //     mode: 'no-cors', 
        //     body:JSON.stringify({
        //         username: "johnd",
        //         password: "m38rmF$"
        //     })
        // })
        //     .then(res=>res.json())
        //     .then(json=>setToken(json))
        //     .catch(error=>console.error(error))
        }
    }

    return <div className='page d-flex align-items-center justify-content-center'>
        <div className="card card-main">
            <div className="card-body">
                <div className="form-group ">
                    <label className="control-label requiredField" htmlFor="username">Username</label>
                    <input className={`form-control ${isValid.userName ? 'invalid' : ''}`} placeholder="Enter Username" id="username" type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
                    {isValid.userName && <small className="text-danger">{isValid.userName}</small>}
                </div>
                <div className="form-group ">
                    <label className="control-label " htmlFor="password">Password</label>
                    <input className={`form-control ${isValid.password ? 'invalid' : ''}`} placeholder="Enter password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    {isValid.password && <small className="text-danger">{isValid.password}</small>}
                </div>
                <div className="text-center">
                    <button className="btn btn-dark" type="submit" onClick={handleFormData}>Submit</button>
                </div>
            </div>
        </div>
    </div>
}

export default Login