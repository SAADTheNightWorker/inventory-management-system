import React, { useEffect, useState } from "react";
import FilterSection from "../../../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteAgent,
  getAgent,
  updateAgent,
} from "../../../../store/actionApis/agentAPi";
import TableSection from "../../../components/table/TableSection";
import { useColumnSearch } from "../../../components/table/TablesFilter";
import Delete from "../../../components/Modal/Delete";
import Edit from "../../../components/Modal/Edit";
import { notification } from "antd";
import { TrashIcon } from "@heroicons/react/24/solid";
import { EditFilled } from "@ant-design/icons";

const editfields = [
  {
    title: "Agent",
    key: "agent",
    type: "text",
  },
];

const Agents = () => {
  const clientData = useSelector((state) => state?.agent?.agents?.payload);
  // const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { getColumnSearchProps } = useColumnSearch(setFilteredData, clientData);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [Id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (clientData?.length > 0) {
        // setTableData(clientData);
        setFilteredData(clientData);
      }
    };
    fetchData();
  }, [clientData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getAgent()).unwrap();
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
  //   const fetchData = async () => {
  //     await dispatch(getAgent());
  //   };
  //   fetchData();
  // }, [dispatch]);

  const EditModal = (record) => {
    setId(record?.id);
    setIsEditModalOpen(true);
    setEditData(record);
  };

  const EditFinish = async (data) => {
    const formatedData = {
      agent: data?.agent,
      id: Id,
    };

    try {
      const res = await dispatch(updateAgent(formatedData));
      if (res.payload.success === true) {
        notification.success({
          message: "Updated",
          description: "Agent has been updated successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getAgent());
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
      const res = await dispatch(DeleteAgent(formatedData));

      if (res.payload.success === true) {
        notification.success({
          message: "Deleted",
          description: "Agent has been deleted successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getAgent());
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
        description: err.message || "Error while deleting client",
        placement: "topRight",
        showProgress: true,
      });
    }
  };

  const columns = [
    {
      title: "Agent",
      key: "agent",
      dataIndex: "agent",
      width: "90%",
      ...getColumnSearchProps("agent"),
      sorter: (a, b) => a.agent.length - b.agent.length,
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
    <div className=" relative">
      <div className="m-4">
        <div className="pr-10 max-sm:pr-3">
          <FilterSection formType="agent" />
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
        text={"Agent"}
        handelDelete={handelDelete}
      />
      <Edit
        title={"Edit Agent"}
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

export default Agents;
