import React, { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';
import { supabase } from '../client'

const ReadPosts = () => {

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const {data} = await supabase
        .from('Posts')
        .select()
        .order('created_at', { ascending: true });
        // set state of posts
        setPosts(data)
        console.log(posts)
      }

    useEffect(() => {
        fetchPosts()
    }, []);
    
    return (
        <div className="ReadPosts">
            {
                
                posts && posts.length > 0 ?
                posts.map((posts,index) => 
                   <Card time={posts.created_at} id={posts.id} title={posts.Title} author={posts.Author} description={posts.Description} age={posts.Age} upvotes={posts.Upvotes}/>
                ) : <h2>{'No Posts yet'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;