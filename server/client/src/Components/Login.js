import React,{useState,useContext} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components';
import {FaGithub} from "react-icons/fa";
import Input from "./Input"
import Button from './Button';
import Icon from './Icon';
import { UserContext } from "../App";


export const Login = () => {

    const {state,dispatch} = useContext(UserContext);

    const [user,setUser] = useState({email:"",password:""});

    const history =useHistory();
    let name,value;

    const handleInputs = (e) =>{
        name = e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
    }

    const PostData = async(e) =>{
        console.log(user);
        e.preventDefault();
        const {email,password}=user;

        const res = await fetch("/api/auth/login" , {
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email,password
            })
        });

        const data= await res.json();

        if(res.status===400 || !data)
       { window.alert("Invalid SignIn");
        console.log("Invalid SignIn");}
        else{
            dispatch({type:"USER",payload : true})
            // window.alert("Sign In Successful");
            console.log("Sign In Successful");
            localStorage.setItem("userID", data.userID);

            const res = await fetch("/api/accounts/login" , {
                method : "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email
                })
            });
            const data1= await res.json();
            localStorage.setItem("accountID", data1.accountID);
            console.log(data1);
            localStorage.setItem("isAuth", true);
            localStorage.setItem("TOKEN", data.token);
            // console.log("token : ", data.token);
            history.push("/DashBoard");
            window.location.reload(false);
        }
    }

   // const {state,dispatch} =  useContext(Usercontext);
    const GithubBackground="linear-gradient(to right,#171515 0%, #171515 100%)"
    return (
        
            
        <form className="signup_signin" method="POST">
            <MainContainer>
                <WelcomeText>Login</WelcomeText>
                <InputContainer>
                <input 
                    style={{margin:'2em'}}
                    type="email" 
                    value={user.email}
                    name="email"
                    id="email"
                    class="form-control" 
                    onChange={handleInputs}
                    placeholder="Enter email" 
                />
                <input
                    style={{margin:'1em'}}
                    type="password" 
                    class="form-control" 
                    value={user.password}
                    name="password"
                    id="password"
                    onChange={handleInputs}
                    placeholder="Password"
                />
                </InputContainer>

                <ButtonContainer>
                    <button 
                        type="submit" 
                        name="signin" 
                        id="signin" 
                        onClick={PostData} 
                        class="btn btn-dark"
                        >
                            LOGIN
                    </button>
                </ButtonContainer>

                {/* <LoginWith>
                    or Login With
                </LoginWith>
                
                <IconsContainer>
                    <Icon color={GithubBackground}>
                        <FaGithub />
                    </Icon>
                </IconsContainer>

                    <ForgotPassword>Forgot Password ?</ForgotPassword> */}
            </MainContainer>
            
            
        </form>
    )
}

const MainContainer = styled.div`
display : flex;
align-items : center;
flex-direction : column;
height : 65vh;
width : 30vw;
background:rgba(255,255,255,0.15);
box-shadow : 0 8px 32px 0 rgba(31,38,135,0.37);
backdrop-filter : blur(8.5px);
border-radius : 10px;
color : #ffffff;
text-transform: uppercase;
letter-spacing: 0.4rem;
`;

const WelcomeText = styled.h2`
    margin: 3rem 0 1rem 0;
`;

const InputContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
//   height: 60%;
//   width: 100%;
`;
// const InputText = styled.input`
// `;
const ButtonContainer = styled.div `
    margin: 1rem 0 2rem 0;
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 color: green;
`;

const LoginWith = styled.h5 `
cursor: pointer;
`;


const IconsContainer = styled.div `
    display: flex;
 justify-content: space-evenly;
 margin: 1rem 0 1rem 0;
 width: 80%;
`;

const ForgotPassword = styled.h6 `
    cursor: pointer;
`;

export default Login;