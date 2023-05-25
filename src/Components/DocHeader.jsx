import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/Auth';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import { useAuth } from '../Firebase/Auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import TextEditor from './TextEditor';

function DocHeader({ docId }) {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const handleClick = () => {
    navigate("/");
  };
 
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
  useEffect(() => {
    if (currentUser?.photoURL) {
      
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser && currentUser.email) {
      const fetchDoc = async () => {
        try {
          const docRef = doc(db, 'userDocs', currentUser.email, 'docs', docId);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const docData = docSnapshot.data();
            setFileName(docData.fileName);
          } else {
            navigate('/');
          }
        } catch (error) {
          console.log('Error fetching document:', error);
        }
      };

      fetchDoc();
    } 
  }, [currentUser, docId, navigate]);

  return (
    <>
    <header className="flex justify-between items-center p-1 pb-1">
      <span onClick={handleClick}>
        <DescriptionSharpIcon sx={{ color: '#4285f4', fontSize: 40 }} />
      </span>
      <div className="flex-grow px-2">
        <h2>{fileName}</h2>
        <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
        </div>
      </div>
      <div className="hidden md:inline-flex h-10">
      <Button variant="contained" size="large">
        <PeopleSharpIcon sx={{color:"white"}}/> SHARE
      </Button>
      </div>
      

      <img className="rounded-full cursor-pointer h-12 w-12 ml-2" src={photoURL} alt=""/>
    </header>
    <TextEditor docId={docId}/>
    </>
  );
}

export default DocHeader;
