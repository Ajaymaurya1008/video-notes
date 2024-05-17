"use client";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";

const App = () => {
  const [videoDetails, setVideoDetails] = useState({}); // State to store video details
  const videoId = "TRWUSvb0uNE"; // Extract video ID from URL

  const opts = {
    height: "760",
    width: "1450",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        console.log(process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY);
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY}`
        );
        const data = {
          title: res.data.items[0].snippet.title,
          description: res.data.items[0].snippet.description,
        };
        if (data) {
          console.log(data);
          setVideoDetails(data);
          console.log(videoDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getVideoDetails();
  }, []);

  return (
    <div className="flex p-8 h-full bg-slate-300 flex-col">
      <div className="mb-6">
        <h1 className="text-[30px] text-[#101828] font-[600]">
          Video Player with Notes
        </h1>
      </div>
      <YouTube videoId={videoId} opts={opts} />
      <div className="mt-5">
        <h2 className="text-[18px] text-black font-bold">
          {videoDetails.title}
        </h2>
      </div>
      <div className="notes">
        <div className="border-[1px] flex justify-between border-[#EAECF0] rounded-lg p-4  mt-8 text-black">
          <div className="flex flex-col gap-2">
            <p className="text-[18px] font-semibold">My notes</p>
            <p className=" text-[14px] text-[#475467]">
              All your notes at a single place. Click on any note to go to
              specific timestamp in the video.
            </p>
          </div>
          <button
            className="border-2 border-[#e1e4e9] font-semibold flex gap-2 justify-center items-center text-[#344054] text-[14px] rounded-xl px-2 py-0 "
          >
            <IoIosAddCircleOutline size={25} /> Add New Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
