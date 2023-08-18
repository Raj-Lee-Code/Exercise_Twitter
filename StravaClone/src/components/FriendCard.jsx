import React from 'react'
import { useState } from 'react'
import './Card.css'
import { supabase } from '../client'


const FriendCard = (props) =>  {
    
    const deleteFriend = async(event) =>{
        event.preventDefault();
        console.log(props)
        await supabase
        .from('Friends')
        .delete()
        .eq('friend_email', props.email);
        
    }
    return (
        
        <div className="Card">

            <h2 className="title">{props.name}</h2>

            <button className='deleteButton' onClick={deleteFriend}>Delete</button>
        </div>
        );
};

export default FriendCard