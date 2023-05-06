import React,{useState, useContext, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'react-bootstrap/Image'
import "./myProfileStyle.css";
import LoanTable from "./loanTable";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios';
import { UserContext } from "../../App";
var validator = require('validator');


export const MyProfile = (props) => {
  const {state,dispatch} = useContext(UserContext);
  useEffect(() =>{
    dispatch({type:"USER",payload : true});
    // console.log(state);
  }, [])
    const[accData, setAccData] = useState({
        name:'',
        username:'',
        age:'',
        income:'',
        password:'',
        cnfPass:'',
        gender:'',
        profilePicture:''
    });
    const[incData, setIncData] = useState({
        income:'',
        totalIncome:''
    });
    // var confPass ='';    
    useEffect(() => {
        axios.get(`/api/users/get/${localStorage.getItem('userID')}`)
        .then((res) => {
            setAccData(res.data);
        })
        .catch( (error) => {
            console.log(error);
        })
        axios.get(`/api/accounts/get/${localStorage.getItem('accountID')}`)
        .then((res) => {
            setIncData(res.data.income);
        })
        .catch( (error) => {
            console.log(error);
        })
    }, [])
    
    const [income, setIncome] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        getUser();
        setIncome(true);
        setShow(true);
    }
 //this function is to update the data already present
    const getUser = () => {

        // axios.get('http://localhost:4000/api/users/617e7ca7d14a165280bdaa21')
        // .then((res) => {
        //     // console.log(res);
        //     setAccData(res.data);
        // //   console.log(res.data);
        // //   console.log(res.data.name);
        // console.log("hellow2")
        // })
        // .catch( (error) => {
        //     console.log(error);
        // })

        console.log("welcome to edit profile");

    }
    const handleChange = event =>{
        const { value, name } = event.target;
        setAccData({...accData, [name]:value});
        setIncData({...incData, [name]:value});
    }

    const handleSubmit = event => {
        // console.log(accData.name);
        if(validator.isURL(accData.profilePicture) || accData.profilePicture===undefined){
            
            if(accData.password.length < 6){
                alert("Please provide password having length greater than 6!");
            }else{
                if(accData.password === accData.cnfPass){
                    
                    event.preventDefault();
                    axios.put(`/api/users/update/${localStorage.getItem('userID')}`, accData)
                    .then(res => {
                        alert("Profile Updated Successfully");
                    })
                    .catch(error =>{
                        console.log(error);
                    })
                    axios.put(`/api/accounts/update/${localStorage.getItem('accountID')}`, {
                        income:incData.income,
                        totalIncome:incData.income
                    })
                    .then(res => {
                        
                    })
                    .catch(error =>{
                        console.log(error);
                    })
                    handleClose();
        
                }else{
                    alert("passwords didn't matched!")
                }
            }
        }else{
            alert("Please enter a valid URL for your profile picture!");
        }

    }

    return (
        <div class="profile-full">
            <div class="container-profile">
                <div> <Image className="sidebar-img-profile" src={accData.profilePicture} alt="new" roundedCircle/></div>

                <div class="mainContainer-profile">
                    <h1 style={{color: props.color}} className="WelcomeText-profile">
                        Welcome {accData.name}!
                        <div className="blackLine-profile"></div>
                    </h1>
                    
                    <h3 style={{color: props.color}} className="label-profile">
                        Username : {accData.username}
                    </h3>
                    <h3 style={{color: props.color}} className="label-profile">
                        Email : {accData.email}
                    </h3>
                    <h3 style={{color: props.color}} className="label-profile">
                        Age : {accData.age}
                    </h3>
                    <h3 style={{color: props.color}} className="label-profile">
                        Gender : {accData.gender}
                    </h3>
                    <h3 style={{color: props.color}} className="label-profile">
                        Salary : {accData.income}
                    </h3>
                    <Button  variant="dark" onClick={handleShow}>Edit Profile</Button>{' '}

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose Profile Picture</Form.Label>
                                <Form.Control type="url" Name="profilePicture" placeholder="Please enter a valid Link of your Profile Picture" onChange={handleChange}/>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control Name="name" placeholder="Name" onChange={handleChange}/>
                            </Form.Group>
                            
                            
                            <Form.Label>Age</Form.Label>
                            <InputGroup className="mb-3">
                            <FormControl type="number" Name="age" placeholder="Age" onChange={handleChange} min="0" 
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                            </InputGroup>
                            
                           
                            <Form.Label>Gender</Form.Label>
                            <Form.Select Name="gender" placeholder="Gender" onChange={handleChange} defaultValue="">
                                <option>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Form.Select>

                            <Form.Label>Income</Form.Label>
                            <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FormControl type="number" Name="income" placeholder="Income" onChange={handleChange} min="0" 
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                            </InputGroup>
                            
                            <Form.Label>Username</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>@</InputGroup.Text>
                                <FormControl Name="username" placeholder="Username" onChange={handleChange}/>
                            </InputGroup>

                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" Name="password" placeholder="Password" onChange={handleChange}/>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="cnfPass" placeholder="Confirm Password" onChange={handleChange}/>
                            </Form.Group>


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="dark" disabled={false} onClick = {handleSubmit}>
                                Update Profile
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                
            </div>
            <div class="container-profile">
                <LoanTable
                ID = {localStorage.getItem('userID')}/>                            
            </div>

        </div>
        
    )
}

export default MyProfile

