import React, { useState } from "react";
import { Layout } from "antd";
import icon1 from "../../../public/images/audit2.png";
import Cards from "../../components/HomeCards/Cards";

const CardData = [
  {
    title: "Policy Record Karachi",
    icon: icon1,
    link: "/policy_records_karachi",
    dec: "you can add or Delete and also View Policy",
  },
  {
    title: "Prospect",
    icon: icon1,
    link: "/prospect",
    dec: "you can add or Delete and also View Prospect",
  },
];

const NewModule = () => {
  return (
    <div>
      <Layout className={`w-full bg-transparent`}>
        <div className="mt-8">
          <Cards data={CardData} />
        </div>
      </Layout>
      {/* <Fotter /> */}
    </div>
  );
};
export default NewModule;
