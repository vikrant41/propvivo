import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFilterData } from "../../slices/FilterSlice/filterSlice";
import { filterTabValue, optinalFilterTabValue } from "../../slices/filterTab";
import { useGetMarketplaceQuery } from "../../slices/MarketPlace";
import TopBanner from "../../components/CommonComponents/TopBanner";
import SubHeading from "../../components/CommonComponents/SubHeading";
import CardView from "../../components/Marketplace/CardView";
import { useBreadcrumbs } from "../../contexts/BreadCrumbContext";

const AllMarketPlace = () => {
  const reduxData = useSelector(getFilterData);
  const SelectedFilter = useSelector(filterTabValue);
  const optionalFilter = useSelector(optinalFilterTabValue);

  const [addAdds, setAddAdds] = useState<boolean>(false);

  const [selectedTab, setselectedTab] = useState(
    JSON.parse(
      typeof window !== "undefined" &&
        localStorage.getItem("MarketePlaceCurrentTab")
    ) || 0
  );

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([{ name: "PropVivo", href: "/" }, { name: "Marketplace" }]);
  }, [setBreadcrumbs]);

  // get all marketplace API
  const {
    data: marketPlaceData,
    isFetching: marketPlaceLoading,
    isError: marketPlaceError,
  } = useGetMarketplaceQuery(
    {
      "PageCriteria.EnablePage": false,
      "RequestParam.MarketPlaceAdContext": "AllAds",
      "RequestParam.CategoryId": reduxData?.data["Category"]?.join(","),
      "RequestParam.ProductStatus":
        SelectedFilter?.name === "All" ? "Available" : SelectedFilter?.name,
      "RequestParam.UserId": JSON.parse(
        typeof window !== "undefined" && localStorage.getItem("userProfile")
      )?.userProfileId,
    },
    {
      // skip: selectedTab === 1 && SelectedFilter?.name !== "All",
      skip: selectedTab === 1 && SelectedFilter?.name !== "All",
    }
  );

  return (
    <>
      <TopBanner backgroundImage="../img/Banner.jpg" title="Marketplace" />
      <div className="py-9 md:py-16 relative bg-associationLightBlue">
        <img
          src="../img/mapShape.png"
          className="absolute top-0 left-0 right-0 w-full h-full z-0 object-contain object-top"
        />
        <div className="relative">
          <div className="container">
            <SubHeading text="All Ads" />
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-14">
                <CardView
                  data={marketPlaceData?.data?.getAllMarketPlaceAdItems}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMarketPlace;
