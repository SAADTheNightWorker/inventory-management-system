// import React, { useEffect, useState } from "react";
// import FilterSection from "../components/FilterSection/FilterSection";
// import { useDispatch, useSelector } from "react-redux";
// import TableSection from "../components/table/TableSection";
// import { useColumnSearch } from "../components/table/TablesFilter";
// import {
//   DeletePolicyRecord,
//   getPolicyRecords,
//   updatePolicyRecords,
// } from "../../store/actionApis/policyRecordApi";
// import { Button, Modal, notification } from "antd";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import Delete from "../components/Modal/Delete";
// import Edit from "../components/Modal/Edit";
// import { TrashIcon } from "@heroicons/react/24/solid";
// import { EditFilled } from "@ant-design/icons";
// import { jwtDecode } from "jwt-decode";

// // const editDataUpload = [
// //   { key: "policyPaymentDoc", title: "Policy Payment Doc", type: "upload" },
// // ];

// const PolicyRecord = () => {
//   const [fileUrl, setFileUrl] = useState(null);
//   const [activeModal, setActiveModal] = useState(null);
//   const [pdfFile, setPdfFile] = useState();
//   const handleOk = () => {
//     setActiveModal(null);
//   };
//   const handleCancel = () => {
//     setActiveModal(null);
//   };

//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   const handlePdf = (pdf_file, key) => {
//     // console.log(pdf_file);
//     const modalKey = `${pdf_file}_${key}`;
//     setActiveModal(modalKey);

//     if (pdf_file) {
//       setFileUrl(pdf_file);
//     } else {
//       notification.warning({
//         message: "No PDF Available",
//         description: "No PDF associated with this task.",
//         placement: "topRight",
//       });
//     }
//   };
//   const PolicyData = useSelector(
//     (state) => state?.policyRecord?.policyRecord?.payload,
//   );
//   // const [tableData, setTableData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const { getColumnSearchProps } = useColumnSearch(setFilteredData, PolicyData);
//   const [editData, setEditData] = useState({});
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [Id, setId] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const clientData = useSelector((state) => state?.clients?.clients?.payload);
//   const brokerData = useSelector((state) => state?.broker?.broker?.payload);
//   const companyData = useSelector(
//     (state) => state?.company?.companyName?.payload,
//   );
//   const agentData = useSelector((state) => state?.agent?.agents?.payload);
//   console.log(companyData);

//   //   Filter states
//   const [selectColumn, setSelectColumn] = useState(null);
//   const [selectData, setSelectData] = useState(null);
//   const [selectDateColumn, setSelectDateColumn] = useState(null);
//   const [selectDateRange, setSelectDateRange] = useState([]);

//   useEffect(() => {
//     if (!PolicyData) return;

//     let updatedData = [...PolicyData];

//     if (selectColumn && selectData) {
//       updatedData = updatedData.filter((item) => {
//         const value = item?.[selectColumn];
//         if (value === null || value === undefined) return false;

//         return String(value).toLowerCase() === String(selectData).toLowerCase();
//       });
//     }

//     if (
//       selectDateColumn &&
//       selectDateRange &&
//       selectDateRange.length === 2 &&
//       selectDateRange[0] &&
//       selectDateRange[1]
//     ) {
//       const startDate = new Date(selectDateRange[0]);
//       startDate.setHours(0, 0, 0, 0);

//       const endDate = new Date(selectDateRange[1]);
//       endDate.setHours(23, 59, 59, 999);

//       updatedData = updatedData.filter((item) => {
//         const itemDate = item?.[selectDateColumn]
//           ? new Date(item[selectDateColumn])
//           : null;

//         if (!itemDate || isNaN(itemDate)) return false;

//         return itemDate >= startDate && itemDate <= endDate;
//       });
//     }

//     setFilteredData(updatedData);
//   }, [PolicyData, selectColumn, selectData, selectDateColumn, selectDateRange]);

//   // Filter END

//   // Data map
//   const ClientData = clientData?.map((item) => {
//     return {
//       label: item?.name,
//       value: item?.id,
//     };
//   });
//   const BrokerData = brokerData?.map((item) => {
//     return {
//       label: item?.broker,
//       value: item?.id,
//     };
//   });
//   const CompanyData = companyData?.map((item) => {
//     return {
//       label: item?.company,
//       value: item?.id,
//     };
//   });
//   const AgentData = agentData?.map((item) => {
//     return {
//       label: item?.agent,
//       value: item?.id,
//     };
//   });

//   const editfields = [
//     {
//       key: "clientId",
//       title: "Client",
//       type: "select",
//       options: ClientData,
//     },

//     {
//       key: "scbrokerNameId",
//       title: "SC Broker Name",
//       type: "select",
//       options: BrokerData,
//     },
//     {
//       key: "scIncCompanyId",
//       title: "Inc Company Name",
//       type: "select",
//       options: CompanyData,
//     },
//     {
//       key: "agnentNameId",
//       title: "Agent Name",
//       type: "select",
//       options: AgentData,
//     },
//     {
//       key: "chassisNumber",
//       title: "Invoice Number",
//       type: "text",
//     },
//     {
//       key: "netPolicyAmount",
//       title: "Tax Invoice Amount",
//       type: "number",
//     },
//     {
//       key: "creditNoteAmount",
//       title: "Emirate",
//       type: "text",
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         setLoading(true);
//         const res = await dispatch(getPolicyRecords()).unwrap();
//         // console.log("Response:", res);
//       } catch (error) {
//         console.error("Error fetching clients:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   // Get User

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const decode = jwtDecode(token);
//     setUserId(decode?.id);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (PolicyData?.length > 0) {
//         // setTableData(clientData);
//         setFilteredData(PolicyData);
//       }
//     };
//     fetchData();
//   }, [PolicyData]);

//   // useEffect(() => {
//   //   dispatch(getPolicyRecords());
//   // }, [dispatch]);

//   const DeleteModal = (record) => {
//     setId(record?.id);
//     setOpen(true);
//   };

//   const handelDelete = async () => {
//     const formatedData = { id: Id };
//     try {
//       const res = await dispatch(DeletePolicyRecord(formatedData));

//       if (res.payload.success === true) {
//         notification.success({
//           message: "Deleted",
//           description: "Policy Record has been deleted successfully",
//           placement: "topRight",
//           showProgress: true,
//         });
//         dispatch(getPolicyRecords());
//       } else {
//         notification.error({
//           message: "Error",
//           description: res?.payload?.message || "Something went wrong",
//           placement: "topRight",
//           showProgress: true,
//         });
//       }
//     } catch (err) {
//       notification.error({
//         message: "Error while deleting",
//         description: err.message || "Error while deleting Policy Record",
//         placement: "topRight",
//         showProgress: true,
//       });
//     }
//   };

//   const EditModal = (record) => {
//     setId(record?.id);
//     setIsEditModalOpen(true);
//     setEditData(record);
//   };

//   const EditFinish = async (data) => {
//     console.log(data);

//     // setIsSubmit(true);

//     const formData = new FormData();

//     // // Append fields
//     // formData.append("id", Id);

//     // formData.append("dateOfIssue", data.dateOfIssue);
//     // formData.append("netPolicyAmount", data.netPolicyAmount);
//     // formData.append("creditNoteAmount", data.creditNoteAmount);

//     // formData.append("texInvoiceDoc", data.texInvoiceDoc);

//     // formData.append("createdBy", userId);

//     // Log the formData entries
//     // for (let [key, value] of formData.entries()) {
//     //   console.log(`${key}:`, value);
//     // }

//     const formatedData = {
//       createdBy: userId,
//       id: Id,
//       ...data,
//     };
//     console.log(formatedData);

//     try {
//       const response = await dispatch(updatePolicyRecords(formatedData));
//       // console.log("CHECK", response);
//       if (response?.payload?.success === true) {
//         // setIsSubmit(false);
//         setLoading(false);
//         notification.success({
//           message: "Poicy Record Updated!",
//           description: `Policy Record is added`,
//           placement: "topRight",
//           showProgress: true,
//         });
//         dispatch(getPolicyRecords());
//         setOpen(false);
//         // reset();
//         // emptyAllState();
//       } else {
//         // setIsSubmit(false);
//         notification.error({
//           message: "Policy Record Failed to Update",
//           description:
//             "The Policy Record could not be Updated due to an unexpected error.",
//           placement: "topRight",
//           showProgress: true,
//         });
//       }
//     } catch (error) {
//       // setIsSubmit(false);
//       notification.error({
//         message: "Error",
//         description: error.message,
//         placement: "topRight",
//       });
//     } finally {
//       setPdfFile({});
//       setIsEditModalOpen(false);
//       // setLoading(false);
//     }
//   };

//   const columns = [
//     {
//       title: "Client Name",
//       key: "clientName",
//       dataIndex: "clientName",
//       width: 260,
//       ...getColumnSearchProps("clientName"),
//       sorter: (a, b) => a.clientName.length - b.clientName.length,
//     },
//     {
//       title: "SC Broker Name",
//       key: "brokerName",
//       dataIndex: "brokerName",
//       width: 180,
//       ...getColumnSearchProps("brokerName"),
//       sorter: (a, b) => a.brokerName.length - b.brokerName.length,
//     },
//     {
//       title: "SC company Name",
//       key: "companyName",
//       dataIndex: "companyName",
//       width: 180,
//       ...getColumnSearchProps("companyName"),
//       sorter: (a, b) => a.companyName.length - b.companyName.length,
//     },
//     {
//       title: "Claim Wolf Agent Name",
//       key: "agentName",
//       dataIndex: "agentName",
//       width: 220,
//       ...getColumnSearchProps("agentName"),
//       sorter: (a, b) => a.agentName.length - b.agentName.length,
//     },
//     {
//       title: "Invoice Number",
//       key: "chassisNumber",
//       dataIndex: "chassisNumber",
//       width: 140,
//       ...getColumnSearchProps("chassisNumber"),
//       sorter: (a, b) => a.chassisNumber.length - b.chassisNumber.length,
//     },
//     {
//       title: "Issue Date",
//       key: "dateOfIssue",
//       dataIndex: "dateOfIssue",
//       width: 180,
//       ...getColumnSearchProps("dateOfIssue"),
//       sorter: (a, b) => a.dateOfIssue - b.dateOfIssue,
//       render: (text, record) => (
//         <span>{new Date(record.dateOfIssue).toLocaleString()}</span>
//       ),
//     },
//     {
//       title: "Expiry Date",
//       key: "expiryDate",
//       dataIndex: "expiryDate",
//       width: 180,
//       ...getColumnSearchProps("expiryDate"),
//       sorter: (a, b) => a.expiryDate - b.expiryDate,
//       render: (text, record) => (
//         <span>{new Date(record.expiryDate).toLocaleString()}</span>
//       ),
//     },
//     {
//       title: "Tax Invoice Amount",
//       key: "netPolicyAmount",
//       dataIndex: "netPolicyAmount",
//       width: 180,
//       ...getColumnSearchProps("netPolicyAmount"),
//       sorter: (a, b) => a.netPolicyAmount - b.netPolicyAmount,
//     },
//     {
//       title: "Emirate",
//       key: "creditNoteAmount",
//       dataIndex: "creditNoteAmount",
//       width: 140,
//       ...getColumnSearchProps("creditNoteAmount"),
//       sorter: (a, b) => a.creditNoteAmount - b.creditNoteAmount,
//     },
//     {
//       title: "Policy Status",
//       key: "policyStatus",
//       dataIndex: "policyStatus",
//       width: 160,
//       ...getColumnSearchProps("policyStatus"),
//       sorter: (a, b) => a.policyStatus - b.policyStatus,
//       render: (text) => (
//         <div
//           className={`text-center rounded-full py-2 ${text === "Not Expired" ? "bg-[#00e335]/10 text-green-500" : "bg-[#e33100]/10 text-red-500"}`}
//         >
//           <span>{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Notification Status",
//       key: "notificationStatus",
//       dataIndex: "notificationStatus",
//       width: 180,
//       ...getColumnSearchProps("notificationStatus"),
//       sorter: (a, b) => a.notificationStatus - b.notificationStatus,
//       render: (text) => (
//         <div
//           className={`text-center rounded-full py-2 ${text === "Not Sent" ? "bg-[#e33100]/10 text-red-500" : "bg-[#00e335]/10 text-green-500"}`}
//         >
//           <span>{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Tex Invoice Doc",
//       key: "texInvoiceDoc",
//       dataIndex: "texInvoiceDoc",
//       width: 140,
//       fixed: "right",
//       // ...getColumnSearchProps("texInvoiceDoc"),
//       sorter: (a, b) => a.texInvoiceDoc - b.texInvoiceDoc,
//       render: (row, record, index) => (
//         <div key={index}>
//           {row ? (
//             <div>
//               <Button
//                 type="btn"
//                 className="px-10 font-semibold bg-[black]/90 text-white"
//                 onClick={() => {
//                   if (row !== null && row !== undefined) {
//                     handlePdf(row, "texInvoiceDoc");
//                   }
//                 }}
//               >
//                 View File
//               </Button>
//               <Modal
//                 open={activeModal === `${row}_texInvoiceDoc`}
//                 onOk={handleOk}
//                 onCancel={handleCancel}
//                 width={1000}
//                 style={{
//                   height: "80vh",
//                   overflowY: "hidden",
//                   top: "5vh",
//                   backgroundColor: "#ffffff", // Ensure white background
//                   borderRadius: "8px",
//                   overflow: "hidden",
//                   boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//                 }}
//                 bodyStyle={{
//                   height: "100%",
//                   padding: "10px",
//                   backgroundColor: "#ffffff",
//                   borderRadius: "8px",
//                   overflow: "hidden",
//                   boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "calc(80vh - 50px)", // Auto-adjust height
//                     overflow: "hidden",
//                     backgroundColor: "#ffffff",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
//                     {fileUrl ? (
//                       <div
//                         style={{
//                           width: "95%",
//                           height: "100%",
//                           borderRadius: "8px",
//                           overflow: "hidden",
//                           boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//                           backgroundColor: "#f8f8f8",
//                           padding: "10px",
//                         }}
//                       >
//                         <Viewer
//                           fileUrl={fileUrl}
//                           plugins={[defaultLayoutPluginInstance]}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                           }}
//                         />
//                       </div>
//                     ) : (
//                       <p className="text-center text-gray-500 mt-4">
//                         No PDF associated with this question.
//                       </p>
//                     )}
//                   </Worker>
//                 </div>
//               </Modal>
//             </div>
//           ) : (
//             <Button
//               type="default"
//               className="px-11 bg-gray-300 text-gray-600 font-semibold"
//               disabled
//             >
//               No File
//             </Button>
//           )}
//         </div>
//       ),
//     },
//     // {
//     //   title: "Policy Sechedule Doc",
//     //   key: "policySecheduleDoc",
//     //   dataIndex: "policySecheduleDoc",
//     //   width: 140,
//     //   // ...getColumnSearchProps("texInvoiceDoc"),
//     //   sorter: (a, b) => a.policySecheduleDoc - b.policySecheduleDoc,
//     //   render: (row, record, index) => (
//     //     <div key={index}>
//     //       {row ? (
//     //         <div>
//     //           <Button
//     //             type="btn"
//     //             className="px-10 font-semibold bg-[black]/90 text-white"
//     //             onClick={() => {
//     //               if (row !== null && row !== undefined) {
//     //                 handlePdf(row, "policySecheduleDoc");
//     //               }
//     //             }}
//     //           >
//     //             View File
//     //           </Button>
//     //           <Modal
//     //             open={activeModal === `${row}_policySecheduleDoc`}
//     //             onOk={handleOk}
//     //             onCancel={handleCancel}
//     //             width={1000}
//     //             style={{
//     //               height: "80vh",
//     //               overflowY: "hidden",
//     //               top: "5vh",
//     //               backgroundColor: "#ffffff", // Ensure white background
//     //               borderRadius: "8px",
//     //               overflow: "hidden",
//     //               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//     //             }}
//     //             bodyStyle={{
//     //               height: "100%",
//     //               padding: "10px",
//     //               backgroundColor: "#ffffff",
//     //               borderRadius: "8px",
//     //               overflow: "hidden",
//     //               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//     //             }}
//     //           >
//     //             <div
//     //               style={{
//     //                 width: "100%",
//     //                 height: "calc(80vh - 50px)", // Auto-adjust height
//     //                 overflow: "hidden",
//     //                 backgroundColor: "#ffffff",
//     //                 display: "flex",
//     //                 justifyContent: "center",
//     //                 alignItems: "center",
//     //               }}
//     //             >
//     //               <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
//     //                 {fileUrl ? (
//     //                   <div
//     //                     style={{
//     //                       width: "95%",
//     //                       height: "100%",
//     //                       borderRadius: "8px",
//     //                       overflow: "hidden",
//     //                       boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//     //                       backgroundColor: "#f8f8f8",
//     //                       padding: "10px",
//     //                     }}
//     //                   >
//     //                     <Viewer
//     //                       fileUrl={fileUrl}
//     //                       plugins={[defaultLayoutPluginInstance]}
//     //                       style={{
//     //                         width: "100%",
//     //                         height: "100%",
//     //                       }}
//     //                     />
//     //                   </div>
//     //                 ) : (
//     //                   <p className="text-center text-gray-500 mt-4">
//     //                     No PDF associated with this question.
//     //                   </p>
//     //                 )}
//     //               </Worker>
//     //             </div>
//     //           </Modal>
//     //         </div>
//     //       ) : (
//     //         <Button
//     //           type="default"
//     //           className="px-11 bg-gray-300 text-gray-600 font-semibold"
//     //           disabled
//     //         >
//     //           No File
//     //         </Button>
//     //       )}
//     //     </div>
//     //   ),
//     // },
//     // {
//     //   title: "Credit Note Doc",
//     //   key: "creditNoteDoc",
//     //   dataIndex: "creditNoteDoc",
//     //   width: 140,
//     //   // ...getColumnSearchProps("texInvoiceDoc"),
//     //   sorter: (a, b) => a.creditNoteDoc - b.creditNoteDoc,
//     //   render: (row, record, index) => (
//     //     <div key={index}>
//     //       {row ? (
//     //         <div>
//     //           <Button
//     //             type="btn"
//     //             className="px-10 font-semibold bg-[black]/90 text-white"
//     //             onClick={() => {
//     //               if (row !== null && row !== undefined) {
//     //                 handlePdf(row, "creditNoteDoc");
//     //               }
//     //             }}
//     //           >
//     //             View File
//     //           </Button>
//     //           <Modal
//     //             open={activeModal === `${row}_creditNoteDoc`}
//     //             onOk={handleOk}
//     //             onCancel={handleCancel}
//     //             width={1000}
//     //             style={{
//     //               height: "80vh",
//     //               overflowY: "hidden",
//     //               top: "5vh",
//     //               backgroundColor: "#ffffff", // Ensure white background
//     //               borderRadius: "8px",
//     //               overflow: "hidden",
//     //               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//     //             }}
//     //             bodyStyle={{
//     //               height: "100%",
//     //               padding: "10px",
//     //               backgroundColor: "#ffffff",
//     //               borderRadius: "8px",
//     //               overflow: "hidden",
//     //               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//     //             }}
//     //           >
//     //             <div
//     //               style={{
//     //                 width: "100%",
//     //                 height: "calc(80vh - 50px)", // Auto-adjust height
//     //                 overflow: "hidden",
//     //                 backgroundColor: "#ffffff",
//     //                 display: "flex",
//     //                 justifyContent: "center",
//     //                 alignItems: "center",
//     //               }}
//     //             >
//     //               <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
//     //                 {fileUrl ? (
//     //                   <div
//     //                     style={{
//     //                       width: "95%",
//     //                       height: "100%",
//     //                       borderRadius: "8px",
//     //                       overflow: "hidden",
//     //                       boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//     //                       backgroundColor: "#f8f8f8",
//     //                       padding: "10px",
//     //                     }}
//     //                   >
//     //                     <Viewer
//     //                       fileUrl={fileUrl}
//     //                       plugins={[defaultLayoutPluginInstance]}
//     //                       style={{
//     //                         width: "100%",
//     //                         height: "100%",
//     //                       }}
//     //                     />
//     //                   </div>
//     //                 ) : (
//     //                   <p className="text-center text-gray-500 mt-4">
//     //                     No PDF associated with this question.
//     //                   </p>
//     //                 )}
//     //               </Worker>
//     //             </div>
//     //           </Modal>
//     //         </div>
//     //       ) : (
//     //         <Button
//     //           type="default"
//     //           className="px-11 bg-gray-300 text-gray-600 font-semibold"
//     //           disabled
//     //         >
//     //           No File
//     //         </Button>
//     //       )}
//     //     </div>
//     //   ),
//     // },
//     {
//       title: "Created Time",
//       key: "createdAt",
//       dataIndex: "createdAt",
//       width: 180,
//       ...getColumnSearchProps("createdAt"),
//       sorter: (a, b) => a.createdAt - b.createdAt,
//       render: (text, record) => (
//         <span>{new Date(record.createdAt).toLocaleString()}</span>
//       ),
//     },
//     // Add other columns here
//     {
//       title: "Action",
//       key: "action",
//       width: 100,
//       fixed: "right",
//       render: (text, record) => (
//         <div className="flex gap-10 mr-10">
//           <button
//             className="text-red-600 font-bold rounded-full w-6"
//             onClick={() => DeleteModal(record)}
//           >
//             <TrashIcon style={{ fontSize: "20px" }} />
//           </button>
//           <button
//             className="text-black font-bold  rounded-full"
//             onClick={() => EditModal(record)}
//           >
//             <EditFilled style={{ fontSize: "20px" }} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="relative">
//       <div className="m-4">
//         <div className="pr-10 max-sm:pr-3">
//           <FilterSection
//             formType="policy_records"
//             columns={columns}
//             data={PolicyData || []}
//             selectColumn={selectColumn}
//             setSelectColumn={setSelectColumn}
//             setSelectData={setSelectData}
//             isDataFiltered={selectData}
//             selectDateColumn={selectDateColumn}
//             setSelectDateColumn={setSelectDateColumn}
//             setSelectDateRange={setSelectDateRange}
//           />
//         </div>

//         <TableSection
//           columns={columns}
//           dataSource={filteredData}
//           loading={loading}
//         />
//       </div>
//       <Delete
//         open={open}
//         setOpen={setOpen}
//         text={"Policy Record"}
//         handelDelete={handelDelete}
//       />

//       <Edit
//         title={"Edit Policy Record"}
//         isModalOpen={isEditModalOpen}
//         setIsModalOpen={setIsEditModalOpen}
//         editFields={editfields}
//         editData={editData}
//         onEditFinish={EditFinish}
//         modalType={"Revenue_Record"}
//         // editDataUpload={editDataUpload}
//         setPdfFile={setPdfFile}
//         pdfFile={pdfFile}
//       />
//     </div>
//   );
// };

// export default PolicyRecord;

import React, { useEffect, useMemo, useState } from "react";
import FilterSection from "../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import TableSection from "../components/table/TableSection";
import { useColumnSearch } from "../components/table/TablesFilter";
import {
  DeletePolicyRecord,
  getPolicyRecords,
  updatePolicyRecords,
} from "../../store/actionApis/policyRecordApi";
import {
  Badge,
  Button,
  Modal,
  notification,
  Progress,
  Skeleton,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Delete from "../components/Modal/Delete";
import Edit from "../components/Modal/Edit";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  EditFilled,
  CalendarOutlined,
  FileTextOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  EyeOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Info } from "@mui/icons-material";

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
        active
          ? "bg-[#009ce3] text-white border-[#009ce3]"
          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
      )}
      type="button"
    >
      {children}
    </button>
  );
}

function TopStatCard({
  loading,
  icon,
  label,
  value,
  subValue,
  accent = "from-sky-500 to-cyan-500",
  right,
  onClick,
  active,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Skeleton.Button
              active
              size="small"
              style={{ width: 110, height: 18 }}
            />
            <div className="mt-3">
              <Skeleton.Input
                active
                size="small"
                style={{ width: 150, height: 28 }}
              />
            </div>
            <div className="mt-3">
              <Skeleton.Input
                active
                size="small"
                style={{ width: 190, height: 16 }}
              />
            </div>
          </div>
          <Skeleton.Avatar active size={48} shape="circle" />
        </div>
      </div>
    );
  }

  return (
    <motion.button
      layout
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={clsx(
        "group relative overflow-hidden rounded-2xl border bg-white p-4 text-left shadow-sm transition-all duration-300",
        active
          ? "border-[#009ce3] ring-2 ring-[#009ce3]/15 shadow-md"
          : "border-gray-200 hover:border-sky-200 hover:shadow-md",
        onClick ? "cursor-pointer" : "cursor-default",
      )}
      type="button"
    >
      <div
        className={clsx(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          accent,
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
            {label}
          </p>
          <h3 className="mt-2 truncate text-2xl font-bold text-gray-900">
            {value}
          </h3>
          {subValue ? (
            <p className="mt-2 text-sm text-gray-500">{subValue}</p>
          ) : null}
        </div>

        <div
          className={clsx(
            "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm",
            accent,
          )}
        >
          {icon}
        </div>
      </div>

      {right ? <div className="mt-4">{right}</div> : null}
    </motion.button>
  );
}

const PolicyRecord = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [pdfFile, setPdfFile] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectColumn, setSelectColumn] = useState(null);
  const [selectData, setSelectData] = useState(null);
  const [selectDateColumn, setSelectDateColumn] = useState(null);
  const [selectDateRange, setSelectDateRange] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [shwoExtraDetails, setShwoExtraDetails] = useState(false);

  const dispatch = useDispatch();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const PolicyData = useSelector(
    (state) => state?.policyRecord?.policyRecord?.payload,
  );
  const clientData = useSelector((state) => state?.clients?.clients?.payload);
  const brokerData = useSelector((state) => state?.broker?.broker?.payload);
  const companyData = useSelector(
    (state) => state?.company?.companyName?.payload,
  );
  const agentData = useSelector((state) => state?.agent?.agents?.payload);

  const { getColumnSearchProps } = useColumnSearch(setFilteredData, PolicyData);

  const handleOk = () => setActiveModal(null);
  const handleCancel = () => setActiveModal(null);

  const handlePdf = (pdf_file, key) => {
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

  const safeNumber = (value) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
  };

  const safeText = (value, fallback = "—") => {
    if (value === null || value === undefined || value === "") return fallback;
    return value;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(safeNumber(amount));
  };

  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString();
  };

  const formatDateTime = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
  };

  const daysUntilExpiry = (date) => {
    if (!date) return null;
    const expiry = new Date(date);
    if (Number.isNaN(expiry.getTime())) return null;

    const today = new Date();
    expiry.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diff = expiry - today;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getSameExpiryCount = (date) => {
    if (!date) return 0;
    return (PolicyData || []).filter((item) => item?.expiryDate === date)
      .length;
  };

  const selectedRecord = useMemo(() => {
    return (PolicyData || []).find((item) => item?.id === selectedRow);
  }, [PolicyData, selectedRow]);

  useEffect(() => {
    if (!PolicyData) return;

    let updatedData = [...PolicyData];

    if (selectColumn && selectData) {
      updatedData = updatedData.filter((item) => {
        const value = item?.[selectColumn];
        if (value === null || value === undefined) return false;

        return String(value).toLowerCase() === String(selectData).toLowerCase();
      });
    }

    if (
      selectDateColumn &&
      selectDateRange &&
      selectDateRange.length === 2 &&
      selectDateRange[0] &&
      selectDateRange[1]
    ) {
      const startDate = new Date(selectDateRange[0]);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(selectDateRange[1]);
      endDate.setHours(23, 59, 59, 999);

      updatedData = updatedData.filter((item) => {
        const itemDate = item?.[selectDateColumn]
          ? new Date(item[selectDateColumn])
          : null;

        if (!itemDate || Number.isNaN(itemDate.getTime())) return false;

        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    setFilteredData(updatedData);
  }, [PolicyData, selectColumn, selectData, selectDateColumn, selectDateRange]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getPolicyRecords()).unwrap();
      } catch (error) {
        console.error("Error fetching policy records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setUserId(decode?.id);
    }
  }, []);

  useEffect(() => {
    if (PolicyData?.length > 0) {
      setFilteredData(PolicyData);
    } else {
      setFilteredData([]);
    }
  }, [PolicyData]);

  const ClientData = clientData?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const BrokerData = brokerData?.map((item) => ({
    label: item?.broker,
    value: item?.id,
  }));

  const CompanyData = companyData?.map((item) => ({
    label: item?.company,
    value: item?.id,
  }));

  const AgentData = agentData?.map((item) => ({
    label: item?.agent,
    value: item?.id,
  }));

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

  const DeleteModal = (record) => {
    setId(record?.id);
    setOpen(true);
  };

  const handelDelete = async () => {
    const formatedData = { id: Id };
    try {
      const res = await dispatch(DeletePolicyRecord(formatedData));

      if (res.payload.success === true) {
        notification.success({
          message: "Deleted",
          description: "Policy Record has been deleted successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getPolicyRecords());
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
    const formatedData = {
      createdBy: userId,
      id: Id,
      ...data,
    };

    try {
      const response = await dispatch(updatePolicyRecords(formatedData));
      if (response?.payload?.success === true) {
        setLoading(false);
        notification.success({
          message: "Policy Record Updated!",
          description: "Policy Record is updated successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getPolicyRecords());
        setOpen(false);
      } else {
        notification.error({
          message: "Policy Record Failed to Update",
          description:
            "The Policy Record could not be updated due to an unexpected error.",
          placement: "topRight",
          showProgress: true,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
        placement: "topRight",
      });
    } finally {
      setPdfFile({});
      setIsEditModalOpen(false);
    }
  };

  const totalPolicies = filteredData?.length || 0;

  const totalAmount = useMemo(() => {
    return (filteredData || []).reduce(
      (sum, item) => sum + safeNumber(item?.netPolicyAmount),
      0,
    );
  }, [filteredData]);

  const activePolicies = useMemo(() => {
    return (filteredData || []).filter(
      (item) => String(item?.policyStatus).toLowerCase() === "not expired",
    ).length;
  }, [filteredData]);

  const expiredPolicies = useMemo(() => {
    return (filteredData || []).filter(
      (item) => String(item?.policyStatus).toLowerCase() !== "not expired",
    ).length;
  }, [filteredData]);

  const sentNotifications = useMemo(() => {
    return (filteredData || []).filter(
      (item) => String(item?.notificationStatus).toLowerCase() !== "not sent",
    ).length;
  }, [filteredData]);

  const unsentNotifications = totalPolicies - sentNotifications;

  const policiesWithDocs = useMemo(() => {
    return (filteredData || []).filter((item) => item?.texInvoiceDoc).length;
  }, [filteredData]);

  const noDocPolicies = totalPolicies - policiesWithDocs;

  const docCompletionPercent = totalPolicies
    ? Math.round((policiesWithDocs / totalPolicies) * 100)
    : 0;

  const selectedClient = selectedRecord?.clientName || "No policy selected";
  const selectedStatus = safeText(selectedRecord?.policyStatus, "Select a row");
  const selectedNotification = safeText(
    selectedRecord?.notificationStatus,
    "Select a row",
  );
  const selectedExpiryDate = formatDate(selectedRecord?.expiryDate);

  const expiryDays = selectedRecord?.expiryDate
    ? daysUntilExpiry(selectedRecord?.expiryDate)
    : null;

  const expiryText =
    expiryDays === null
      ? "Select a row from table"
      : expiryDays < 0
        ? `${Math.abs(expiryDays)} day(s) expired`
        : expiryDays === 0
          ? "Expires today"
          : `${expiryDays} day(s) remaining`;

  const columns = [
    {
      title: "Client Name",
      key: "clientName",
      dataIndex: "clientName",
      width: 260,
      ...getColumnSearchProps("clientName"),
      sorter: (a, b) =>
        String(a?.clientName || "").length - String(b?.clientName || "").length,
    },
    {
      title: "SC Broker Name",
      key: "brokerName",
      dataIndex: "brokerName",
      width: 180,
      ...getColumnSearchProps("brokerName"),
      sorter: (a, b) =>
        String(a?.brokerName || "").length - String(b?.brokerName || "").length,
    },
    {
      title: "SC Company Name",
      key: "companyName",
      dataIndex: "companyName",
      width: 180,
      ...getColumnSearchProps("companyName"),
      sorter: (a, b) =>
        String(a?.companyName || "").length -
        String(b?.companyName || "").length,
    },
    {
      title: "Claim Wolf Agent Name",
      key: "agentName",
      dataIndex: "agentName",
      width: 220,
      ...getColumnSearchProps("agentName"),
      sorter: (a, b) =>
        String(a?.agentName || "").length - String(b?.agentName || "").length,
    },
    {
      title: "Invoice Number",
      key: "chassisNumber",
      dataIndex: "chassisNumber",
      width: 140,
      ...getColumnSearchProps("chassisNumber"),
      sorter: (a, b) =>
        String(a?.chassisNumber || "").length -
        String(b?.chassisNumber || "").length,
    },
    {
      title: "Issue Date",
      key: "dateOfIssue",
      dataIndex: "dateOfIssue",
      width: 220,
      ...getColumnSearchProps("dateOfIssue"),
      sorter: (a, b) =>
        new Date(a?.dateOfIssue || 0) - new Date(b?.dateOfIssue || 0),
      render: (value, record) => {
        const isSelected = record?.id === selectedRow;
        return (
          <motion.div
            layout
            className={clsx(
              "inline-flex items-center gap-2 px-2 py-1 rounded-lg",
              isSelected ? "bg-[#009ce3]/10 text-[#007db8]" : "text-gray-700",
            )}
          >
            <CalendarOutlined className="text-xs" />
            <span className="font-medium">{formatDateTime(value)}</span>
          </motion.div>
        );
      },
    },
    {
      title: "Expiry Date",
      key: "expiryDate",
      dataIndex: "expiryDate",
      width: 220,
      ...getColumnSearchProps("expiryDate"),
      sorter: (a, b) =>
        new Date(a?.expiryDate || 0) - new Date(b?.expiryDate || 0),
      render: (value, record) => {
        const isSelected = record?.id === selectedRow;
        return (
          <motion.div
            layout
            className={clsx(
              "inline-flex items-center gap-2 px-2 py-1 rounded-lg",
              isSelected ? "bg-[#009ce3]/10 text-[#007db8]" : "text-gray-700",
            )}
          >
            <CalendarOutlined className="text-xs" />
            <span className="font-medium">{formatDateTime(value)}</span>
          </motion.div>
        );
      },
    },
    {
      title: "Tax Invoice Amount",
      key: "netPolicyAmount",
      dataIndex: "netPolicyAmount",
      width: 180,
      ...getColumnSearchProps("netPolicyAmount"),
      sorter: (a, b) =>
        safeNumber(a?.netPolicyAmount) - safeNumber(b?.netPolicyAmount),
      render: (value) => formatCurrency(value),
    },
    {
      title: "Emirate",
      key: "creditNoteAmount",
      dataIndex: "creditNoteAmount",
      width: 140,
      ...getColumnSearchProps("creditNoteAmount"),
      sorter: (a, b) =>
        String(a?.creditNoteAmount || "").localeCompare(
          String(b?.creditNoteAmount || ""),
        ),
    },
    // {
    //   title: "Policy Status",
    //   key: "policyStatus",
    //   dataIndex: "policyStatus",
    //   width: 160,
    //   ...getColumnSearchProps("policyStatus"),
    //   sorter: (a, b) =>
    //     String(a?.policyStatus || "").localeCompare(
    //       String(b?.policyStatus || ""),
    //     ),
    //   render: (text) => {
    //     const isActive = String(text).toLowerCase() === "not expired";
    //     return (
    //       <div
    //         className={clsx(
    //           "text-center rounded-full py-2 px-3 font-medium",
    //           isActive
    //             ? "bg-[#00e335]/10 text-green-600"
    //             : "bg-[#e33100]/10 text-red-500",
    //         )}
    //       >
    //         <span>{safeText(text)}</span>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Notification Status",
    //   key: "notificationStatus",
    //   dataIndex: "notificationStatus",
    //   width: 180,
    //   ...getColumnSearchProps("notificationStatus"),
    //   sorter: (a, b) =>
    //     String(a?.notificationStatus || "").localeCompare(
    //       String(b?.notificationStatus || ""),
    //     ),
    //   render: (text) => {
    //     const isSent = String(text).toLowerCase() !== "not sent";
    //     return (
    //       <div
    //         className={clsx(
    //           "text-center rounded-full py-2 px-3 font-medium",
    //           isSent
    //             ? "bg-[#00e335]/10 text-green-600"
    //             : "bg-[#e33100]/10 text-red-500",
    //         )}
    //       >
    //         <span>{safeText(text)}</span>
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Tex Invoice Doc",
      key: "texInvoiceDoc",
      dataIndex: "texInvoiceDoc",
      width: 140,
      fixed: "right",
      render: (row, record, index) => (
        <div key={index}>
          {row ? (
            <div>
              <Button
                type="default"
                className="px-10 font-semibold bg-[black]/90 text-white"
                onClick={() => handlePdf(row, "texInvoiceDoc")}
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
                  top: "10vh",
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
                footer={null}
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
    {
      title: "Created Time",
      key: "createdAt",
      dataIndex: "createdAt",
      width: 180,
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) =>
        new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0),
      render: (_, record) => <span>{formatDateTime(record?.createdAt)}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <div className="flex gap-10 mr-10">
          <button
            className="text-red-600 font-bold rounded-full w-6"
            onClick={() => DeleteModal(record)}
          >
            <TrashIcon style={{ fontSize: "20px" }} />
          </button>
          <button
            className="text-black font-bold rounded-full"
            onClick={() => EditModal(record)}
          >
            <EditFilled style={{ fontSize: "20px" }} />
          </button>
        </div>
      ),
    },
  ];

  const RowData = (row) => {
    setSelectedRow(row?.id);
  };

  // Expandable Table Implementation
  const ExpandableColumns = [
    {
      title: "Policy Status",
      key: "policyExpiredStatus",
      dataIndex: "policyExpiredStatus",
      width: 160,
      // ...getColumnSearchProps("policyStatus"),
      sorter: (a, b) =>
        String(a?.policyStatus || "").localeCompare(
          String(b?.policyStatus || ""),
        ),
      render: (text) => {
        const isActive = String(text).toLowerCase() === "not expired";
        return (
          <div
            className={clsx(
              "text-center rounded-full py-2 px-3 font-medium",
              isActive
                ? "bg-[#16a34a]/10 text-green-600"
                : "bg-[#ef4444]/10 text-red-500",
            )}
          >
            <span>{safeText(text)}</span>
          </div>
        );
      },
    },
    {
      title: "Notification Status",
      key: "notificationStatus",
      dataIndex: "notificationStatus",
      width: 180,
      // ...getColumnSearchProps("notificationStatus"),
      sorter: (a, b) =>
        String(a?.notificationStatus || "").localeCompare(
          String(b?.notificationStatus || ""),
        ),
      render: (text) => {
        const isSent = String(text).toLowerCase() !== "not sent";
        return (
          <div
            className={clsx(
              "text-center rounded-full py-2 px-3 font-medium",
              isSent
                ? "bg-[#16a34a]/10 text-green-600"
                : "bg-[#ef4444]/10 text-red-500",
            )}
          >
            <span>{safeText(text)}</span>
          </div>
        );
      },
    },
    {
      title: "Policy Renewal Status",
      key: "policyStatus",
      dataIndex: "policyStatus",
      width: 160,
      ...getColumnSearchProps("policyStatus"),
      sorter: (a, b) =>
        String(a?.policyStatus || "").localeCompare(
          String(b?.policyStatus || ""),
        ),
      render: (text) => {
        const statusMap = {
          1: "Active",
          2: "Renewe",
          3: "Not Renew",
        };

        const label = statusMap[text] || "Unknown";

        const isActive = label === "Active";
        const isRenewe = label === "Renewe";

        return (
          <div
            className={clsx(
              "text-center rounded-full py-2 px-3 font-medium",
              isActive
                ? "bg-[#16a34a]/10 text-green-600"
                : isRenewe
                  ? "bg-[#3b82f6]/10 text-blue-500"
                  : "bg-[#ef4444]/10 text-red-500",
            )}
          >
            <span>{label}</span>
          </div>
        );
      },
    },
    {
      title: "Renewal Count",
      dataIndex: "renewalCount",
      key: "renewalCount",
      width: 200,
      render: (value) => (
        <div className="text-center rounded-full py-2 px-3 font-medium bg-[#3b82f6]/10 text-blue-500">
          {value !== null && value !== undefined && value !== ""
            ? value
            : "---"}
        </div>
      ),
    },
    {
      title: "Previous Invoice Number",
      dataIndex: "previousChassisNumber",
      key: "previousChassisNumber",
      width: 200,
      render: (value) =>
        value ? (
          <div
            className={clsx(
              "text-center rounded-full py-2 px-3 font-medium bg-[#3b82f6]/10 text-blue-500",
            )}
          >
            {value}
          </div>
        ) : (
          "---"
        ),
    },
    // {
    //   title: "Can Create",
    //   dataIndex: "can_create",
    //   key: "can_create",
    //   width: 150,
    //   render: (value) => (
    //     <>
    //       <p>{value == 1 ? <span>Yes</span> : <span>No</span> || "---"}</p>
    //     </>
    //   ),
    // },
  ];

  const expandableConfig = {
    expandedRowRender: (record) => {
      const sectionData = [record]; // or record.children / record.details if that exists

      return (
        <div className="bg-gray-50 border rounded-lg p-2">
          <Table
            columns={ExpandableColumns}
            dataSource={sectionData}
            pagination={false}
            rowKey={(row, index) => `${row.id}-${index}`}
          />
        </div>
      );
    },
    rowExpandable: (record) => !!record, // or some real condition
  };
  return (
    <div className="relative">
      <div className="m-4">
        <AnimatePresence mode="wait">
          {!activeModal && shwoExtraDetails && !isEditModalOpen && !open ? (
            <motion.div
              initial={{ opacity: 0, y: 50, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 30, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative mb-4 overflow-hidden rounded-3xl  p-4 md:p-5 shadow-sm"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-200/50 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-cyan-200/50 blur-3xl" />

              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl textTitle">
                    Policy Record Overview
                  </h2>
                  <p className="text-sm textTitle">
                    Complete dashboard summary of all policies, statuses,
                    documents, and selected record details
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Chip active={!selectedRecord}>All Records</Chip>
                  <Chip active={!!selectedRecord}>
                    {selectedRecord ? "Row Selected" : "No Selection"}
                  </Chip>
                  <Chip active={expiredPolicies > 0}>
                    Expired: {expiredPolicies}
                  </Chip>
                  <Chip active={unsentNotifications > 0}>
                    Unsent Notices: {unsentNotifications}
                  </Chip>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <TopStatCard
                  loading={loading}
                  icon={<CheckCircleOutlined className="text-xl" />}
                  label="Total Policies"
                  value={totalPolicies}
                  subValue={`${activePolicies} active • ${expiredPolicies} expired`}
                  accent="from-sky-500 to-cyan-500"
                  active={!selectedRecord}
                />

                <TopStatCard
                  loading={loading}
                  icon={<DollarOutlined className="text-xl" />}
                  label="Total Amount"
                  value={formatCurrency(totalAmount)}
                  subValue="Combined tax invoice amount of current filtered records"
                  accent="from-emerald-500 to-teal-500"
                />

                <TopStatCard
                  loading={loading}
                  icon={<BellOutlined className="text-xl" />}
                  label="Notification Status"
                  value={`${sentNotifications}/${totalPolicies || 0}`}
                  subValue={`${unsentNotifications} record(s) still not sent`}
                  accent="from-amber-500 to-orange-500"
                  right={
                    <div className="flex items-center gap-3">
                      <Progress
                        percent={
                          totalPolicies
                            ? Math.round(
                                (sentNotifications / totalPolicies) * 100,
                              )
                            : 0
                        }
                        size="small"
                        strokeColor="#009ce3"
                        trailColor="#e5e7eb"
                        showInfo={false}
                      />
                      <span className="min-w-[42px] text-xs font-semibold text-gray-600">
                        {totalPolicies
                          ? Math.round(
                              (sentNotifications / totalPolicies) * 100,
                            )
                          : 0}
                        %
                      </span>
                    </div>
                  }
                />

                <TopStatCard
                  loading={loading}
                  icon={<FileTextOutlined className="text-xl" />}
                  label="Document Coverage"
                  value={`${policiesWithDocs}/${totalPolicies || 0}`}
                  subValue={`${noDocPolicies} record(s) without invoice document`}
                  accent="from-violet-500 to-fuchsia-500"
                  right={
                    <div className="flex items-center gap-3">
                      <Progress
                        percent={docCompletionPercent}
                        size="small"
                        strokeColor="#009ce3"
                        trailColor="#e5e7eb"
                        showInfo={false}
                      />
                      <span className="min-w-[42px] text-xs font-semibold text-gray-600">
                        {docCompletionPercent}%
                      </span>
                    </div>
                  }
                />
              </div>

              <div className="mt-4 grid grid-cols-1 xl:grid-cols-1">
                <TopStatCard
                  loading={loading}
                  icon={<EyeOutlined className="text-xl" />}
                  label="Selected Policy"
                  value={selectedClient}
                  subValue={`Expiry: ${selectedExpiryDate} • ${expiryText}`}
                  accent="from-rose-500 to-pink-500"
                  active={!!selectedRecord}
                  right={
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl bg-gray-50 px-3 py-2">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500">
                          Policy Status
                        </p>
                        <p className="mt-1 font-semibold text-gray-800">
                          {selectedStatus}
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 px-3 py-2">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500">
                          Notification
                        </p>
                        <p className="mt-1 font-semibold text-gray-800">
                          {selectedNotification}
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 px-3 py-2 flex items-center justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-gray-500">
                            Same Expiry
                          </p>
                          <p className="mt-1 font-semibold text-gray-800">
                            Related policies
                          </p>
                        </div>
                        <Tooltip title="Policies on same expiry date">
                          <Badge
                            count={
                              selectedRecord?.expiryDate
                                ? getSameExpiryCount(selectedRecord.expiryDate)
                                : 0
                            }
                            showZero
                          />
                        </Tooltip>
                      </div>
                    </div>
                  }
                />
              </div>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
        <div className="pr-10 max-sm:pr-3 ">
          <Tooltip title={shwoExtraDetails ? "Hide Details" : "Show Details"}>
            <div
              onClick={() => setShwoExtraDetails(!shwoExtraDetails)}
              className="translate-y-20 w-fit px-6 py-3 bg-white hover:bg-black group rounded-xl shadow-xl duration-200"
            >
              <Info className="text-gray-500 group-hover:text-white" />
            </div>
          </Tooltip>
          <FilterSection
            formType="policy_records"
            columns={columns}
            data={PolicyData || []}
            selectColumn={selectColumn}
            setSelectColumn={setSelectColumn}
            setSelectData={setSelectData}
            isDataFiltered={selectData}
            selectDateColumn={selectDateColumn}
            setSelectDateColumn={setSelectDateColumn}
            setSelectDateRange={setSelectDateRange}
          />
        </div>

        <TableSection
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          onRowClick={RowData}
          expandable={expandableConfig}
        />
      </div>

      <Delete
        open={open}
        setOpen={setOpen}
        text={"Policy Record"}
        handelDelete={handelDelete}
      />

      <Edit
        title={"Edit Policy Record"}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        editFields={editfields}
        editData={editData}
        onEditFinish={EditFinish}
        modalType={"Revenue_Record"}
        setPdfFile={setPdfFile}
        pdfFile={pdfFile}
      />
    </div>
  );
};

export default PolicyRecord;
