import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AdDeleteMarketPlace,
  AdInqueryMarketPlace,
  AdMarkSoldMarketPlace,

  MArketPlaceImagePreviewIcon
} from "../shared/Icons";

import { useRouter } from "next/router";
import { useDeleteAdMutation, useSoldAdMutation } from "../../slices/MarketPlace";
import { StatusPill } from "../../pages/MarketPlace/[MarketPlace]";
import { convertUTCToLocalDate, renderExternalImage, truncateText } from "../../Utils/Utils";
import { ImagePreview } from "./ImagePreview";


interface Props {
  data?: any;
}
function CardView({ data }: Props) {
  // state of router
  const router = useRouter();
  // state for handle delete or sold popup
  const [isPopUpOpen, setisPopUpOpen] = useState({
    isDelete: false,
    isSold: false,
  });
  // state for image preview
  const [isOpenImagePreview, setIsOpenImagePreview] = useState(false);
  // store ad id
  const [adId, setAdId] = useState("");

  // sold ad API
  const [
    soldAd,
    { data: soldAdData, isLoading: soldAdLoading, isError: soldAdError },
  ] = useSoldAdMutation();

  // delete ad API
  const [
    deleteAdAd,
    { data: deleteAdData, isLoading: deleteAdLoading, isError: deleteAdError },
  ] = useDeleteAdMutation();

  const marketplaceCss = `
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next, .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev, .swiper-pagination-bullets-dynamic .swiper-pagination-bullet { transform: scale(1); }
    .mySwiper2{
  position: relative !important;
}
.mySwiper2 .swiper-button-next  {
  top:330px !important;
  right: 20px !important;
}
.swiper-pagination-bullet-active {
  background: #007aff !important;
  opacity: 1 !important;
}

.mySwiper2 .swiper-button-prev{
  top:330px !important;
  right: 70px !important;
  left: auto !important;
}
  .swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{
  left: 0 !important;
  }
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 2px !important;
    }
    .mySwiper .swiper-slide {
    min-width: 100%;
   }
  `;

  const [adsImages, setImages] = useState({
    image: [],
    title: ""
  });

  // function for handle image preview
  const handleImagePreview = (image, title) => {
    setImages({
      image: image,
      title: title
    })
    setIsOpenImagePreview(true)
  }

  return (
    <>
      <style>{marketplaceCss}</style>
      {data?.length > 0 &&
        data?.map((item, index) => {
          const isAddOfCurrentUser =
            JSON.parse(localStorage.getItem("userProfile"))?.userProfileId ===
            item?.userContext?.createdByUserId
          return (
            <div
              key={index}
              className="mx-auto bg-white rounded-lg border border-gray-p-350 relative w-full hover:shadow-md transition-all duration-300"
            >
              <button onClick={() => handleImagePreview(item?.documents, item?.title)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-10">
                <MArketPlaceImagePreviewIcon />
              </button>

              {(isAddOfCurrentUser || item?.productStatus === "Sold") &&
                <div className="absolute top-2 left-2  z-10">
                  {StatusPill("", { value: item?.productStatus })}
                </div>
              }

              <div
                className={`${isAddOfCurrentUser || (!isAddOfCurrentUser && item?.productStatus !== "Sold") ? 'cursor-pointer' : ""}`}
              >
                {/* Image Section */}
                <div className="relative">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                      dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="cardsider"
                  >
                    {item?.documents?.length > 0 &&
                      item?.documents?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <Image
                              src={item?.uri}
                              loader={renderExternalImage}
                              alt="Loading..."
                              className=" w-full h-full object-cover rounded-lg overflow-hidden"
                              layout="responsive"
                              width={380}
                              height={192}
                            />
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>

                {/* Content Section */}
                <div className={`p-5`}
                  onClick={() =>
                    (isAddOfCurrentUser || (!isAddOfCurrentUser && item?.productStatus !== "Sold")) &&
                    router.push({
                      pathname: `/MarketPlace/${item?.marketPlaceAdId}`,
                    })
                  }>
                  {/* Location and Date */}
                  <div className="flex justify-between text-xs text-gray-p-450 mb-3">
                    <span>
                      {item?.cityName}, {item?.stateName} - {item?.zipCode}
                    </span>
                  </div>

                  {/* Title and Category */}
                  <h3 className="text-base font-medium text-black-b-300 leading-5 line-clamp-1 break-words mb-1">
                    {/* {item?.title} */}
                    {truncateText(item?.title, 30)}
                  </h3>
                  <div className="mt-1">
                    <span className="paddingXStatusPill text-sm py-1 px-2 capitalize leading-wide rounded-full bg-[#F7F7FE] text-[#2E94EA]">{item?.category}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-p-450 mt-3 h-10 line-clamp-2 break-words">
                    {/* {item?.description} */}
                    {truncateText(item?.description, 50)}
                  </p>


                </div>

                {/* Price and Link */}
                <div className="p-5 pt-0 ">
                  {!isAddOfCurrentUser &&
                    <div className="flex justify-between items-center">
                      < div className="text-base font-semibold text-[#EC8431]">
                        ${item?.price}
                      </div>
                      <div className="text-sm font-medium text-primary-o-600 hover:text-primary-o-550 transition-all duration-300">
                        <span className="text-right text-[#404A5F] text-xs font-normal pt-3">
                          {convertUTCToLocalDate(item?.productStatus?.trim()?.replace(/\s+/g, "")?.toLowerCase() === "sold" ? item?.soldDate : item?.userContext?.createdOn)}
                        </span>
                      </div>
                    </div>
                  }
                  {isAddOfCurrentUser &&
                    <div className="flex justify-between flex-col">
                      <div className="flex items-center justify-between">
                        <div className="text-base font-semibold text-[#EC8431]">
                          {item?.productStatus?.trim()?.replace(/\s+/g, "")?.toLowerCase() === "sold" ? "Sold for" : "$" + item?.price}
                        </div>
                        {item?.productStatus?.trim()?.replace(/\s+/g, "")?.toLowerCase() === "sold" ?
                          <div className="text-base font-semibold text-[#EC8431]">
                            ${item?.soldPrice}
                          </div>
                          :
                          <div className="flex gap-4 items-center">
                            <button
                              className="group relative"
                              onClick={() => {
                                setAdId(item?.marketPlaceAdId);
                                setisPopUpOpen({
                                  ...isPopUpOpen,
                                  isSold: true,
                                });
                              }}
                            >
                              <AdMarkSoldMarketPlace />
                              <span className="min-w-max absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white bg-black text-xs p-1 rounded">
                                Mark as Sold
                              </span>
                            </button>
                            <Link href={`/Socials/MarketPlace/${item?.marketPlaceAdId}`}>
                              <div className="flex gap-1 items-center cursor-pointer group relative">
                                <AdInqueryMarketPlace />
                                <span className="text-lg text-[#47ABFF]">
                                  {item?.enquiryCount}
                                </span>
                                <span className="min-w-max absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white bg-black text-xs p-1 rounded">
                                  View Inquiries
                                </span>
                              </div>
                            </Link>

                            <button
                              className="group relative"
                              onClick={() => {
                                setAdId(item?.marketPlaceAdId);
                                setisPopUpOpen({
                                  ...isPopUpOpen,
                                  isDelete: true,
                                });
                              }}
                            >
                              <AdDeleteMarketPlace />
                              <span className="min-w-max absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white bg-black text-xs p-1 rounded">
                                Delete Ad
                              </span>
                            </button>
                          </div>
                        }
                      </div>
                      <div className="text-right text-sm font-medium text-primary-o-600 hover:text-primary-o-550 transition-all duration-300">
                        <span className="text-right text-[#404A5F] text-xs font-normal pt-3">
                          {convertUTCToLocalDate(item?.productStatus?.trim()?.replace(/\s+/g, "")?.toLowerCase() === "sold" ? item?.soldDate : item?.userContext?.createdOn)}
                        </span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div >
          );
        })}



      {/* image preview */}
      {
        isOpenImagePreview &&

        <ImagePreview
          isOpen={isOpenImagePreview}
          title={adsImages.title}
          onClose={() => setIsOpenImagePreview(false)}
          images={adsImages.image}
          currentImageIndex={0}

        />
      }

    </>
  );
}

export default CardView;
