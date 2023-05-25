import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import FolderSharpIcon from '@mui/icons-material/FolderSharp';
import addpage from "../assets/addpage.png";
import { collection, doc, addDoc, serverTimestamp, query, orderBy, getDocs } from 'firebase/firestore';
import { useAuth, db } from '../Firebase/Auth';
import DocumentRow from '../Components/DocumentRow';

import 'firebase/compat/firestore';

function Home() {
  const currentUser = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const popupRef = useRef(null);
  const [snapshot, setSnapshot] = useState([]);

  const handleImageClick = () => {
    setIsPopupOpen(true);
  };
  const handleCancelClick = () => {
    setIsPopupOpen(false);
  };

  const handlePopupClose = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  const handleDocumentNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  const fetchDocuments = async () => {
    if (!currentUser || !currentUser.email) {
      console.error('User email not available');
      return;
    }
  
    const q = query(
      collection(db, "userDocs", currentUser.email, "docs"),
      orderBy("timestamp", "desc")
    );
    
    try {
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSnapshot(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };
  
  useEffect(() => {
    if (currentUser) {
      fetchDocuments();
    }
  }, [currentUser]);

  const handleCreateDocument = async () => {
    if (!documentName) return;

    try {
      const userDocsCollectionRef = collection(db, "userDocs", currentUser.email, "docs");
      const newDocRef = await addDoc(userDocsCollectionRef, {
        fileName: documentName,
        timestamp: serverTimestamp(),
      });

      console.log('Document created successfully!');
      setDocumentName('');
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handlePopupClose);

    return () => {
      document.removeEventListener('mousedown', handlePopupClose);
    };
  }, []);

  return (
    <>
      <section className={`pb-10 px-10 ${isPopupOpen ? 'bg-gray-200' : 'bg-transparent'}`}>
        <div className='max-w-3xl mx-auto'>
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            {isPopupOpen && (
              <div className="popup bg-white border-white rounded-lg" ref={popupRef}>
                <h1 className="text-xl font-bold mb-4 ml-5">Create Document</h1>
                <input
                  type="text"
                  placeholder="Enter document name"
                  value={documentName}
                  onChange={handleDocumentNameChange}
                  className="flex justify-center outline-none w-full pl-7 pr-7"
                />
                <div className="flex justify-between pt-3 pb-3 ml-4 mr-4">
                  <button className="bg-blue-600 rounded-sm" onClick={handleCreateDocument}>Create</button>
                  <button className="bg-blue-600 rounded-sm" onClick={handleCancelClick}>Cancel</button>
                </div>
              </div>
            )}

            <Button sx={{ color: "gray" }}>
              <MoreVertSharpIcon sx={{ color: "gray" }} />
            </Button>
          </div>
          <div className="relative">
            <div className={`h-52 w-40 border-2 cursor-pointer hover:border-blue-700 ${isPopupOpen ? 'opacity-50' : ''}`}>
              <img src={addpage} alt="" className="object-fill" onClick={handleImageClick} />
              {isPopupOpen && (
                <div className="popup-overlay"></div>
              )}
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>

          <section className={`px-10 md:px-0  ${isPopupOpen ? 'bg-gray-200' : 'bg-whitet'}`}>
            <div className="max-w-3xl mx-auto pt-8 text-sm text-gray-700">
              <div className="flex items-center justify-between pb-5">
                <h2 className="font-medium flex-grow">
                  My Documents
                </h2>

                <p className="mr-12">Date Created</p>
                <FolderSharpIcon sx={{ color: "gray", fontSize: 30 }} />
              </div>
            </div>
            {snapshot.map((doc) => (
              <DocumentRow
                key={doc.id}
                id={doc.id}
                fileName={doc.fileName}
                date={doc.timestamp}
              />
            ))}
          </section>
        </div>
      </section>
    </>
  );
}

export default Home;
