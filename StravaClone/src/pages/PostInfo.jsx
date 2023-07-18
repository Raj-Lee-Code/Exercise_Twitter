import React, { useState, useEffect } from 'react';
import CardDesc from '../components/CardDesc';
import { supabase } from '../client'
import { useLocation } from 'react-router-dom'
import './PostInfo.css'
import { useParams } from 'react-router-dom';

const ReadPosts = () => {
    const location = useLocation();
    const {id} = useParams();
    
    return (
            <div>
                <CardDesc id={id} title={location.state.Title} author={location.state.Author} description={location.state.Description} upvotes={location.state.Upvotes}/>
            </div>  
    )
}

export default ReadPosts;