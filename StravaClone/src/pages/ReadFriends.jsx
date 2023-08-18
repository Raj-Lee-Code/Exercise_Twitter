import React, { useState, useEffect } from 'react';
import FriendCard from '../components/FriendCard.jsx';
import { supabase } from '../client'

const ReadFriends = ({token}) => {

    const [friends, setFriends] = useState([]);
    const fetchFriends = async () => {
        const {data} = await supabase
        .from('Friends')
        .select()
        .or(`user.eq.${token.user.email}`)
        
        setFriends(data)
        
      }

    useEffect(() => {
        fetchFriends()
    }, []);
    
    return (
        <div className="ReadPosts">
            {
                
                friends && friends.length > 0 ?
                friends.map((friends,index) => 
                   <FriendCard name={friends.friend_name} email={friends.friend_email}/>
                ) : <h2>{'No Friends yet'}</h2>
            }
        </div>  
    )
}

export default ReadFriends;