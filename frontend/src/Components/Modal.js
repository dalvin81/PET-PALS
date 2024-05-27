import React from 'react'
import {RiCloseLine} from "react-icons/ri"
import { useNavigate } from 'react-router-dom'
import './Modal.css'

export default function Modal({setModalStart}) {
    const navigate = useNavigate()
  return (
    <div className='darkBg' onClick={() => setModalStart(false)}>
      <div className='centered'>
        <div className='Modal'>
        <div className='ModalHeader'>
            <h5 className='heading'>Confirm</h5>
        </div>
        <button className='closeBtn' onClick={() => setModalStart(false)}>
            <RiCloseLine></RiCloseLine>
        </button>
        <div className='ModalContent'>
            Are you sure you want to continue?
        </div>
        <div className='ModalActions'>
            <div className='ActionsContainer'>
                <button className='logoutBtn' onClick={() => {setModalStart(false); localStorage.clear(); navigate('./signin')}}>
                    Log out
                </button>
                <button className='cancelBtn' onClick={() => setModalStart(false)}>
                    Cancel
                </button>
            </div>
        </div>
        </div>
    </div>  
    </div>
    
  )
}
