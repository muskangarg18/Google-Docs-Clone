import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleSharpIcon from '@mui/icons-material/ArticleSharp';
import { Button } from '@mui/material';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';

function DocumentRow({ id, fileName, date }) {
  const navigate = useNavigate();
  const formattedDate = date ? date.toDate().toLocaleDateString() : '';

  const handleClick = () => {
    navigate(`/document/${id}`);
  };

  return (
    <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer" onClick={handleClick}>
      <ArticleSharpIcon sx={{ color: '#4285f4', fontSize: 30 }} />
      <p className="flex-grow pl-5 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{formattedDate}</p>
      <Button sx={{color:"gray"}}>
        <MoreVertSharpIcon sx={{ color: "gray" }} />
      </Button>
    </div>
  );
}

export default DocumentRow;
