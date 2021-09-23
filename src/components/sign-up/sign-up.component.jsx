import React,{Component} from "react";
import './sign-up.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUSerProfileDocument } from "../../firebase/firebase.utils";


class SignUp extends Component {
    constructor(){
        super();

        this.state = {
            displayName:'',
            email:'',
            password:'',
            confirmPassword:'',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword){
            alert("Password don't match!")
            return;
        }

        if(password.length < 5){
            alert("Password length must be more than 5 characters!")
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            createUSerProfileDocument(user, {displayName});

            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            })

        } catch (error){
            console.error(error);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }


    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            
            <div className='sign-up'>
                <h2>I don't have an account</h2>
                <span>Sign up with email and password.</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='displayName' 
                        type='displayName' 
                        value={displayName} 
                        handleChange={this.handleChange}
                        label="Name"
                        required 
                    />
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={email} 
                        handleChange={this.handleChange}
                        label="Email"
                        required 
                    />
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={password} 
                        handleChange={this.handleChange}
                        label="Password"
                        required 
                    />
                    <FormInput 
                        name='confirmPassword' 
                        type='password' 
                        value={confirmPassword} 
                        handleChange={this.handleChange}
                        label="Confirm Password"
                        required 
                    />
                    
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign Up</CustomButton>
                    </div>
                    


                </form>
            </div>
            
        )
    }
}

export default SignUp ;