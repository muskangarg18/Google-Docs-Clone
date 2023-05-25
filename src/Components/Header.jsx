import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from "../Firebase/Auth";
import { Button } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import DehazeIcon from '@mui/icons-material/Dehaze';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import Divider from '@mui/material/Divider';
import google from '../assets/google.png';
import sheets from "../assets/sheets.png";
import slides from "../assets/slides.png";
import forms from "../assets/forms.png";

function Header() {
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const sideBarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
        document.getElementById("sidebar-menu").classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.getElementById("sidebar-menu").classList.toggle("hidden");
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
        <Button onClick={handleClick} sx={{ py: "4px", justifyContent: "start", color: "gray" }}>
          <DehazeIcon />
        </Button>
        <ul
          id="sidebar-menu"
          ref={sideBarRef}
          className={`absolute top-0 left-0 w-[300px] h-screen bg-white shadow-lg p-1 ${isSidebarOpen ? "" : "hidden"}`}
        >
          <div className='flex align-middle  ml-4'>
            <img src={google} alt='image' className='cursor-pointer h-15 w-15 pr-20' />
          </div>
          <Divider />
          <div className='flex align-middle mt-6 ml-4 hover:bg-gray-100 rounded-lg '>
            <img src={sheets} alt='image' className='cursor-pointer h-12 w-12 rounded-md mb-2 ml-2' />
            <li id="logout" className="w-full cursor-pointer pl-7 pt-3"><a href="https://sheets.google.com">Sheets</a></li>
          </div>
          <Divider />
          <div className='flex align-middle mt-6 ml-4 hover:bg-gray-100 rounded-lg'>
            <img src={slides} alt='image' className='cursor-pointer h-12 w-11 mr-1 ml-3 mb-2' />
            <li id="logout" className="w-full cursor-pointer pl-7 pt-3"><a href="https://slides.google.com">Slides</a></li>
          </div>
          <Divider />
          <div className='flex align-middle mt-6 ml-4 hover:bg-gray-100 rounded-lg'>
            <img src={forms} alt='image' className='cursor-pointer h-12 w-12  bg-white  mb-2 ml-3' />
            <li id="logout" className="w-full cursor-pointer pl-7 pt-3"><a href="https://forms.google.com">Forms</a></li>
          </div>
          <Divider />
        </ul>
        <DescriptionSharpIcon sx={{ fontSize: 30, color: "#4285f4" }} />
        <h1 className="ml-2 text-gray-700 text-2xl cursor-pointer">Docs</h1>
        <div className='mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md'>
          <SearchSharpIcon sx={{ color: "gray" }} />
          <input type="text" name="" id="" placeholder='Search' className='flex-grow px-5 text-base bg-transparent outline-none ' />
        </div>
        <Button sx={{ color: "gray" }}>
          <AppsSharpIcon sx={{ color: "gray" }} />
        </Button>
        <img className="cursor-pointer h-12 w-12 rounded-full ml-2 " src={photoURL} alt="Profile" />
      </header>
    </>
  );
}

export default Header;
