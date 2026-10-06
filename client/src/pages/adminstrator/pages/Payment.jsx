import React, { useEffect, useState } from "react";
import FilterSection from "../../../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "../../../../store/actionApis/clientApi";
import TableSection from "../../../components/table/TableSection";
import { useColumnSearch } from "../../../components/table/TablesFilter";
import {
  DeletePayment,
  getPayment,
  updatePayment,
} from "../../../../store/actionApis/paymentApi";
import Delete from "../../../components/Modal/Delete";
import Edit from "../../../components/Modal/Edit";
import { notification } from "antd";
import { TrashIcon } from "@heroicons/react/24/solid";
import { EditFilled } from "@ant-design/icons";

const editfields = [
  {
    title: "Payment",
    key: "payment",
    type: "text",
  },
];

const Payment = () => {
  const paymentData = useSelector((state) => state?.payment?.payments?.payload);
  // const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { getColumnSearchProps } = useColumnSearch(
    setFilteredData,
    paymentData,
  );
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (paymentData?.length > 0) {
        // setTableData(clientData);
        setFilteredData(paymentData);
      }
    };
    fetchData();
  }, [paymentData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getPayment()).unwrap();
        console.log("Response:", res);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getPayment());
  // }, [dispatch]);

  const EditModal = (record) => {
    setId(record?.id);
    setIsEditModalOpen(true);
    setEditData(record);
  };

  const EditFinish = async (data) => {
    const formatedData = {
      payment: data?.payment,
      id: Id,
    };

    try {
      const res = await dispatch(updatePayment(formatedData));
      if (res.payload.success === true) {
        notification.success({
          message: "Updated",
          description: "Payment has been updated successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getPayment());
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Something went wrong",
        placement: "topRight",
      });
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const DeleteModal = (record) => {
    setId(record?.id);
    setOpen(true);
  };

  const handelDelete = async () => {
    const formatedData = { id: Id };
    try {
      const res = await dispatch(DeletePayment(formatedData));

      if (res.payload.success === true) {
        notification.success({
          message: "Deleted",
          description: "Payment has been deleted successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getPayment());
      } else {
        notification.error({
          message: "Error",
          description: res?.payload?.message || "Something went wrong",
          placement: "topRight",
          showProgress: true,
        });
      }
    } catch (err) {
      notification.error({
        message: "Error while deleting",
        description: err.message || "Error while deleting Policy Record",
        placement: "topRight",
        showProgress: true,
      });
    }
  };

  const columns = [
    {
      title: "Payment",
      key: "payment",
      dataIndex: "payment",
      width: "90%",
      ...getColumnSearchProps("payment"),
      sorter: (a, b) => a.payment.length - b.payment.length,
    },
    // Add other columns here
    {
      title: "Action",
      key: "action",
      width: "90%",
      fixed: "right",
      render: (text, record) => (
        <div className="flex gap-10 mr-10">
          <button
            className="text-red-600 font-bold rounded-full w-6"
            onClick={() => DeleteModal(record)}
          >
            <TrashIcon style={{ fontSize: "20px" }} />
          </button>
          <button
            className="text-black font-bold  rounded-full"
            onClick={() => EditModal(record)}
          >
            <EditFilled style={{ fontSize: "20px" }} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="relative">
      <div className="m-4">
        <div className="pr-10 max-sm:pr-3">
          <FilterSection formType="payment" />
        </div>

        <TableSection
          columns={columns}
          dataSource={filteredData}
          loading={loading}
        />
      </div>
      <Delete
        open={open}
        setOpen={setOpen}
        text={"Payment"}
        handelDelete={handelDelete}
      />
      <Edit
        title={"Edit Payment"}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        editFields={editfields}
        editData={editData}
        onEditFinish={EditFinish}
        modalType={"client"}
      />
    </div>
  );
};

export default Payment;
