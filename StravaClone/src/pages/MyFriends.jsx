import React, {useState, useEffect} from 'react';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom'
import ReadFriends from './ReadFriends';



const MyFriends = ({token}) => {

    const [formData,setFormData] = useState({
        friendEmail:''
      })
    const [foundfriend,setFriend] = useState()

    function handleChange(event){
        setFormData((prevFormData)=>{
          return{
            ...prevFormData,
            [event.target.name]:event.target.value
          }
        })
      }

      async function getUser (friend_email){
        
        const {data} = await supabase
        .from('users')
        .select('*')
        .eq('user_email', friend_email);
        
        setFriend(data)

      }

      async function handleSubmit(event){
        event.preventDefault()
        
        await getUser(formData.friendEmail)
        
        await supabase
        .from('Friends')
        .insert({user: token.user.email, friend_name: foundfriend[0].user_name, friend_email: foundfriend[0].user_email})
        .select()
        window.location = "/HomePage";

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