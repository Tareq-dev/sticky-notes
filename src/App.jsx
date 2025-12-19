import "./App.css";
import { RiAddCircleLine } from "react-icons/ri";
import Notes from "./components/Notes";
import { useEffect, useState } from "react";
import logo from "../src/images/logo.png";
import toast, { Toaster } from "react-hot-toast";

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
  const [isDeleting, setIsDeleting] = useState(false);

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

  const formatDateTime = () => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // 0 → 12

    return `${hours}:${minutes} ${ampm} | ${day}.${month}.${year}  `;
  };

  const addNewNotes = () => {
    const hasEmptyTitle = notes.some((n) => !n.title | (n.title.trim() === ""));

    if (hasEmptyTitle) {
      toast.error("You have already an empty note!");
      return;
    }
    const newNote = {
      id: Date.now(),
      title: subject,
      description: notesDetail,
      createdAt: formatDateTime(),
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
      <header className="flex justify-center items-center py-2 md:py-4 px-8 rounded-b-2xl bg-sky-100">
        <img className="w-8 h-8 md:w-10 md:h-10 " src={logo} alt="" />
        <h1 className="text-lg md:text-xl font-semibold ml-4">
          Super Sticky Notes
        </h1>
      </header>
      <div className="container mx-auto flex flex-col justify-center items-center px-4">
        <div className=" mt-10 mb-6 py-2 text-white rounded-lg bg-green-600 px-4">
          <button
            onClick={addNewNotes}
            className="font-bold cursor-pointer flex justify-center items-center text-xl"
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
          className="border border-gray-500 py-2 rounded-md shadow-md px-4 w-full max-w-xs block mb-8 outline-none placeholder:text-gray-500"
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
                className=""
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
      <Toaster />
    </div>
  );
}

export default App;
// if (process.env.NODE_ENV !== "production") {
//   const axe = require("@axe-core/react");
//   axe(React, ReactDOM, 1000);
// }
