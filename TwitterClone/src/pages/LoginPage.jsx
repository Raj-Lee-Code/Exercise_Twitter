import React, {useState} from 'react';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom'

const loginPage = ({setToken}) => {
    let navigate = useNavigate()

    const [formData,setFormData] = useState({
        email:'',password:''
      })
    
      function handleChange(event){
        setFormData((prevFormData)=>{
          return{
            ...prevFormData,
            [event.target.name]:event.target.value
          }
        })
      }

      async function handleSubmit(event){
        event.preventDefault()
        try{

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })
        console.log(data)
        if (error) throw error
        setToken(data)
        navigate('/HomePage')
        }
        catch (error){
          alert(error)
        }
      }

    return (
        <div className="header">
        <h1>Lets Exercise Together!</h1>
        <h2>Please login!</h2>
        <form onSubmit={handleSubmit}>

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
          <button type ='submit'>Login</button>
        </form>
        
        <div>Don't have an account? <Link to ='/SignUp'>Sign up here!</Link></div>
      </div>
    )
}

export default loginPage