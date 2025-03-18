"use client";
import { cn } from "@/utils/utils";
import React, { useEffect, useState } from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = 9734;
const DEFAULT_UNSELECTED_COLOR = "gray";
const DEFAULT_COLOR = "#FFA600";

const StarRating = ({
  count,
  isRating = 0,
  setRating,
  icon,
  color,
  iconSize,
  onlyView = false,
  textColor = "text-colorComment",
}) => {
  const [isTemporaryRating, setTemporaryRating] = useState(0);
  const [isRatingText, setRatingText] = useState("");
  const [isTemporeryRatingText, setTemporeryRatingText] = useState("");

  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

  useEffect(() => {
    if (isRating == 1) {
      setRatingText("Dåligt");
    } else if (isRating == 2) {
      setRatingText("Sämre");
    } else if (isRating == 3) {
      setRatingText("Ok");
    } else if (isRating == 4) {
      setRatingText("Bra");
    } else if (isRating == 5) {
      setRatingText("Utmärkt");
    }
  });

  const handleClick = (rating) => {
    setRating(rating);
  };

  return (
    <div className="flex items-center gap-2">
      {stars.map((item, index) => {
        const isActiveColor =
          (isRating || isTemporaryRating) &&
          (index < isRating || index < isTemporaryRating);

        let elementColor = "";

        if (isActiveColor) {
          elementColor = color || DEFAULT_COLOR;
        } else {
          elementColor = DEFAULT_UNSELECTED_COLOR;
        }

        return (
          <div
            style={{
              fontSize: iconSize ? `${iconSize}px` : "24px",
              color: elementColor,
              filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
            }}
            className={cn(
              "transition-all transform ",
              onlyView == false ? "hover:scale-125 hover:cursor-pointer" : ""
            )}
            key={index}
            onMouseEnter={() => {
              {
                onlyView == false ? setTemporaryRating(index + 1) : "";
              }
              if (!onlyView) {
                if (index + 1 === 1) {
                  setTemporeryRatingText("Dåligt");
                } else if (index + 1 === 2) {
                  setTemporeryRatingText("Sämre");
                } else if (index + 1 === 3) {
                  setTemporeryRatingText("Ok");
                } else if (index + 1 === 4) {
                  setTemporeryRatingText("Bra");
                } else if (index + 1 === 5) {
                  setTemporeryRatingText("Utmärkt");
                }
              }
            }}
            onMouseLeave={() => {
              setTemporaryRating(0);
              setTemporeryRatingText("");
            }}
            onClick={() => {
              onlyView == false ? handleClick(index + 1) : "";
            }}
          >
            {icon ? icon : String.fromCharCode(DEFAULT_ICON)}
          </div>
        );
      })}
      <div className={textColor} style={{ fontSize: "14px" }}>
        {isTemporeryRatingText ? isTemporeryRatingText : isRatingText}
      </div>
    </div>
  );
};

export default StarRating;
