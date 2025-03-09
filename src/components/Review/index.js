"use client";
import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Input from "../Input";
import { MdOutlineRateReview } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import InputStar from "../InputStar";
import { createReview, fetchReviews } from "@/lib/actions/review.actions";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const Review = ({ reviews }) => {
  console.log("isName");
  console.log(reviews);

  reviews.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });

  console.log(reviews);
  // const [isRate, setRate] = useState("");
  const [isReviewData, setReviewData] = useState(reviews);
  const [isName, setName] = useState();
  const [isComment, setComment] = useState();
  const [isRating, setRating] = useState(0);
  console.log(isRating);

  const addReviewData = () => {
    let _isReviewDta = [...isReviewData];
    _isReviewDta.push({
      rating: isRating,
      name: isName,
      comment: isComment,
    });
    setReviewData(_isReviewDta);
  };

  console.log(isReviewData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("isName");
      createReview({
        id: uuidv4(),
        rating: isRating,
        name: isName,
        comment: isComment,
      });
      addReviewData();
      setRating(0);
      setName("");
      setComment("");
    } catch (error) {
      console.log("isName");
      console.log(error);
    }
  };

  const convertDateToDate = (theDate) => {
    const date = moment(theDate).format("DD / MM - YYYY");

    return date;
  };

  const convertDateToTime = (theTime) => {
    const time = moment(time).format("HH:mm:ss");

    return time;
  };

  return (
    <>
      <div className=" w-[1000px] m-auto flex items-stretch justify-between ">
        <div>
          {isReviewData.map((item, index) => {
            return (
              <div className="mb-5" key={index}>
                <div>
                  <StarRating
                    isRating={item.rating}
                    onlyView={true}
                    iconSize={16}
                  />
                </div>
                <div className="mt-4 mb-2 font-Caveat text-colorComment">
                  {item.comment ? `"${item.comment}"` : null}
                </div>

                <div className=" font-Inter text-colorComment">{item.name}</div>
                <div className=" text-[8px] font-Inter">
                  {convertDateToDate(item.date)}
                </div>
                {item.adminComment != "" ? (
                  <div className="ml-6">
                    <div className="ml-1 border-l border-b h-4 w-4"></div>
                    <div className=" font-Inter text-colorComment">
                      Restaurangen svarar:
                    </div>
                    <div className=" font-Caveat text-colorComment">
                      {item.adminComment}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        <div className="bg-[#FBFBFB] self-stretch">
          <div className=" sticky top-4 self-start px-4">
            <form onSubmit={handleSubmit}>
              <InputStar isRating={isRating} setRating={setRating} />
              <Input
                name="isName"
                onChange={(e) => setName(e.target.value)}
                value={isName}
                placeholder="Namn"
                Icon={IoIosPerson}
              />
              <Input
                name="comment"
                onChange={(e) => setComment(e.target.value)}
                value={isComment}
                type="textarea"
                placeholder="Skriv en kommentar.."
                Icon={MdOutlineRateReview}
              />
              <input type="submit" value="Skicka" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
