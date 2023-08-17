import React, {useState} from 'react';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom'
import ReadPosts from './ReadPosts';


const HomePage = ({token}) => {
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
          //alert('Please check your email for a verification link!')
        }
        catch (error){
          alert(error)
        }
      }
      function handleLogout(){
        localStorage.removeItem("token");
        window.location = "/"
      }
    return (
        <div className="header">
        <h1>Strava Clone!</h1>
        <h2>Hello, {token.user.user_metadata.user_name} </h2>
        <button>Search for friends</button>
        <button>My Friends</button>
        <Link to="/new"><button className='headerBtn'>Create a Post</button></Link> 
        <button onClick={handleLogout}>Logout</button>

        <ReadPosts token={token}/>
        
      </div>
    )
}

export default HomePage