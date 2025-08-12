import { faAngleLeft } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";

const DetailsLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const location = useLocation();
  const path = location.pathname.replace(/\/details\/\d+$/, "");
  return (
    <>
      <div className="h-16 bg-white px-4 py-2 rounded-xl flex items-center gap-x-4">
        <Link
          to={path}
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
      <div className="bg-white rounded-xl p-6 h-[calc(100dvh-13.75rem)]">
        <div className="border border-Primary-25 shadow-CS px-6 py-4 h-full rounded-xl">
          {children}
        </div>
      </div>
    </>
  );
};

export default DetailsLayout;
