import "../init";
import React, { useState,useEffect } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw,convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { collection, doc, setDoc,getDoc } from 'firebase/firestore';
import { db,useAuth } from "../Firebase/Auth";

function TextEditor({docId}) {
  const currentUser = useAuth();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    if (currentUser && currentUser.email) {
      const fetchDoc = async () => {
        try {
          const docRef = doc(db, 'userDocs', currentUser.email, 'docs', docId);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()&&editorState) {
            const docData = docSnapshot.data();
            setEditorState(EditorState.createWithContent(convertFromRaw(docSnapshot?.editorState)));
          } 
        } catch (error) {
          console.log('Error fetching document:', error);
        }
      };

      fetchDoc();
    } 
  }, [currentUser, docId]);


  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
 
    if(currentUser && currentUser.email){
      const contentState = newEditorState.getCurrentContent();
    const contentStateRaw = convertToRaw(contentState);

    setDoc(
      doc(collection(db, 'userDocs', currentUser.email, 'docs'), docId),
      {
        editorState: contentStateRaw,
      },
      { merge: true }
    )
      .then(() => {
        console.log('Document updated successfully');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });

    }
    
  };
  return (
    <>
      <div className="bg-[#F8F9FA] min-h-screen pb-16">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
          editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border  p-10"
        />
      </div>
    </>
  );
}

export default TextEditor;
