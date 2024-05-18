"use client";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";

const App = () => {
  const [addModal, setAddModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [message, setMessage] = useState("");
  const [videoDetails, setVideoDetails] = useState({});
  const videoId = "TRWUSvb0uNE";
  const [opts, setOpts] = useState({
    height: "760",
    width: "1450",
    playerVars: {
      autoplay: 0,
    },
  });

  const handleChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  const addNoteHandler = (e) => {
    e.preventDefault();
    const currDate = new Date();
    const newNote = {
      date: currDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      timestamp,
      message,
      setTimestamp: "",
    };
    setMessage("");
    setTimestamp("");
    setNotes([...notes, newNote]);
    console.log(notes);
    setAddModal(false);
  };

  const handleTimestampClick = (timestamp) => {
    const parts = timestamp.split(":");
    const seconds = +parts[0] * 60 * 60 + +parts[1] * 60 + +parts[2];

    setOpts((prevOpts) => ({
      ...prevOpts,
      playerVars: {
        ...prevOpts.playerVars,
        start: seconds,
        autoplay: 1,
      },
    }));
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
    <div className="flex p-8 h-full bg-white flex-col">
      <div className="mb-6">
        <h1 className="text-[30px] text-[#101828] font-[600]">
          Video Player with Notes
        </h1>
      </div>
      <div className="rounded-lg overflow-hidden">
        <YouTube videoId={videoId} opts={opts} />
      </div>
      <div className="mt-5">
        <h2 className="text-[18px] border-b pb-3 border-[#e1e4e9] text-black font-bold">
          {videoDetails.title}
        </h2>
      </div>
      <div className="notes flex flex-col gap-5 border-[1px] rounded-xl mt-8  p-6 ">
        <div className=" flex justify-between border-b border-[#EAECF0] pb-6 text-black">
          <div className="flex flex-col gap-2">
            <p className="text-[18px] font-semibold">My notes</p>
            <p className=" text-[14px] text-[#475467] font-normal">
              All your notes at a single place. Click on any note to go to
              specific timestamp in the video.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => setAddModal(true)}
              className="border-2 border-[#e1e4e9] font-semibold flex gap-2 justify-center items-center text-[#344054] text-[14px] rounded-lg px-2 p-1 "
            >
              <IoIosAddCircleOutline size={25} /> Add New Note
            </button>
          </div>
          {addModal ? (
            <div className="fixed inset-0 z-10 h-[700px]">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setAddModal(false)}
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative flex justify-center items-center w-full max-w-lg mx-auto h-28 bg-white rounded-md shadow-lg">
                  <div className="sm:w-[32rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
                    <div className="relative bg-blue-600 py-6 pl-8 text-xl font-semibold uppercase tracking-wider text-white">
                      Enter Notes
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 right-0 m-5 h-6 w-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        onClick={() => setAddModal(false)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div className="space-y-4 px-8 py-10">
                      <form
                        onSubmit={addNoteHandler}
                        className="flex flex-col gap-3"
                      >
                        <input
                          type="time"
                          name="timestamp"
                          value={timestamp}
                          onChange={(e) => setTimestamp(e.target.value)}
                          placeholder="Timestamp"
                          step="1"
                          className="input placeholder:text-gray-500 text-black font-medium text-[16px] join-item input-bordered w-1/2 bg-slate-300"
                        />
                        <div className="join w-full">
                          <input
                            type="text"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type Notes"
                            className="input placeholder:text-gray-500 text-black font-medium text-[16px] join-item input-bordered w-full bg-slate-300"
                          />
                          <button
                            type="submit"
                            className="btn bg-blue-500 join-item text-[20px] text-white"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {notes
          ? notes.map((note, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  <div className="time-stamp">
                    <p className="text-[14px] text-[#344054] font-medium">
                      {note.date || "12 May 24"}
                    </p>
                    <p className="font-medium text-[#475467] text-[14px]">
                      TimeStamp:{" "}
                      <span onClick={()=>handleTimestampClick(note.timestamp)} className="text-[#7752cb] cursor-pointer">
                        {note.timestamp || "01 min 30 sec"}
                      </span>{" "}
                    </p>
                  </div>
                  <div className="message text-[14px] border border-[#EAECF0] p-2 rounded-lg font-normal text-[#344054]">
                    {note.message || "This is my first note"}
                  </div>
                  <div className="edit-del-btns mt-2 flex gap-2 justify-end font-medium items-center text-[#344054] text-[14px]">
                    <button className="border border-[#e1e4e9] p-1 px-4 rounded-lg">
                      Delete note
                    </button>
                    <button className="border border-[#e1e4e9] p-1 px-4 rounded-lg">
                      Edit Note
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default App;
