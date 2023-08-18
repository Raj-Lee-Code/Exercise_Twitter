import React, {useState} from 'react';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom'
import ReadFriends from './ReadFriends';



const MyFriends = ({token}) => {

    const [formData,setFormData] = useState({
        friendEmail:''
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
        }
        catch (error){
          alert(error)
        }
      }

    return (
        <div className="header">
            
            <h1>My Friends!</h1>
            <Link to="/HomePage"><button className='headerBtn'>Go back home</button></Link>
            <br/>
            <form onSubmit={handleSubmit}>
                <input
                placeholder='Friend Email'
                name='friendEmail'
                onChange={handleChange}
                />
                <button type ='submit'>Add Friend!</button>
            </form>
            
            <ReadFriends token={token} />
      </div>
    )
}

export default MyFriends