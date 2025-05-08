import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFilterData } from "../../slices/FilterSlice/filterSlice";
import { useGetMarketplaceQuery } from "../../slices/MarketPlace";

import SectionTitle from "../../components/CommonComponents/SectionTitle";
import { ArrowBlueIcon } from "../../components/shared/Icons";
import CardView from "../../components/Marketplace/CardView";
import { filterTabValue, optinalFilterTabValue } from "../../slices/filterTab";
import TopBanner from "../../components/CommonComponents/TopBanner";
import { useBreadcrumbs } from "../../contexts/BreadCrumbContext";
import { useQuery } from "@apollo/client";
import { MARKET_PLACE_QUERY } from "../../graphql/queries/MarketPlace";
import apiClient from "../../apollo/apiClient";
import CenteredLoader from "../../components/CommonComponents/CenterLoader";
import { NoDataFound } from "../../components/CommonComponents/DataNotFound";

const MarketPlace = () => {
  const reduxData = useSelector(getFilterData);
  const SelectedFilter = useSelector(filterTabValue);
  const optionalFilter = useSelector(optinalFilterTabValue);
  const [addAdds, setAddAdds] = useState<boolean>(false);

  const [selectedTab, setselectedTab] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("MarketePlaceCurrentTab")) || 0;
    }
    return 0; // Default value for SSR
  });

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([{ name: "PropVivo", href: "/" }, { name: "Marketplace" }]);
  }, [setBreadcrumbs]);

  // get all marketplace API
  const {
    data: marketPlaceDataGql,
    loading: marketPlaceLoading,
    error: marketPlaceError,
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
          marketPlaceAdContext: "AllAds",
          categoryId: reduxData?.data["Category"]?.join(","),
          productStatus:
            SelectedFilter?.name === "All" ? "allads" : SelectedFilter?.name,
        },
      },
    },
    skip: selectedTab === 1 && SelectedFilter?.name !== "All",
  });

  const marketPlaceData =
    marketPlaceDataGql?.marketPlaceQuery?.getAllMarketPlaceAds;

  // {console.log(localStorage, "localStorage")}

  return (
    <>
      <TopBanner backgroundImage="./img/Banner.jpg" title="Marketplace" />
      <div className="py-9 md:py-16 relative bg-associationLightBlue">
        <img
          src="./img/mapShape.png"
          className="absolute top-0 left-0 right-0 w-full h-full z-0"
        />
        <div className="relative">
          <div className="container">
            <SectionTitle
              subtitle="Market Place"
              title="What’s New in Store"
              content={
                <>
                  Find great deals on products you need <br />
                  Click on any ad to get full details and connect with sellers
                  directly. Don’t miss out!
                </>
              }
            />
            {console.log(marketPlaceData?.data?.marketPlaceAds, "marketPlaceData?.data?.marketPlaceAds")}
            {marketPlaceData?.data?.marketPlaceAds != undefined && (
              <div className="w-full text-right">
                <div className="inline-block">
                  <a
                    href="../MarketPlace/AllMarketPlace"
                    className="flex items-center justify-end gap-2 text-lg underline text-primary-o-600 hover:text-primary-o-550 transition duration-300 font-lato"
                  >
                    View All <ArrowBlueIcon />{" "}
                  </a>
                </div>
              </div>
            )}
            <div>
              {marketPlaceData?.data?.marketPlaceAds === undefined ? (
                <NoDataFound
                  headermessage="No Ad Found"
                  message=""
                  isBtn={false}
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-9">
                    <CardView
                      data={marketPlaceData?.data?.marketPlaceAds?.slice(0, 4)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
