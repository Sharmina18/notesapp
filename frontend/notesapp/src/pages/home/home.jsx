import React, { useEffect } from 'react'
import { useState } from 'react'
import NoteCard from '../../components/NoteCard'
import { NavBar } from '../../components/NavBar'
import EditNote from './editNote'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance';
import AddNote from './addNote'

export const Home = () => {

  const [openEditNote, setOpenEditNote] = useState({
    isShown: false,
    type: "edit",
    data: null
  });

  const [openAddNote, setOpenAddNote] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        console.log(userInfo);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {
    }
  }, []);

  useEffect(() => {
    console.log("User info updated:", userInfo);
  }, [userInfo]);

  return (
    <div>
        <NavBar />
        
        <div className='font-psemibold px-10 text-2xl text-center'>{userInfo ? `Hi, ${userInfo.fullName}` : ""}</div>


        <div 
          className='container mx-auto' 
          onClick={() => setOpenEditNote({
              isShown: true,
              type: "add",
              data: null
        })}>

          <div className='grid grid-cols-3 gap-4 mt-8'>
            <NoteCard
                title='Note Title'
                date='2021-09-01'
                content='Note Content Note Content Note Content Note Content Note Content'
                tags='Note Tags'
                isPinned={true}
                onEdit={() => console.log('Edit')}
                onDelete={() => console.log('Delete')}
                onPinNote={() => console.log('Pin Note')}
            />
          </div>
        </div>

       
        <Modal
          isOpen={openEditNote.isShown}
          onRequestClose={() => setOpenEditNote({ isShown: false, type: "add", data: null })} 
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
          contentLabel=""
          className="flex items-center justify-center h-full"
        >

            <div className="w-[40%] max-h-[90vh] bg-white p-5 overflow-y-auto rounded-lg shadow-lg">
              <EditNote 
                onClose={() => setOpenEditNote({ isShown: false, type: "add", data: null })}
              />
            </div>

        </Modal>

        <Modal
          isOpen={openAddNote.isShown}
          onRequestClose={() => setOpenAddNote({ isShown: false, type: "add", data: null })} 
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
          contentLabel=""
          className="flex items-center justify-center h-full"
        >

            <div className="w-[40%] max-h-[90vh] bg-white p-5 overflow-y-auto rounded-lg shadow-lg">
              <AddNote 
                onClose={() => setOpenAddNote({ isShown: false, type: "add", data: null })}
              />
            </div>

        </Modal>

      <div>
        <button 
          className='absolute right-10 bottom-10'
          onClick={() => setOpenAddNote({
            isShown: true,
            type: "add",
            data: null
          })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>

    </div>
  )
}

export default Home
