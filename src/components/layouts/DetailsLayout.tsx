import { useCurrentNavItem } from "@/hooks/useCurrentNavItem";
import { faAngleLeft } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import { Link } from "react-router";
import ApprovalButtons from "@/Customers/components/ApprovalButtons";

const DetailsLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const currentItem = useCurrentNavItem();
  // const basePath = currentItem.path.replace(/\/details\/[^/]+$/, "");
  return (
    <>
      <div className="h-16 bg-white px-4 py-2 rounded-xl flex items-center justify-between">
        <div className="flex items-center  gap-x-4">
          <Link
            to={currentItem.path}
            className="size-10 border flex items-center   cursor-pointer border-Primary-200 rounded-full p-2">
            <FontAwesomeIcon
              className="size-6 text-Primary-500"
              icon={faAngleLeft}
            />
          </Link>
          <span className="text-Primary-500 font-bold text-[1.375rem]">
            {title}
          </span>
        </div>

        {currentItem.navLabel === "Customers" && <ApprovalButtons />}
      </div>
      <div className="bg-white rounded-xl p-6 overflow-y-scroll h-[calc(100dvh-13.75rem)]">
        {children}
      </div>
    </>
  );
};

export default DetailsLayout;
