import React, { useState } from "react";
import { MdWorkspacePremium } from "react-icons/md";

const Tagfield = ({ tags, setTags, userInput, setUserInput }) => {
  const handleAddTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleReturnPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (userInput !== "") {
        handleAddTag(userInput);
        setUserInput("");
      }
    }
  };

  return (
    <div className="flex focus-within:text-red-500">
      <div className="top-0 flex h-12 w-12 items-center justify-center rounded-bl-md rounded-tl-md border-y border-l">
        <span>
          <MdWorkspacePremium />
        </span>
      </div>
      <div className="flex flex-col w-full p-1  border rounded-md focus-within:border-blue-500">
        <input
          name="key_tags"
          value={userInput}
          type="text"
          placeholder="Lägg till kompetens"
          onKeyDown={handleReturnPress}
          onChange={handleInputChange}
          className="h-12 w-full py-2 pl-2 text-gray-600 outline-transparent"
        />
        <div>
          {tags?.map((tag, index) => (
            <span
              key={`${index}-${tag}`}
              className="inline-flex items-start justify-start px-3 py-2 rounded-md text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
            >
              {tag}
              <button
                className="ml-2 hover:text-blue-500"
                onClick={() => handleRemoveTag(tag)}
                title={`Remove ${tag}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tagfield;
