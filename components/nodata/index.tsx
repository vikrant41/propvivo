import { XCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { SimpleButton } from "../shared/Button";

function Index({ tab, clickBulk, clickSingle }) {
  // function download(url, filename) {
  //   fetch(url).then(function (t) {
  //     return t.blob().then((b) => {
  //       var a = document.createElement("a");
  //       a.href = URL.createObjectURL(b);
  //       a.setAttribute("download", filename);
  //       a.click();
  //     });
  //   });
  // }

  return (
    <div className="text-gray-500 flex justify-center items-center m-2 h-72">
      <div className="m-5">
        {tab == "customer" ? (
          <>
            <div className="flex justify-center mt-5">No Customers Added</div>
            <div className="flex mb-5 mt-4">
              <SimpleButton
                className="px-5 py-1 bg-gray-600 text-white font-light m-2"
                onClick={() => clickBulk(true)}
              >
                Import Customers
              </SimpleButton>
              <SimpleButton
                className="px-5 py-1 flex justify-center text-gray-700 border mb-2"
                onClick={() => clickSingle(true)}
              >
                Add customer manually
              </SimpleButton>
            </div>
            {/* <div
              className="flex justify-center text-blue-500 mt-3 cursor-pointer">
            <a href="https://go.microsoft.com/fwlink/?LinkID=521962" download> Download Sample file</a>
            </div> */}
          </>
        ) : (
          <div className="flex-col">
            <span className="flex  justify-center">
              <XCircleIcon className="w-11 h-11 text-gray-400 " />
            </span>
            <span className="flex justify-center mb-2">No Data Found</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
