/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { Button } from "@mui/material";
import { useApp } from "../context/app-context";

const product = {
  name: "Basic Tee 6-Pack ",
  price: "$192",
  rating: 3,
  reviewCount: 117,
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
  imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "XXL", inStock: true },
    { name: "XXXL", inStock: false },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ExtraInfo() {
  const { cardData, SetCardData, setOpenView, openView } = useApp();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const emptyCat = ["none"];
  return (
    <div>
      {/* <Button onClick={() => setOpenView(true)}>hello</Button> */}
      <Transition.Root show={openView} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenView}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpenView(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 ">
                      <div className="h-full w-full overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                          src={cardData?.volumeInfo?.imageLinks?.thumbnail}
                          alt="NO img"
                          className="object-cover object-center h-full w-full"
                        />
                      </div>
                      {/* right section starts */}
                      <div className="sm:col-span-8 lg:col-span-7 ">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                          {cardData?.volumeInfo?.title
                            ?.split(/[,.]/)[0]
                            ?.trim() || ""}
                        </h2>
                        <h2 className="text-1.5xl font-semibold text-gray-600 sm:pr-12">
                          by{" "}
                          {cardData?.volumeInfo?.authors &&
                          cardData?.volumeInfo?.authors?.length > 0
                            ? cardData?.volumeInfo?.authors[0]
                                .split(/[,.]/)[0]
                                .trim()
                            : "No author"}
                        </h2>

                        <section
                          aria-labelledby="information-heading"
                          className="mt-2"
                        >
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          {/* <p className="text-2xl text-gray-900">
                            {cardData?.saleInfo?.retailPrice
                              ? cardData?.saleInfo?.retailPrice?.amount
                              : cardData?.saleInfo?.saleability
                              ? cardData?.saleInfo?.saleability
                              : "NA"}
                          </p> */}
                          <div className="flex">
                            {" "}
                            <RadioGroup className="mt-4">
                              <div className="grid grid-cols-4 gap-4">
                                <RadioGroup.Option
                                  className={() =>
                                    classNames(
                                      cardData?.saleInfo?.retailPrice
                                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                                      "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                    )
                                  }
                                >
                                  <RadioGroup.Label as="span">
                                    {cardData?.saleInfo?.retailPrice
                                      ? cardData?.saleInfo?.listPrice?.amount
                                      : cardData?.saleInfo?.saleability
                                      ? cardData?.saleInfo?.saleability
                                      : "NA"}
                                  </RadioGroup.Label>

                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                </RadioGroup.Option>
                                <RadioGroup.Option
                                  className={() =>
                                    classNames(
                                      cardData?.saleInfo?.listPrice
                                        ? cardData?.saleInfo?.listPrice
                                        : cardData?.saleInfo?.saleability
                                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                                      "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                    )
                                  }
                                >
                                  <RadioGroup.Label as="span">
                                    {cardData?.saleInfo?.retailPrice
                                      ? cardData?.saleInfo?.retailPrice?.amount
                                      : cardData?.saleInfo?.saleability
                                      ? cardData?.saleInfo?.saleability
                                      : "NA"}
                                  </RadioGroup.Label>
                                  <span
                                    className={classNames(
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                </RadioGroup.Option>
                              </div>
                            </RadioGroup>
                          </div>
                          {/* Reviews */}
                          <div className="mt-4">
                            <h4 className="sr-only">Reviews</h4>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={classNames(
                                      cardData?.volumeInfo?.averageRating
                                        ? cardData?.volumeInfo?.averageRating
                                        : 0 > rating
                                        ? "text-gray-900"
                                        : "text-gray-200",
                                      "h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                              <p className="sr-only">
                                {cardData?.volumeInfo?.averageRating
                                  ? cardData?.volumeInfo?.averageRating
                                  : 0}{" "}
                                out of 5 stars
                              </p>
                              <a
                                href="#"
                                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                {cardData?.volumeInfo?.ratingsCount?.length > 0
                                  ? cardData?.volumeInfo?.ratingsCount
                                  : " No "}{" "}
                                reviews
                              </a>
                            </div>
                          </div>
                        </section>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-4"
                        >
                          <form>
                            {/* Colors */}
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">
                                Description :
                              </h3>
                              <h4>
                                {cardData?.volumeInfo?.description?.length > 0
                                  ? cardData?.volumeInfo?.description
                                  : " No Description"}
                              </h4>
                            </div>

                            {/* Sizes */}
                            <div className="mt-10">
                              <div className="flex items-center justify-between mr-2">
                                <h4 className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                  Publisher :{" "}
                                  {cardData?.volumeInfo?.publisher
                                    ? cardData?.volumeInfo?.publisher
                                    : " No Publisher"}
                                </h4>
                                <a
                                  href="#"
                                  className="text-sm font-medium text-gray-900 "
                                >
                                  Publish Date :{" "}
                                  {cardData?.volumeInfo?.publishedDate
                                    ? cardData?.volumeInfo?.publishedDate
                                    : " No Date"}
                                </a>
                              </div>
                              {/* <div className="flex"> */}
                              <h2 className="mt-2 text-lg">Categories :</h2>
                              <div className="mt-1">
                                <div className="">
                                  {cardData?.volumeInfo?.categories?.length >
                                  0 ? (
                                    cardData.volumeInfo.categories.map(
                                      (category, index) => (
                                        <p className="text-lg font-semibold">
                                          {category}
                                        </p>
                                      )
                                    )
                                  ) : (
                                    <p className="text-lg font-semibold">
                                      No categories found
                                    </p>
                                  )}
                                  {/* </div> */}
                                </div>
                              </div>
                            </div>

                            {cardData?.saleInfo?.buyLink ? (
                              <button
                                //   onClick={() => setOpenView(true)}
                                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                <a
                                  href={cardData?.saleInfo?.buyLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Add to bag
                                </a>
                              </button>
                            ) : (
                              <button
                                //   onClick={() => setOpenView(true)}
                                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                <p disabled>Out of Stock</p>
                              </button>
                            )}
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
