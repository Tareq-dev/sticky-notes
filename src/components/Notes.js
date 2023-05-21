import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function Notes({ deleteNote, note, onType: onTypeNote }) {
  
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = note.id;
    onTypeNote(editMeId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = note.id;
    onTypeNote(editMeId, "description", updatedValue);
  };

  return (
    <div className="shadow-lg w-80 rounded-lg my-2">
      <div className="flex justify-between items-center bg-sky-100 rounded-t-lg">
        <input
          type="text"
          placeholder="Title"
          className="py-3 px-4 bg-sky-100 max-w-xs  outline-none placeholder:text-black"
          value={note?.title}
          onChange={updateTitle}
        />
        <button aria-label="Name" onClick={ deleteNote}>
          <RiDeleteBin6Line
            size={24}
            className={
              note?.title === "" && note?.description === ""
                ? "mr-2 hidden bg-red-500 text-white rounded-full p-1 w-8 h-8"
                : "mr-2 bg-red-500 text-white rounded-full p-1 w-8 h-8"
            }
          />
        </button>
      </div>
      <div className="bg-red-300 text-black rounded-b-lg">
        <textarea
          value={note?.description}
          onChange={updateDescription}
          placeholder="Type notes here..."
          className="py-2 px-4 w-80 h-48 bg-red-300  rounded-b-lg outline-none placeholder:text-black resize-none"
        />
      </div>
    </div>
  );
}

export default Notes;
