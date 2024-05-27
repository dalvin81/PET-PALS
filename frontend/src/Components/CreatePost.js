import React, { useState, useEffect } from 'react';
import './CreatePost.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    // Toast functions
    const notifyError = (msg) => toast.error(msg);
    const notifySuccess = (msg) => toast.success(msg);

    useEffect(() => {

      if (imageUrl) {
  
        fetch("https://x2b8lxm2lj.execute-api.us-east-2.amazonaws.com/create", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            body,
            pic: imageUrl
          })
        }).then(res => res.json())
          .then(data => {
            if (data.error) {
              notifyError(data.error)
            } else {
              notifySuccess("Successfully Posted")
              navigate("/")
            }
          })
          .catch(err => console.log(err))
      }
  
    }, [imageUrl])



    const postDetails = async () => {
      try {
          const formData = new FormData();
          formData.append('image', image);
          formData.append('body', body);
  
          const response = await fetch('https://x2b8lxm2lj.execute-api.us-east-2.amazonaws.com/create', {
              method: 'POST',
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('jwt'),
              },
              body: formData,
          });
  
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to save profile');
          }
  
          notifySuccess('Successfully Posted');
          navigate('/');
      } catch (error) {
          console.error(error);
          notifyError(error.message || 'Failed to save profile');
      }
  };
  


    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <div className='createPost'>
            <div className='post-header' style={{ margin: "3px auto" }}>
                <h4>Create a new post</h4>
                <button id='post-btn' onClick={() => {postDetails() }}>Share</button>
            </div>
            <div className='main-div'>
                <img src={imageUrl || "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"} alt='' />
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className='details'>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} type="text" placeholder='Write a caption..' />
            </div>
        </div>
    );
}
