import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/utils/utils";
import Input from "./Input";

import { MdOutlineInsertComment } from "react-icons/md";
import { BiCommentAdd } from "react-icons/bi";
import { createReviewComment } from "@/lib/actions/review.actions";
import InputHook from "./InputHook";

const Comment = ({ reviewID, data }) => {
  const [isComment, setComment] = useState("");
  const [isMyComment, setMyComment] = useState(data);

  const [isExpanded, setExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleComment = (id) => {
    console.log(isComment);
    createReviewComment(id, isComment);
    setComment();
    setExpanded(false);
  };

  const onSubmit = (data) => {
    console.log(data.comment);
    setExpanded(false);
    setMyComment(data.comment);
  };

  return (
    <div>
      <div className="">
        {isMyComment ? (
          <div className="border-t">{isMyComment}</div>
        ) : (
          <div className="flex justify-end">
            <button>
              <BiCommentAdd
                size={20}
                onClick={() => {
                  setExpanded(!isExpanded);
                }}
              />
            </button>
          </div>
        )}
      </div>

      <div
        className={cn(
          "overflow-hidden",

          isExpanded
            ? "default max-h-[200px]"
            : "default max-h-[0px] overflow-hidden"
        )}
      >
        <div className=" h-[200px] ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputHook
              name="comment"
              value={isComment}
              onChange={(e) => setComment(e.target.value)}
              isLabel={false}
              type="textarea"
              placeholder="Skriv en kommentar"
              icon={MdOutlineInsertComment}
              register={register}
            />

            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comment;
