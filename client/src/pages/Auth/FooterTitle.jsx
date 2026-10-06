import React from "react";

const FooterTitle = () => {
  return (
    <footer className="border-t tracking-widest textTitle border-gray-300 mt-10 py-6 flex flex-col items-center text-center px-4">
      <p className="text-sm ">
        © {new Date().getFullYear()} CRM Platform. All rights reserved.
      </p>

      <p className="text-sm">
        Developed and maintained by{" "}
        <span className="font-medium ">
          M. Saad
        </span>
      </p>
    </footer>
  );
};

export default FooterTitle;
