import { NoData } from "../shared/Icons";
import { Button } from "./Button";

export interface ndf {
  icon?: any;
  message?: string;
  headermessage?: string;
  isBtn?: boolean;
  btnName?: string;
  handleAddNewBtnClick?: () => void;
}

const NoDataFound = ({
  icon = <NoData />,
  headermessage = "No data found !",
  message = "Hey, Let’s quicky get started to create the first feature. It's quick, easy, and sets everything in motion!",
  isBtn = true,
  btnName,
  handleAddNewBtnClick,
}: ndf) => {
  return (
    <div className="flex justify-center items-center flex-col gap-5 px-5">
      <span className="mt-8 md:mt-12">{icon}</span>

      <div className="flex flex-col gap-2">
        <div className="text-black-b-250 text-center font-medium text-lg">
          {headermessage}
        </div>

        <div className="text-sm text-center font-medium text-gray-p-250">
          {message}
        </div>

        {isBtn && (
          <div className="mt-4 mx-auto">
            <Button className="w-auto" onClick={handleAddNewBtnClick}>
              {btnName ? btnName : "Create New"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { NoDataFound };
