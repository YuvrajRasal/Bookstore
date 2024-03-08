import React, { useEffect, useState, usearchState } from "react";
import axios from "axios";
import {
  ChevronDownIcon,
  FunnelIcon,
  HeartIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { logDOM } from "@testing-library/react";
import { useApp } from "../context/app-context";
import Navbar from "../components/Navbar";
import ExtraInfo from "../components/ExtraInfo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const filterOptions = [
  { name: "free-ebooks", href: "#", current: true },
  { name: "paid-ebooks", href: "#", current: false },
  { name: "ebooks", href: "#", current: false },
  { name: "full", href: "#", current: false },
  { name: "partial", href: "#", current: false },
  { name: "None", href: "#", current: false },
];
const sortOptions = [
  { name: "relevance", href: "#", current: true },
  { name: "newest", href: "#", current: false },
  { name: "None", href: "#", current: false },
];

// function LikeButton({ liked, onClick }) {
//   return (
//     <button onClick={onClick} className="flex items-center space-x-1">
//       {liked ? (
//         <SolidHeartIcon className="w-6 h-6 text-red-500" />
//       ) : (
//         <HeartIcon className="w-6 h-6 text-gray-500" />
//       )}
//       <span className="text-gray-600">{liked ? "Liked" : "Like"}</span>
//     </button>
//   );
// }
function Home() {
  const { cardData, SetCardData } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cardNew, setCardNew] = useState([]);

  const [filterOpName, setFilterOpName] = useState("None");
  const [sortOpName, setSortOpName] = useState("None");
  useEffect(() => {
    // setFilterOpName(option);
    let apiUrl = "https://www.googleapis.com/books/v1/volumes";

    let queryParams = [];
    const query = searchQuery;
    const filter = filterOpName;
    const sort = sortOpName;
    const maxResults = 40;

    // Add query parameter for query
    if (query.trim() !== "") {
      queryParams.push(`q=${encodeURIComponent(query)}`);
    }
    // Add query parameter for filter
    if (filter.trim() !== "None") {
      queryParams.push(`filter=${encodeURIComponent(filter)}`);
    }
    // Add query parameter for sort if sortelem has a value
    if (sort != "None") {
      queryParams.push(`orderBy=${encodeURIComponent(sort)}`);
    }
    // Add query parameter for maxResults
    queryParams.push(`maxResults=${maxResults}`);
    // Construct the full API URL
    if (queryParams.length > 0) {
      apiUrl += "?" + queryParams.join("&");
      console.log(apiUrl);

      // const apiUrl = "https://www.googleapis.com/books/v1/volumes";

      axios
        .get(apiUrl)
        .then((response) => {
          setSearchResults(response.data.items);
          console.log("API Response:", response.data.items);
          // Handle the API response here, e.g., update state with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Handle errors, e.g., display an error message to the user
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, sortOpName, filterOpName]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  //
  //************************************************************************************************************* */
  // FOUND A BETTER WAY TO DO ALL THE SORTING AND FILTERING INTSEAD OF CALLING API USING DIFFERENT FUNCTIOON EVERY TIME DIVIDED
  // THE URL INTO PARTS AND SETTING CONDISTION FOR EACH AND PUSHING IT INTO API QUERY AND CALLED SAME USE EFFECT BY SETTING
  // DEPENDENCIES
  // THIS IS WHAT THE PREVIOSU CODE LOOKED LIKE
  //********************************************************************************************************************8 */
  //
  //
  // useEffect(() => {
  //   if (searchQuery.trim() !== "") {
  //     // Fetch data from Google Books API
  //     const maxResults = 40;
  //     // const category = "your_category_here";
  //     axios
  //       .get(
  //         `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
  //           searchQuery
  //         )}&maxResults=${maxResults}`
  //       )
  //       .then((response) => {
  //         setSearchResults(response.data.items);
  //         console.log(response.data.items);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   } else {
  //     setSearchResults([]);
  //   }
  // }, [searchQuery]);

  // const addToCart = (book) => {
  //   setCart([...cart, book]);
  // };

  // const checkCondSort = (optionS) => {
  //   optionS == "None" ? setSortOpName("None") : setSortOpName(optionS);
  // };
  // const checkCond = (option) => {
  //   if (option == "None") {
  //     console.log(option);
  //     setFilterOpName(option);
  //     if (searchQuery.trim() !== "") {
  //       // Fetch data from Google Books API
  //       const maxResults = 40;
  //       // const category = "your_category_here";
  //       axios
  //         .get(
  //           `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
  //             searchQuery
  //           )}&maxResults=${maxResults}`
  //         )
  //         .then((response) => {
  //           setSearchResults(response.data.items);
  //           console.log(response.data.items);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching data:", error);
  //         });
  //     } else {
  //       setSearchResults([]);
  //     }
  //   } else {
  //     handleButtonClick(option);
  //   }
  // };
  // const handleButtonClick = (option) => {
  //   setFilterOpName(option);
  //   let apiUrl = "https://www.googleapis.com/books/v1/volumes";

  //   let queryParams = [];
  //   const query = searchQuery;
  //   const filter = option;
  //   const maxResults = 40;

  //   // Add query parameter for query
  //   if (query.trim() !== "") {
  //     queryParams.push(`q=${encodeURIComponent(query)}`);
  //   }
  //   // Add query parameter for filter
  //   if (filter.trim() !== "") {
  //     queryParams.push(`filter=${encodeURIComponent(filter)}`);
  //   }
  //   // Add query parameter for sort if sortelem has a value
  //   if (sortOpName != "None") {
  //     queryParams.push(`sort=${encodeURIComponent(sortOpName)}`);
  //   }
  //   // Add query parameter for maxResults
  //   queryParams.push(`maxResults=${maxResults}`);
  //   // Construct the full API URL
  //   if (queryParams.length > 0) {
  //     apiUrl += "?" + queryParams.join("&");
  //   }
  //   // const apiUrl = "https://www.googleapis.com/books/v1/volumes";

  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       setSearchResults(response.data.items);
  //       console.log("API Response:", response.data.items);
  //       // Handle the API response here, e.g., update state with the fetched data
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       // Handle errors, e.g., display an error message to the user
  //     });
  // };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Navbar />
        {/* <ExtraInfo /> */}
        <header className="bg-colorLib shadow">
          <div className="mx-auto max-w-7xl w-4/5 px-4 py-6 sm:px-6 lg:px-8 sm:w-1/2">
            <div>
              <div className="relative mt-2 rounded-md shadow-sm flex items">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">Q</span>
                </div>
                {/* <form onSubmit={handleSubmit} className="flex"> */}
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter name of book"
                />
                {/* <button type="submit">Search</button> */}
                {/* </form> */}
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col  items-baseline justify-between border-b border-gray-200 pb-6 sm:flex-row">
          <h1 className="text-6xl mb-10 font-bold tracking-tight text-white mx-5 sm:text-4xl sm:mx-10  sm:mb-0">
            New Arrivals
          </h1>
          <div className="flex justify-around">
            <div className="flex ">
              <Menu as="div" className="relative inline-block text-left">
                <div className="group inline-flex justify-center text-sm font-medium text-white hover:text-grey-100 border rounded-md p-2 ">
                  <p className="mr-1">Filter : </p>

                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-white hover:text-grey-100">
                    {filterOpName ? filterOpName : "filter"}
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white group-hover:text-grey-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {filterOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-black"
                                  : "text-grey-100",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              // onClick={() => checkCond(option.name)}
                              onClick={() => setFilterOpName(option.name)}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="flex items-center ml-5 mr-10 sm:ml-2">
              <Menu as="div" className="relative inline-block text-left">
                <div className="group inline-flex justify-center text-sm font-medium text-white hover:text-grey-100 border rounded-md p-2 ">
                  <p className="mr-1">Sort : </p>

                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-white hover:text-grey-100">
                    {sortOpName ? sortOpName : "sort"}
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white group-hover:text-grey-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-black"
                                  : "text-grey-100",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              // onClick={() => checkCondSort(option.name)}
                              onClick={() => setSortOpName(option.name)}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <div
          className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 min-[500px]:grid-cols-2 mx-5 sm:mx-2 bg-slate-900 mt-10 mb-40"
          px-2
        >
          {searchResults.map((card) => (
            <Card key={card.id} card={card}></Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
