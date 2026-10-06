import React, { useEffect, useState } from "react";
import FilterSection from "../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import TableSection from "../components/table/TableSection";
import { useColumnSearch } from "../components/table/TablesFilter";
import { Button, Modal, notification } from "antd";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Delete from "../components/Modal/Delete";
import Edit from "../components/Modal/Edit";
import { TrashIcon } from "@heroicons/react/24/solid";
import { EditFilled } from "@ant-design/icons";
import {
  DeletePolicyRecordSec,
  getPolicyRecordsSec,
  updatePolicyRecordsSec,
} from "../../store/actionApis/policyRecordSecApi";
import { jwtDecode } from "jwt-decode";

// const editDataUpload = [
//   { key: "policyPaymentDoc", title: "Policy Payment Doc", type: "upload" },
// ];

const PolicyRecordSec = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [pdfFile, setPdfFile] = useState();
  const handleOk = () => {
    setActiveModal(null);
  };
  const handleCancel = () => {
    setActiveModal(null);
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handlePdf = (pdf_file, key) => {
    console.log(pdf_file);
    const modalKey = `${pdf_file}_${key}`;
    setActiveModal(modalKey);

    if (pdf_file) {
      setFileUrl(pdf_file);
    } else {
      notification.warning({
        message: "No PDF Available",
        description: "No PDF associated with this task.",
        placement: "topRight",
      });
    }
  };
  const PolicyData = useSelector(
    (state) => state?.policyRecordSec?.PolicyRecordSec?.payload,
  );
  // console.log(PolicyData);

  // const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { getColumnSearchProps } = useColumnSearch(setFilteredData, PolicyData);
  const [editData, setEditData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const clientData = useSelector((state) => state?.clients?.clients?.payload);
  const brokerData = useSelector((state) => state?.broker?.broker?.payload);
  const companyData = useSelector(
    (state) => state?.company?.companyName?.payload,
  );
  const agentData = useSelector((state) => state?.agent?.agents?.payload);
  console.log(companyData);

  // Data map
  const ClientData = clientData?.map((item) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });
  const BrokerData = brokerData?.map((item) => {
    return {
      label: item?.broker,
      value: item?.id,
    };
  });
  const CompanyData = companyData?.map((item) => {
    return {
      label: item?.company,
      value: item?.id,
    };
  });
  const AgentData = agentData?.map((item) => {
    return {
      label: item?.agent,
      value: item?.id,
    };
  });

  const editfields = [
    {
      key: "clientId",
      title: "Client",
      type: "select",
      options: ClientData,
    },

    {
      key: "scbrokerNameId",
      title: "SC Broker Name",
      type: "select",
      options: BrokerData,
    },
    {
      key: "scIncCompanyId",
      title: "Inc Company Name",
      type: "select",
      options: CompanyData,
    },
    {
      key: "agnentNameId",
      title: "Agent Name",
      type: "select",
      options: AgentData,
    },
    {
      key: "chassisNumber",
      title: "Invoice Number",
      type: "text",
    },
    {
      key: "netPolicyAmount",
      title: "Tax Invoice Amount",
      type: "number",
    },
    {
      key: "creditNoteAmount",
      title: "Emirate",
      type: "text",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (PolicyData?.length > 0) {
        // setTableData(clientData);
        setFilteredData(PolicyData);
      }
    };
    fetchData();
  }, [PolicyData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const res = await dispatch(getPolicyRecordsSec()).unwrap();
        console.log("Response:", res);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // Get User

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    setUserId(decode?.id);
  }, []);

  // useEffect(() => {
  //   dispatch(getPolicyRecords());
  // }, [dispatch]);

  const DeleteModal = (record) => {
    setId(record?.id);
    setOpen(true);
  };

  const handelDelete = async () => {
    const formatedData = { id: Id };
    try {
      const res = await dispatch(DeletePolicyRecordSec(formatedData));

      if (res.payload.success === true) {
        notification.success({
          message: "Deleted",
          description: "Policy Record has been deleted successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getPolicyRecordsSec());
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

  const EditModal = (record) => {
    setId(record?.id);
    setIsEditModalOpen(true);
    setEditData(record);
  };

  const EditFinish = async (data) => {
    console.log(data);

    // setIsSubmit(true);

    const formData = new FormData();

    // // Append fields
    // formData.append("id", Id);

    // formData.append("dateOfIssue", data.dateOfIssue);
    // formData.append("netPolicyAmount", data.netPolicyAmount);
    // formData.append("creditNoteAmount", data.creditNoteAmount);

    // formData.append("texInvoiceDoc", data.texInvoiceDoc);

    // formData.append("createdBy", userId);

    // Log the formData entries
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${keyin value);
    // }

    const formatedData = {
      createdBy: userId,
      id: Id,
      ...data,
    };
    console.log(formatedData);

    try {
      const response = await dispatch(updatePolicyRecordsSec(formatedData));
      // console.log("CHECK", response);
      if (response?.payload?.success === true) {
        // setIsSubmit(false);
        setLoading(false);
        notification.success({
          message: "Poicy Record Updated!",
          description: `Policy Record Karachi is added`,
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getPolicyRecordsSec());
        setOpen(false);
        // reset();
        // emptyAllState();
      } else {
        // setIsSubmit(false);
        notification.error({
          message: "Policy Record Karachi Failed to Update",
          description:
            "The Policy Record Karachi could not be Updated due to an unexpected error.",
          placement: "topRight",
          showProgress: true,
        });
      }
    } catch (error) {
      // setIsSubmit(false);
      notification.error({
        message: "Error",
        description: error.message,
        placement: "topRight",
      });
    } finally {
      setPdfFile({});
      setIsEditModalOpen(false);
      // setLoading(false);
    }
  };

  const columns = [
    {
      title: "Client Name",
      key: "clientName",
      dataIndex: "clientName",
      width: 260,
      ...getColumnSearchProps("clientName"),
      sorter: (a, b) => a.clientName.length - b.clientName.length,
    },
    {
      title: "SC Broker Name",
      key: "brokerName",
      dataIndex: "brokerName",
      width: 180,
      ...getColumnSearchProps("brokerName"),
      sorter: (a, b) => a.brokerName.length - b.brokerName.length,
    },
    {
      title: "SC company Name",
      key: "companyName",
      dataIndex: "companyName",
      width: 180,
      ...getColumnSearchProps("companyName"),
      sorter: (a, b) => a.companyName.length - b.companyName.length,
    },
    {
      title: "Claim Wolf Agent Name",
      key: "agentName",
      dataIndex: "agentName",
      width: 220,
      ...getColumnSearchProps("agentName"),
      sorter: (a, b) => a.agentName.length - b.agentName.length,
    },
    {
      title: "Invoice Number",
      key: "chassisNumber",
      dataIndex: "chassisNumber",
      width: 140,
      ...getColumnSearchProps("chassisNumber"),
      sorter: (a, b) => a.chassisNumber.length - b.chassisNumber.length,
    },
    {
      title: "Issue Date",
      key: "dateOfIssue",
      dataIndex: "dateOfIssue",
      width: 180,
      ...getColumnSearchProps("dateOfIssue"),
      sorter: (a, b) => a.dateOfIssue - b.dateOfIssue,
      render: (text, record) => (
        <span>{new Date(record.dateOfIssue).toLocaleString()}</span>
      ),
    },
    {
      title: "Tax Invoice Amount",
      key: "netPolicyAmount",
      dataIndex: "netPolicyAmount",
      width: 180,
      ...getColumnSearchProps("netPolicyAmount"),
      sorter: (a, b) => a.netPolicyAmount - b.netPolicyAmount,
    },
    {
      title: "Emirate",
      key: "creditNoteAmount",
      dataIndex: "creditNoteAmount",
      width: 140,
      ...getColumnSearchProps("creditNoteAmount"),
      sorter: (a, b) => a.creditNoteAmount - b.creditNoteAmount,
    },
    {
      title: "Tex Invoice Doc",
      key: "texInvoiceDoc",
      dataIndex: "texInvoiceDoc",
      width: 140,
      sorter: (a, b) => a.texInvoiceDoc - b.texInvoiceDoc,
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="btn"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => {
                  if (row !== null && row !== undefined) {
                    handlePdf(row, "texInvoiceDoc");
                  }
                }}
              >
                View File
              </Button>
              <Modal
                open={activeModal === `${row}_texInvoiceDoc`}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                style={{
                  height: "80vh",
                  overflowY: "hidden",
                  top: "5vh",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
                bodyStyle={{
                  height: "100%",
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "calc(80vh - 50px)",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                    {fileUrl ? (
                      <div
                        style={{
                          width: "95%",
                          height: "100%",
                          borderRadius: "8px",
                          overflow: "hidden",
                          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                          backgroundColor: "#f8f8f8",
                          padding: "10px",
                        }}
                      >
                        <Viewer
                          fileUrl={fileUrl}
                          plugins={[defaultLayoutPluginInstance]}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 mt-4">
                        No PDF associated with this question.
                      </p>
                    )}
                  </Worker>
                </div>
              </Modal>
            </div>
          ) : (
            <Button
              type="default"
              className="px-11 bg-gray-300 text-gray-600 font-semibold"
              disabled
            >
              No File
            </Button>
          )}
        </div>
      ),
    },

    // Add other columns here
    {
      title: "Action",
      key: "action",
      width: 100,
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
          <FilterSection formType="policy_records_sec" />
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
        text={"Policy Record Karachi"}
        handelDelete={handelDelete}
      />

      <Edit
        title={"Edit Policy Record Karachi"}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        editFields={editfields}
        editData={editData}
        onEditFinish={EditFinish}
        modalType={"Revenue_Record"}
        // editDataUpload={editDataUpload}
        setPdfFile={setPdfFile}
        pdfFile={pdfFile}
      />
    </div>
  );
};

export default PolicyRecordSec;
