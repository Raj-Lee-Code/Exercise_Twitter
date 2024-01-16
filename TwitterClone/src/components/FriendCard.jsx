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
        window.location = "/HomePage";
    }
    return (
        
        <div className="Card">

            <h2 className="title">{props.name}</h2>
            <h3>{props.email}</h3>
            <button className='deleteButton' 
            onClick={() =>{
                    const confirmBox = window.confirm(
                        "Do you really want to delete this friend?"
                    )
                    if (confirmBox){
                        deleteFriend(event)
                        window.location = "/HomePage";
                    }
                }
            }>
                
                Delete</button>
        </div>
        );
};

export default FriendCard