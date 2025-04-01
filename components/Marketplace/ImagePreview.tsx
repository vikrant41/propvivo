import { useEffect, useState } from "react";
import Image from "next/image";
import { CloseIcon, LeftArrowIcon, RightArrowIcon } from "../shared/Icons";


export const ImagePreview = ({ isOpen, onClose, images, title, currentImageIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(currentImageIndex);

    useEffect(() => {
        setCurrentIndex(currentImageIndex);
    }, [currentImageIndex]);

    // Function to move to the previous image
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    // Function to move to the next image
    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex  items-center justify-center z-50">
            <div
                className="absolute z-0 inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-lg shadow-lg z-10 w-[600px] h-[600px] flex flex-col ">
                {" "}
                <div className="flex  items-center justify-between gap-4 py-3 md:py-3 px-4 md:px-4 bg-[#F9F9F9]">
                    <h3 className="text-black text-base break-all line-clamp-2">
                        {title}
                    </h3>
                    <div className="cursor-pointer" onClick={onClose}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="relative flex  mx-auto justify-center pt-1 items-center w-[500px] h-[500px]">
                    {" "}
                    {images && images.length > 0 && (
                        <Image
                            height={500}
                            width={500}
                            src={images[currentIndex]?.uri}
                            alt={`Image ${currentIndex + 1}`}
                            layout="fill"
                            loader={() => images[currentIndex]?.uri}
                            className="w-auto h-full object-contain rounded-lg"
                        />
                    )}

                </div>
                <div className="bg-[#F9F9F9] flex items-center justify-center gap-4 py-2 md:py-2 px-4 md:px-4">

                    {images && images.length > 0 && images.map((res, i) => {
                        return (
                            <div className="w-[56px] h-[56px] cursor-pointer" key={i}>
                                {/* <img
                                    src={res?.uri}
                                    alt={"Loading"}
                                    className={`w-full h-full object-cover rounded-lg ${currentIndex === i ? "opacity-100 " : "opacity-50"}`}
                                    loading="lazy"
                                    onClick={() => setCurrentIndex(i)}
                                /> */}

                                <Image
                                    src={res?.uri}
                                    height={56}
                                    width={56}
                                    className={`w-full h-full object-cover rounded-lg ${currentIndex === i ? "opacity-100 " : "opacity-50"}`}
                                    onClick={() => setCurrentIndex(i)}
                                    loader={() => res?.uri}

                                />
                            </div>
                        )
                    })

                    }

                </div>

                {/* Left Arrow */}
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex == 0}
                        className="absolute left-2 md:left-2 top-1/2 transform -translate-y-1/2  text-white  rounded-full"
                    >
                        <LeftArrowIcon />
                    </button>
                )}
                {/* Right Arrow */}
                {currentIndex < images.length - 1 && (
                    <button
                        onClick={handleNext}
                        disabled={currentIndex > images.length - 1}
                        className="absolute right-2 md:right-2 top-1/2 transform -translate-y-1/2  text-white rounded-full"
                    >
                        <RightArrowIcon />
                    </button>
                )}
            </div>
        </div>
    );
};
