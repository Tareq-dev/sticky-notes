import React from "react";
import "./App.css";
import { RiAddCircleLine } from "react-icons/ri";
import Notes from "./components/Notes";
import { useEffect, useState } from "react";
import logo from "../src/images/logo.png";
// import ReactDOM from "react-dom/client";
// import { axe } from "@axe-core/react";

const getItem = () => {
  let notes = localStorage.getItem("notes");
  if (notes) {
    return JSON.parse(localStorage.getItem("notes"));
  } else {
    return [
      {
        id: Date.now(),
        title: "",
        description: "",
      },
    ];
  }
};

function App() {
  const [notes, setNotes] = useState(getItem());
  const [subject, setSubject] = useState("");
  const [notesDetail, setNotesDetail] = useState("");
  const [searchNote, setSearchNote] = useState("");


  const onType = (editMeId, updatedKey, updatedValue) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    setNotes(updatedNotes);
    //set data according to type
  };
  const addNewNotes = () => {
    const newNote = {
      id: Date.now(),
      title: subject,
      description: notesDetail,
    };

    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    const remaining = notes.filter((note) => note.id !== id);
    remaining.splice(id, 1);
    localStorage.removeItem(id);
    localStorage.setItem("notes", JSON.stringify(remaining));
    setNotes(remaining);
  };

  useEffect(() => {
    const stringifiedNotes = JSON.stringify(notes);
    localStorage.setItem("notes", stringifiedNotes);
  }, [notes]);

  return (
    <div>
      <header className="flex justify-center items-center py-4 px-8 rounded-b-2xl bg-sky-100">
        <img className="w-10 h-10 " src={logo} alt="" />
        <h1 className="text-xl font-semibold ml-4">Super Sticky Notes</h1>
      </header>
      <div className="container mx-auto flex flex-col justify-center items-center px-4">
        <div className=" mt-10 mb-6 py-2 text-white rounded-lg bg-green-600 px-4">
          <button
            onClick={addNewNotes}
            className="font-bold flex justify-center items-center text-xl"
          >
            New Notes
            <span className="ml-3">
              <RiAddCircleLine size={24} />
            </span>
          </button>
        </div>
        <input
          onChange={(e) => setSearchNote(e.target.value)}
          placeholder="Type here to Search"
          className="border-2 py-2 rounded-md shadow-md px-4 w-full max-w-xs block mb-8 outline-none placeholder:text-black"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 justify-items-center font-sans">
          {notes
            ?.filter((value) => {
              if (searchNote === "") {
                return value;
              } else if (
                value?.title
                  .toLowerCase()
                  .includes(searchNote.toLocaleLowerCase())
              ) {
                return value;
              }
            })
            ?.map((note) => (
              <Notes
                note={note}
                key={note.id}
                deleteNote={deleteNote}
                setSubject={setSubject}
                setNotesDetail={setNotesDetail}
                onType={onType}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
// if (process.env.NODE_ENV !== "production") {
//   const axe = require("@axe-core/react");
//   axe(React, ReactDOM, 1000);
// }
