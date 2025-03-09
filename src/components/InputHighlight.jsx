"use client";
import { updateHighlightReview } from "@/lib/actions/review.actions";
import React, { useState } from "react";

const InputHighlight = ({ id, highLight }) => {
  const [isChecked, setChecked] = useState(highLight);

  const handleChecked = (e) => {
    setChecked(!isChecked);
    updateHighlightReview(id, e.target.checked);
  };
  return (
    <input
      type="checkbox"
      value={isChecked}
      name="time"
      onChange={(e) => handleChecked(e)}
      checked={isChecked}
    />
  );
};

export default InputHighlight;
