import React, {useState} from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom'

const SignUp = () => {

    const [formData,setFormData] = useState({
        username:'', email:'',password:''
      })
    
      function handleChange(event){
        setFormData((prevFormData)=>{
          return{
            ...prevFormData,
            [event.target.name]:event.target.value
          }
        })
      }
      async function addUser() {
        await supabase
        .from('users')
        .insert({user_email: formData.email, user_name: formData.username})
        .select();
    }
      async function handleSubmit(event){
        event.preventDefault()
        try{
          const { data, error } = await supabase.auth.signUp(
            {
              email: formData.email,
              password: formData.password,
              options: {
                data: {
                  user_name: formData.username,
                }
              }
            }
          )
          
          if (error) throw error
          alert('Please check your email for a verification link!')
          await addUser()
        }
        catch (error){
          alert(error)
        }
        
      }

    return (
        <div className="header">
        <h1>Strava Clone!</h1>
        <h2>Sign Up!</h2>
        <form onSubmit={handleSubmit}>
          <input
          placeholder='Username'
          name='username'
          onChange={handleChange}
          />

          <input 
            placeholder='Email'
            name='email'
            onChange={handleChange}
          />

          <input
            placeholder='Password'
            name='password'
            type = 'password'
            onChange={handleChange}
          />
          <button type ='submit'>Sign Up Now!</button>
          <Link to="/"><button className='headerBtn'>Go back to Login page</button></Link>
        </form>
      </div>
    )
}

export default SignUp