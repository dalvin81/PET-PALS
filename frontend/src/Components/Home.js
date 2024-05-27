import React, {useEffect, useState} from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if(!token) {
      navigate("/signin")
    }

    // fetch post from DB to home page
    fetch("https://x2b8lxm2lj.execute-api.us-east-2.amazonaws.com/posts", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setData(result);
    })
    .catch(err => console.log(err));
  }, [])


  return (
    <div className='home'>
      {/*card*/}
      {data.map((posts) => {
        return (
          <div className='card'>
          {/*card header*/}
          <div className='cardHeader'>
            <h5>{posts.postedBy.name}</h5>
          </div>
          {/*card image*/}
          <div className='cardImage'>
            <img src={posts.photo} alt='' />
          </div>
          {/* card content */}
          <div className='cardContent'>
            <span className="material-symbols-outlined">favorite</span>
            <p>{posts.body}</p>
          </div>
          {/* adding comments */}
          <div className='addComments'>
            <span className="material-symbols-outlined">add comment</span>
            <input type='text' placeholder='add comment' />
            <button className='comment'>post</button>
          </div>
        </div>
        )
      })}     
    </div>
  )
}
