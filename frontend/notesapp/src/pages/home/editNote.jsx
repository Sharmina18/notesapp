import React from 'react'
import { useState } from 'react'
import TagInput from '../../components/TagInput'

const EditNote = ( {onClose} ) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);

  return (
    <div>

        <div className='flex flex-row justify-between'>
            
            <div className='flex flex-col gap-2'>
                <label>Title: </label>
                <input 
                    type='text' 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <button 
                className=''
                onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
        </div>

        <div className='flex flex-col gap-2 mt-2'>
            <label>Content: </label>
            <textarea 
                className='bg-slate-100'
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>

        <button>
            Save
        </button>

    </div>
  )
}

export default EditNote