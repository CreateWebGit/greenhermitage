"use client";
import React, { useEffect, useState } from "react";
import DropdownReview from "../DropdownReview";
import {
  createReviewComment,
  updateExtandedReview,
} from "@/lib/actions/review.actions";
import { BiCommentAdd } from "react-icons/bi";

import { MdOutlineDelete } from "react-icons/md";
import { convertToDate } from "@/lib/helper";
import Comment from "../Comment";
import InputHighlight from "../InputHighlight";

const ReviewBackend = ({ data }) => {
  console.log(data);

  const handleCange = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };

  const setDropDown = (id) => {
    console.log(id);
    updateExtandedReview(id);
  };
  return (
    <div className="max-w-[1000px] m-auto pt-[100px]  ">
      {data.map((item, index) => {
        return (
          <div key={index} className="bg-[#F1F5F9] shadow-md mb-3 p-4">
            <div className="flex justify-between ">
              <div>
                <div>{item.name}</div>
                <div>{item.comment}</div>
                <div>{item.expanded}</div>
                <div>{convertToDate(item.date)}</div>
              </div>
              <div className="flex flex-col justify-between  h-full ">
                <div className="flex gap-3 items-center mb-3 ">
                  <div>Highlighta</div>
                  <InputHighlight id={item.id} highLight={item.highlights} />
                </div>
                <div className="flex items-end gap-3 justify-end">
                  <button>
                    <MdOutlineDelete size={20} />
                  </button>
                  {item.adminComment ? "" : ""}
                </div>
              </div>
            </div>
            <Comment data={item.adminComment} reviewID={item._id} />
          </div>
        );
      })}
    </div>
  );
};

export default ReviewBackend;
