import React, { useState } from "react";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingbookmarkIcon } from "@heroicons/react/24/outline";
import { ShoppingbookmarkIcon as FullShoppingbookmarkIcon } from "@heroicons/react/24/solid";
import { FiInfo } from "react-icons/fi";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { useApp } from "../context/app-context";
import ExtraInfo from "./ExtraInfo";
function LikeButton({ liked, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center space-x-1">
      {liked ? (
        <SolidHeartIcon className="w-6 h-6 text-red-500 " />
      ) : (
        <HeartIcon className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
}

function BookmarkButton({ inbookmark, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center space-x-1">
      {inbookmark ? (
        <button
          className=" top-3 right-3  text-gray-500 "
          aria-label="bookmark Bahamas Islands"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v14l-6-4-6 4V5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <button
          className="top-3 right-3  text-gray-500"
          aria-label="bookmark Bahamas Islands"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 stroke-current"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v14l-6-4-6 4V5z"
            />
          </svg>
        </button>
      )}
    </button>
  );
}

function Card({ card }) {
  const [likedCards, setLikedCards] = useState([]);

  const toggleLike = (cardId) => {
    if (likedCards.includes(cardId)) {
      setLikedCards(likedCards.filter((id) => id !== cardId));
    } else {
      setLikedCards([...likedCards, cardId]);
    }
  };
  const [bookmarkItems, setbookmarkItems] = useState([]);

  const togglebookmark = (cardId) => {
    if (bookmarkItems.includes(cardId)) {
      setbookmarkItems(bookmarkItems.filter((id) => id !== cardId));
    } else {
      setbookmarkItems([...bookmarkItems, cardId]);
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  //   const a = card[0].volumeInfo.categories.split(" ").trim();
  //   console.log(a);

  const { cardData, SetCardData, setOpenView, openView } = useApp();
  const ViewMore = (card) => {
    SetCardData(card);
    setOpenView(true);
  };
  return (
    <>
      <div className="max-w-md bg-white rounded-xl overflow-hidden shadow-md my-2 mx-2 flex flex-col justify-between">
        <div className="px-4 py-2">
          <div className="flex justify-between">
            <div>
              {/* <LikeButton
                liked={likedCards.includes(card.id)}
                onClick={() => toggleLike(card.id)}
              ></LikeButton> */}
              <p className="text-md font-semibold text-gray-600">
                {card.saleInfo.saleability &&
                card.saleInfo.saleability.length > 0
                  ? card.saleInfo.saleability.split(/[,.]/)[0].trim()
                  : "No sale"}
              </p>
            </div>
            <div>
              <BookmarkButton
                inbookmark={bookmarkItems.includes(card.id)}
                onClick={() => togglebookmark(card.id)}
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {card?.volumeInfo?.title?.substring(0, 30)}
            </h2>

            <p className="text-sm text-gray-600">
              {card.volumeInfo.authors && card.volumeInfo.authors.length > 0
                ? card.volumeInfo.authors[0].split(/[,.]/)[0].trim()
                : "No author"}
            </p>
            <p className="text-sm text-gray-600">
              {card?.volumeInfo?.publishedDate}
            </p>
          </div>
        </div>
        <div
          className="relative flex-grow h-25px w-40px flex items-center justify-center"
          onClick={() => setIsHovered(true)}
          //   onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            className="object-fill rounded-lg flex justify-items-center"
            src={card?.volumeInfo?.imageLinks?.thumbnail}
            loading="lazy"
            alt=""
          />
          <button className="absolute bottom-0 right-0 m-2  text-white rounded-full">
            <InfoOutlinedIcon style={{ color: "black" }} />
          </button>
          {isHovered && (
            <div className="absolute inset-0 bg-gray-500 opacity-60 flex justify-center items-center">
              {/* Category */}
              <p className="text-white text-lg font-bold">
                {card.volumeInfo.categories &&
                card.volumeInfo.categories.length > 0
                  ? card.volumeInfo.categories[0].split(" ")[0].trim()
                  : "No category"}
              </p>
            </div>
          )}
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex">
            <p className="text-md text-gray-600  flex justify-center items-center h-full mr-1">
              {card.saleInfo.retailPrice
                ? card.saleInfo.retailPrice.currencyCode
                : ""}
            </p>
            <p className="text-md font-semibold">
              {/* {card.volumeInfo.categories} */}
              {card.saleInfo.retailPrice
                ? card.saleInfo.retailPrice.amount
                : card.saleInfo.saleability
                ? card.saleInfo.saleability
                : "NA"}
            </p>
          </div>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md font-semibold"
            aria-label="Explore books"
            onClick={() => ViewMore(card)}
          >
            Explore
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
