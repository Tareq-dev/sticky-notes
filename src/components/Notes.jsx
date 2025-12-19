import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function Notes({ deleteNote, note, onType: onTypeNote }) {
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDelete = () => {
    if (isDeleting) return;
    setIsDeleting(true);
  };

  const handleAnimationEnd = () => {
    if (isDeleting) {
      deleteNote(note.id);
    }
  };

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`shadow-lg w-100 md:w-80 rounded-lg my-2 ${
        isDeleting ? "scale-out-center" : ""
      }`}
    >
      <div className="flex justify-between  items-center bg-sky-100 rounded-t-lg">
        <input
          type="text"
          placeholder="Title"
          className="py-4 md:py-2  px-4 placeholder:text-gray-600 font-semibold text-sm bg-sky-100 max-w-xs w-full  outline-none "
          value={note?.title}
          onChange={updateTitle}
        />
        <button
          className="cursor-pointer "
          aria-label="Name"
          onClick={handleDelete}
        >
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
      <div className="bg-red-200 relative text-black rounded-b-lg">
        <span className="text-[11px] absolute bottom-1 left-3 text-gray-500 ">
          {note.createdAt}
        </span>

        <textarea
          value={note?.description}
          onChange={updateDescription}
          placeholder="Type notes here..."
          className="py-2 px-4 w-100 md:w-80 h-30  rounded-b-lg outline-none placeholder:text-gray-600 resize-none"
        />
      </div>
    </div>
  );
}

export default Notes;
