import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

import {
  ArrowIcon,
  AssociationCalenderIcon,
  CheckIconMarketPlace,
  DeleteIconMarketPlace,
  DeletePopUpIconMarketPlace,
  DescriptionIcon,
  EditIconMarketPlace,
  MapIcon,
  SalePricePopUpIconMarketPlace,
} from "../../components/shared/Icons";
import { useRouter } from "next/router";
import {
  useDeleteAdMutation,
  useGetMarketplaceQuery,
  useSoldAdMutation,
} from "../../slices/MarketPlace";
import TopBanner from "../../components/Marketplace/TopBanner";
import SubHeading from "../../components/CommonComponents/SubHeading";
import { formatDateWithMonth, renderExternalImage } from "../../Utils/Utils";
import SimpleModal from "../../components/CommonComponents/SimpleModal";
import MakeInquiry from "../../components/Marketplace/MakeInquiry";
import VerifyOTP from "../../components/Marketplace/VerifyOTP";
import SuccessPopup from "../../components/Marketplace/SuccessPopup";
import { classNames } from "../../components/shared/Utils";
import { useBreadcrumbs } from "../../contexts/BreadCrumbContext";
import { useQuery } from "@apollo/client";
import { MARKET_PLACE_QUERY } from "../../graphql/queries/MarketPlace";
import apiClient from "../../apollo/apiClient";
import { NoDataFound } from "../../components/CommonComponents/DataNotFound";
import CenteredLoader from "../../components/CommonComponents/CenterLoader";

function MarketPlaceDetailView() {
  // state for router
  const router = useRouter();
  const { MarketPlace } = router.query;
  // const { showToast } = useToast();
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // state for add inquiry
  const [addInquire, setAddInquire] = useState(false);
  // state for edit add
  const [adEdit, setAdEdit] = useState(false);
  // state for holding add detail
  const [addDetail, setaddDetail] = useState<any>(null);
  // state for hold curent add is of current user
  const [isadofCurrentUser, setisadofCurrentUser] = useState(false);
  // state for hold form is edit or not
  // const [isEdit, setIsEdit] = useState(false);
  const [isPopUpOpen, setisPopUpOpen] = useState({
    isDelete: false,
    isSold: false,
  });
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // ads detail API
  // const {
  //   data: adsData,
  //   isLoading: adsDataLoading,
  //   isError: adsDataError,
  // } = useGetMarketplaceQuery(
  //   {
  //     "PageCriteria.EnablePage": false,
  //     "RequestParam.MarketPlaceAdId": MarketPlace,
  //   },
  //   {
  //     skip: !MarketPlace,
  //   }
  // );

  const {
    data: adsDataGql,
    loading: adsDataLoading,
    error: adsDataError,
    refetch,
  } = useQuery(MARKET_PLACE_QUERY, {
    client: apiClient,
    fetchPolicy: "cache-first", // ✅ Change from "network-only"
    nextFetchPolicy: "cache-and-network",
    variables: {
      request: {
        pageCriteria: {
          enablePage: false,
          pageSize: 0,
          skip: 0,
        },
        requestParam: {
            marketPlaceAdId: MarketPlace,
        },
      },
    },
    skip: !MarketPlace
  });

  const adsData=adsDataGql?.marketPlaceQuery?.getAllMarketPlaceAds

  // sold ad API
  const [
    soldAd,
    {
      data: soldAdData,
      isLoading: soldAdLoading,
      isError: soldAdError,
      error: soldAdErrorData,
    },
  ] = useSoldAdMutation();

  // delete ad API
  const [
    deleteAdAd,
    {
      data: deleteAdData,
      isLoading: deleteAdLoading,
      isError: deleteAdError,
      error: deleteAdErrorData,
    },
  ] = useDeleteAdMutation();

  // useEffect(() => {
  //   if (soldAdData?.statusCode === 200 || deleteAdData?.statusCode === 200) {
  //     showToast("success", soldAdData?.message || deleteAdData?.message);
  //   }

  //   if (soldAdError || deleteAdError) {
  //     showToast(
  //       "error",
  //       (soldAdErrorData as any)?.data?.message ||
  //         (deleteAdErrorData as any)?.data?.message
  //     );
  //   }
  // }, [soldAdData, deleteAdData, soldAdError, deleteAdError]);

  // useEffect for store detail of ads
  useEffect(() => {
    if (adsData && adsData?.data?.marketPlaceAds?.length > 0) {
      setaddDetail(adsData?.data?.marketPlaceAds[0]);
      setisadofCurrentUser(
        JSON.parse(localStorage.getItem("userProfile"))?.userProfileId ===
          adsData?.data?.marketPlaceAds[0]?.userContext
            ?.createdByUserId
      );
    }
  }, [adsData]);

  // culumn for table
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => {
          return <span>{row?.original?.name ? row?.original?.name : "-"}</span>;
        },
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: ({ row }) => {
          return (
            <span>{row?.original?.email ? row?.original?.email : "-"}</span>
          );
        },
      },
      {
        header: "Phone No",
        accessorKey: "phoneNo",
        cell: ({ row }) => {
          return (
            <span>{row?.original?.phoneNo ? row?.original?.phoneNo : "-"}</span>
          );
        },
      },
      {
        header: "Offered Price",
        accessorKey: "offerPrice",
        cell: ({ row }) => {
          return (
            <span>
              ${row?.original?.offerPrice ? row?.original?.offerPrice : "-"}
            </span>
          );
        },
      },
      // {
      //     header: "Message",
      //     accessorKey: "message",
      //     cell: ({ row }) => {
      //         return (
      //             <div>
      //                 {row?.original?.message ? row?.original?.message : "-"}
      //             </div>
      //         );
      //     },
      // },
      {
        header: "Message",
        accessorKey: "message",
        enableSorting: false,
        cell: ({ row }) => {
          const message = row.original.message || "-";
          const words = message.split(/\s+/); // Split by whitespace
          const truncated = words.slice(0, 10).join(" "); // Get the first 500 words
          return truncated.length < message.length
            ? `${truncated}...`
            : truncated; // Add ellipsis if truncated
        },
      },
    ],
    []
  );

  // const [step, setStep] = useState<"inquiry" | "otp" | "success" | null>(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: { name: "", phoneNo: "", email: "", offerPrice: "", message: "" },
    step2: { otp: "" },
  });
  const [inquiryId, setInquiryId] = useState(null);


  const { setBreadcrumbs } = useBreadcrumbs();
  
    useEffect(() => {
      setBreadcrumbs([{ name: "propVIVO", href: "/" }, { name: "Marketplace" }]);
    }, [setBreadcrumbs]);


    const swipCss = `.adsDetails .swiper-button-prev {left: auto;right: 50px;}
    .adsDetails .mySwiper .swiper-slide {min-width: 100%;height: 75px;}
    .adsDetails .swiper-thumbs .swiper-wrapper{flex-direction:}
    .adsDetails .mySwiper {height: 400px; }`

  return (
    <>
    <style>{swipCss}</style>
      <TopBanner
        backgroundImage="../img/aboutBanner.jpg"
        title="Marketplace"
      />
      <div className="py-9 md:py-16 relative bg-associationLightBlue">
        <img
          src="../img/mapShape.png"
          className="absolute top-0 left-0 right-0 w-full h-full z-0 object-contain object-top"
        />
        <div className="relative">
          <div className="container">
            <SubHeading text="Ad Details" />
            {adsDataLoading ? (
                <CenteredLoader />
              ) : adsData?.data !== null ? (
              <div className="mt-9">
                {/* <div className="flex items-center justify-between gap-3 p-5"> */}
                {/* <div className='flex items-center gap-3'>
                            <h1 className="text-22 font-semibold">{addDetail?.title} ({addDetail?.category})</h1>
                            <span className="text-green-600 font-medium">{StatusPill("", { value: addDetail?.productStatus })}</span>
                        </div>  */}

                <div className="">
                  {/* Description */}
                  <div className="grid grid-cols-1 md:grid-cols-54-42 gap-5 md:gap-10 adsDetails items-center max-w-970 mx-auto">
                    <div className="flex md:grid grid-cols-10 flex-col-reverse gap-5">
                      <Swiper
                        onSwiper={setThumbsSwiper}
                        direction="vertical"
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper rounded-md w-75 col-span-2"
                      >
                        {addDetail?.documents?.length > 0 &&
                          addDetail?.documents?.map((item, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <img
                                  src={item?.uri}
                                  alt="Loading..."
                                  className={`w-full h-full object-cover rounded-lg cursor-pointer ${
                                    index === activeIndex
                                      ? "opacity-100"
                                      : "opacity-50"
                                  }`}
                                  // className="w-full h-48 object-cover rounded-lg cursor-pointer"
                                  // width={75}
                                  // height={75}
                                  // loader={renderExternalImage}
                                />
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                      <Swiper
                        style={{
                          maxHeight: "400px",
                          width: "100%",
                        }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        onSlideChange={(swiper) =>
                          setActiveIndex(swiper.activeIndex)
                        }
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2 rounded-md col-span-8"
                      >
                        {addDetail?.documents?.length > 0 &&
                          addDetail?.documents?.map((item, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <Image
                                  src={item?.uri}
                                  alt="Loading..."
                                  // w-full h-48 object-cover
                                  className="w-auto h-full object-cover border border-gray-p-350"
                                  layout="responsive"
                                  width={400}
                                  height={400}
                                  loader={renderExternalImage}
                                />
                                {/* <img key={index} src={item?.uri} /> */}
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                    </div>

                    <div className="bg-white p-8 rounded-lg">
                      {/* addDetail?.productStatus?.trim().replace(/\s+/g, "")?.toLowerCase() === "sold" ? addDetail?.soldPrice :  */}

                      <div className="flex items-center justify-between gap-1">
                        <div className="flex flex-col gap-1">
                          {/* title */}
                          <div className="flex items-center">
                            <span className="text-xl md:text-22 leading-none font-medium break-all line-clamp-2 font-outfit">
                              {addDetail?.title} {`(${addDetail?.category})`}
                            </span>
                          </div>

                          <div className="text-associationGray font-karla text-lg">
                            {addDetail?.productStatus}
                          </div>

                          <div
                            className={`text-22 font-medium text-carrotOrange mt-5 ${
                              addDetail?.productStatus
                                ?.trim()
                                .replace(/\s+/g, "")
                                ?.toLowerCase() === "sold" && "line-through"
                            }`}
                          >
                            ${addDetail?.price}
                          </div>
                          <div className="text-associationGray space-y-3 mt-3">
                            <div className="flex gap-2 items-center">
                              <MapIcon /> {addDetail?.cityName},{" "}
                              {addDetail?.stateName} - {addDetail?.zipCode}
                            </div>
                            <div className="flex gap-2 items-center">
                              <AssociationCalenderIcon />
                              {formatDateWithMonth(
                                addDetail?.userContext?.createdOn,
                                false
                              )}
                            </div>
                          </div>

                          <div className="mt-5">
                            {!isadofCurrentUser && (
                              <button
                                onClick={() => setAddInquire(true)}
                                // onClick={() => setStep("inquiry")}
                                className="px-8 py-3 flex items-center gap-2 text-white rounded-full group font-outfit bg-btnDarkBlue shadow-associationBtnshadow text-base"
                              >
                                Enquire Now{" "}
                                <ArrowIcon className="group-hover:translate-x-1 transition-all duration-300" />
                              </button>
                            )}
                          </div>
                        </div>
                        {isadofCurrentUser &&
                          addDetail?.productStatus === "Available" && (
                            <div className="flex items-center space-x-2 pr-2">
                              {/* Sold Button */}
                              <button
                                onClick={() => {
                                  setisPopUpOpen({
                                    ...isPopUpOpen,
                                    isSold: true,
                                  });
                                }}
                                className="flex items-center gap-1 space-x-1 bg-green-600 text-white px-4 py-2 rounded"
                              >
                                <CheckIconMarketPlace />
                                <span>Sold</span>
                              </button>

                              {/* Edit Icon */}
                              <button
                                onClick={() => {
                                  setAdEdit(true);
                                }}
                                className="flex items-center bg-marketplaceLightBlue justify-center w-10 h-10 border rounded text-gray-500 hover:bg-gray-100"
                              >
                                <EditIconMarketPlace />
                              </button>

                              {/* Delete Icon */}
                              <button
                                onClick={() => {
                                  setisPopUpOpen({
                                    ...isPopUpOpen,
                                    isDelete: true,
                                  });
                                }}
                                className="flex items-center  bg-marketplaceLightBlue justify-center w-10 h-10 border rounded text-gray-500 hover:bg-gray-100"
                              >
                                <DeleteIconMarketPlace />
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg mt-11">
                  <div className="flex items-center gap-3 font-medium text-22 text-black-b-250 font-outfit pb-5 border-b border-gray-o-50">
                    <DescriptionIcon /> Description
                  </div>
                  <p className="mt-5 text-associationGray text-lg break-words font-karla">
                    {addDetail?.description}
                  </p>
                </div>

                {step === 1 && (
                  <SimpleModal
                    isOpen={addInquire}
                    onClose={() => {
                      setAddInquire(false);
                      setStep(1);
                      setFormData({
                        step1: {
                          name: "",
                          phoneNo: "",
                          email: "",
                          offerPrice: "",
                          message: "",
                        },
                        step2: {
                          otp: "",
                        },
                      });
                    }}
                    header="Make Enquiry"
                    details={
                      <>
                        <MakeInquiry
                          hideModal={() => {
                            setAddInquire(false);
                            setStep(1);
                          }}
                          price={addDetail?.price}
                          marketPlaceId={addDetail?.marketPlaceAdId}
                          nextStep={() => setStep(2)}
                          setFormData={setFormData}
                          formData={formData}
                          setInquiryId={(value) => setInquiryId(value)}
                        />
                      </>
                    }
                  />
                )}
                {step === 2 && (
                  <SimpleModal
                    isOpen={addInquire}
                    onClose={() => {
                      setAddInquire(false);
                      setStep(1);
                      setFormData({
                        step1: {
                          name: "",
                          phoneNo: "",
                          email: "",
                          offerPrice: "",
                          message: "",
                        },
                        step2: {
                          otp: "",
                        },
                      });
                    }}
                    header="Verify OTP"
                    details={
                      <>
                        <VerifyOTP
                          hideModal={() => {
                            setAddInquire(false);
                            setStep(1);
                          }}
                          setFormData={setFormData}
                          formData={formData}
                          marketPlaceId={addDetail?.marketPlaceAdId}
                          inquiryId={inquiryId}
                          nextStep={() => setStep(3)}
                          phoneNo={formData.step1.phoneNo}
                        />
                      </>
                    }
                  />
                )}

                {step === 3 && (
                  <SuccessPopup message="Enquiry Successfully Sent!" />
                )}
              </div>
            ) : (
              <NoDataFound
                  headermessage="No Ad Found"
                  message=""
                  isBtn={false}
                />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

MarketPlaceDetailView.noAuth = true;

export default MarketPlaceDetailView;

export function StatusPill(row, { value }) {
  const status = value
    ? value.toLowerCase()
    : row?.cell?.row?.original?.Status
    ? row?.cell?.row?.original?.Status.toLowerCase()
    : "unknown";

  return (
    <div className="flex">
      <span
        className={classNames(
          "paddingXStatusPill text-sm py-1 px-2 capitalize leading-wide rounded-full",
          status.startsWith("available")
            ? "bg-lightGreen text-mediumShadeOfGreen"
            : null,
          status.startsWith("sold") ? "bg-whitePink text-pvRed" : null
        )}
      >
        {status}
      </span>
    </div>
  );
}
