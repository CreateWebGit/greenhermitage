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

  //#e2d3b4

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
      <div className="w-full  m-auto flex items-stretch justify-between ea-grid md:w-[1000px] ">
        <div className="px-4 order-2 ea-col-6 ea-col-xs-12 md:order-1 md:px-2">
          {isReviewData.map((item, index) => {
            return (
              <div className="mb-12 md:my-12" key={index}>
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
        <div className=" order-1 w-full m-0  self-stretch ea-col-6 ea-col-xs-12 md:order-2 md:w-[300px] md:ml-[200px] ">
          <div className=" sticky  top-0 self-end px-4 md:min-h-[100vh] border border-[#F2EEE3] bg-[#F2EEE3] md:bg-[#CDC6B3]  md:shadow-md">
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className=" flex flex-col pt-8 md:py-[50px] gap-6 md:h-[100vh] md:justify-between">
                  <div className="mb-4 md:mb-12">
                    <h2 className=" text-2xl text-[#4b4a4a] text-colorComment">
                      Skriv en recention
                    </h2>
                    <div className=" h-[2px] rounded-md bg-[#333] w-1/2 mb-3" />
                    <InputStar isRating={isRating} setRating={setRating} />
                  </div>
                  <div>
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
                    <input
                      type="submit"
                      value="Skicka"
                      className="border border-[#c6c5c5] bg-[#F2EEE3] w-full h-[50px] cursor-pointer"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
