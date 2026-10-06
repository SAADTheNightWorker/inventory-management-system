import React, { useState } from "react";
import { Layout } from "antd";
import icon1 from "../../../public/images/audit2.png";
import Cards from "../../components/HomeCards/Cards";

const CardData = [
  {
    title: "Policy Record",
    icon: icon1,
    link: "/policy_records",
    dec: "you can add or Delete and also View Policy",
  },
  {
    title: "Expired Policy Records",
    icon: icon1,
    link: "/expired_policy_records",
    dec: "you can Delete and also View Expired Policy Records",
  },
  {
    title: "Policy Record Karachi",
    icon: icon1,
    link: "/policy_records_karachi",
    dec: "you can add or Delete and also View Policy",
  },
];

const ManagePolicy = () => {
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
export default ManagePolicy;
