import React, { useEffect, useMemo, useState } from "react";
import FilterSection from "../components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import TableSection from "../components/table/TableSection";
import { useColumnSearch } from "../components/table/TablesFilter";
import {
  DeletePolicyRecord,
  getExpiredPolicyRecords,
  RenewPolicyRecords,
  updatePolicyRecords,
} from "../../store/actionApis/policyRecordApi";
import {
  Badge,
  Button,
  Modal,
  notification,
  Skeleton,
  Progress,
  Tooltip,
  Divider,
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
  WarningOutlined,
  EyeOutlined,
  CloseOutlined,
  ReloadOutlined,
  ArrowRightOutlined,
  FileSearchOutlined,
  UserOutlined,
  BankOutlined,
  NotificationOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Approval, ApprovalTwoTone, Info } from "@mui/icons-material";
import { getClient } from "../../store/actionApis/clientApi";
import { getBroker } from "../../store/actionApis/brokerApi";
import { getAgent } from "../../store/actionApis/agentAPi";
import { getCompany } from "../../store/actionApis/companyApi";

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
                style={{ width: 140, height: 28 }}
              />
            </div>
            <div className="mt-3">
              <Skeleton.Input
                active
                size="small"
                style={{ width: 180, height: 16 }}
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
            "flex h-12 min-w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm",
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

function InfoBlock({ icon, label, value, valueClassName = "" }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white/80 px-4 py-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-[#009ce3]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
            {label}
          </p>
          <p
            className={clsx(
              "mt-1 break-words text-sm font-semibold text-gray-800",
              valueClassName,
            )}
          >
            {value || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

function RenewSidebar({
  selectedRecord,
  onClose,
  onRenew,
  formatCurrency,
  formatDate,
  formatDateTime,
  daysExpired,
  getEventsCountByDate,
}) {
  if (!selectedRecord) return null;

  const expiredDays = selectedRecord?.expiryDate
    ? daysExpired(selectedRecord.expiryDate)
    : 0;

  const hasDoc = !!selectedRecord?.texInvoiceDoc;

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={selectedRecord?.id}
        initial={{ x: 80, opacity: 0, scale: 0.98 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: 80, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="sticky top-6 max-h-[500px] mt-20 w-full overflow-auto rounded-[30px] border border-sky-100 bg-white shadow-[0_20px_60px_rgba(2,132,199,0.12)] scrollbar-track-transparent scrollbar-thin"
      >
        <div className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-br sticky top-0 from-sky-500 via-cyan-500 to-blue-500 px-5 py-5 text-white">
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-[0.16em]">
                <EyeOutlined />
                SELECTED POLICY
              </div>
              <h3 className="truncate text-xl font-bold">
                {selectedRecord?.clientName || "Unnamed Client"}
              </h3>
              <p className="mt-1 text-sm text-white/85">
                Invoice: {selectedRecord?.chassisNumber || "—"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 min-w-14 items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-white/25"
              type="button"
            >
              <CloseOutlined />
            </button>
          </div>

          <div className="relative mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                Expiry Date
              </p>
              <p className="mt-1 text-sm font-semibold">
                {formatDate(selectedRecord?.expiryDate)}
              </p>
            </div>

            <div className="rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                Expired Since
              </p>
              <p className="mt-1 text-sm font-semibold">{expiredDays} day(s)</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="grid grid-cols-1 gap-3">
            <InfoBlock
              icon={<UserOutlined />}
              label="Client Name"
              value={selectedRecord?.clientName}
            />
            <InfoBlock
              icon={<FileTextOutlined />}
              label="Invoice Number"
              value={selectedRecord?.chassisNumber}
            />
            <InfoBlock
              icon={<DollarOutlined />}
              label="Tax Invoice Amount"
              value={formatCurrency(selectedRecord?.netPolicyAmount)}
            />
            <InfoBlock
              icon={<BankOutlined />}
              label="Company Name"
              value={selectedRecord?.companyName}
            />
            <InfoBlock
              icon={<UserOutlined />}
              label="Broker Name"
              value={selectedRecord?.brokerName}
            />
            <InfoBlock
              icon={<UserOutlined />}
              label="Agent Name"
              value={selectedRecord?.agentName}
            />
            <InfoBlock
              icon={<CalendarOutlined />}
              label="Issue Date"
              value={formatDateTime(selectedRecord?.dateOfIssue)}
            />
            <InfoBlock
              icon={<ClockCircleOutlined />}
              label="Created Time"
              value={formatDateTime(selectedRecord?.createdAt)}
            />
            <InfoBlock
              icon={<NotificationOutlined />}
              label="Policies With Same Expiry"
              value={getEventsCountByDate(selectedRecord?.expiryDate)}
            />
            <InfoBlock
              icon={hasDoc ? <CheckCircleOutlined /> : <WarningOutlined />}
              label="Document Status"
              value={
                hasDoc ? "Invoice document available" : "No invoice document"
              }
              valueClassName={hasDoc ? "text-green-600" : "text-amber-600"}
            />
          </div>

          <Divider className="my-2" />

          <div className="rounded-[24px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-md">
                <ReloadOutlined />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-gray-900">
                  Renew this policy
                </h4>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Start renewal workflow for the selected expired policy with
                  its current client, broker, company, invoice, and amount
                  details.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
                  Renewal Base
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  Existing policy data
                </p>
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
                  Suggested Action
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  Create renewal record
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {selectedRecord?.policyStatus !== 2 ? (
                <Button
                  type="primary"
                  size="large"
                  icon={<ReloadOutlined />}
                  className="!h-12 !rounded-2xl !bg-[#009ce3] !shadow-md"
                  onClick={() => onRenew(selectedRecord)}
                >
                  Renew Policy
                </Button>
              ) : (
                <Button
                  size="large"
                  icon={<CheckCircleOutlined />}
                  className="!h-12 !rounded-2xl"
                  disabled
                >
                  Policy Already Renewed
                </Button>
              )}

              <Button
                size="large"
                icon={<FileSearchOutlined />}
                className="!h-12 !rounded-2xl"
                disabled={!selectedRecord?.texInvoiceDoc}
              >
                {selectedRecord?.texInvoiceDoc
                  ? "Review Existing Document"
                  : "No Document Available"}
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3">
            <p className="text-xs font-medium text-gray-500">
              Renewal flow note
            </p>
            <p className="mt-1 text-sm text-gray-600">
              When you click renew, open your renewal form/modal/page and
              prefill it with the selected policy record.
            </p>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

const ExpiredPolicyRecords = () => {
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

  const ExpiredPolicyData = useSelector(
    (state) => state?.policyRecord?.expiredPolicyRecord?.payload,
  );
  const clientData = useSelector((state) => state?.clients?.clients?.payload);
  const brokerData = useSelector((state) => state?.broker?.broker?.payload);
  const companyData = useSelector(
    (state) => state?.company?.companyName?.payload,
  );
  const agentData = useSelector((state) => state?.agent?.agents?.payload);

  const { getColumnSearchProps } = useColumnSearch(
    setFilteredData,
    ExpiredPolicyData,
  );

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
    if (!date) return "---";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "---";
    return d.toLocaleString();
  };

  const daysExpired = (date) => {
    if (!date) return 0;
    const expiry = new Date(date);
    if (Number.isNaN(expiry.getTime())) return 0;

    const today = new Date();
    expiry.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diff = today - expiry;
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const getEventsCountByDate = (date) => {
    if (!date) return 0;
    return (ExpiredPolicyData || []).filter((item) => item?.expiryDate === date)
      .length;
  };

  const selectedRecord = useMemo(() => {
    return (ExpiredPolicyData || []).find((item) => item?.id === selectedRow);
  }, [ExpiredPolicyData, selectedRow]);

  const totalExpiredPolicies = filteredData?.length || 0;

  const totalExpiredAmount = useMemo(() => {
    return (filteredData || []).reduce(
      (sum, item) => sum + safeNumber(item?.netPolicyAmount),
      0,
    );
  }, [filteredData]);

  const policiesWithDocs = useMemo(() => {
    return (filteredData || []).filter((item) => item?.texInvoiceDoc).length;
  }, [filteredData]);

  const noDocPolicies = totalExpiredPolicies - policiesWithDocs;

  const mostRecentExpired = useMemo(() => {
    return [...(filteredData || [])]
      .filter((item) => item?.expiryDate)
      .sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate))[0];
  }, [filteredData]);

  const docCompletionPercent = totalExpiredPolicies
    ? Math.round((policiesWithDocs / totalExpiredPolicies) * 100)
    : 0;

  const selectedClient = selectedRecord?.clientName || "No policy selected";
  const selectedExpiryDate = formatDate(selectedRecord?.expiryDate);
  const selectedExpiredDays = selectedRecord?.expiryDate
    ? `${daysExpired(selectedRecord?.expiryDate)} day(s) ago`
    : "Select a row from table";

  useEffect(() => {
    if (!ExpiredPolicyData) return;

    let updatedData = [...ExpiredPolicyData];

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
  }, [
    ExpiredPolicyData,
    selectColumn,
    selectData,
    selectDateColumn,
    selectDateRange,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getClient());
        await dispatch(getBroker());
        await dispatch(getAgent());
        await dispatch(getCompany());
        await dispatch(getExpiredPolicyRecords()).unwrap();
      } catch (error) {
        console.error("Error fetching expired policy records:", error);
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
    if (ExpiredPolicyData?.length > 0) {
      setFilteredData(ExpiredPolicyData);
    } else {
      setFilteredData([]);
    }
  }, [ExpiredPolicyData]);

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
      key: "netPolicyAmount",
      title: "Tax Invoice Amount",
      type: "number",
    },
    {
      key: "creditNoteAmount",
      title: "Emirate",
      type: "text",
    },

    {
      key: "chassisNumber",
      title: "Invoice Number",
      type: "text",
    },
    {
      key: "dateOfIssue",
      title: "Date Of Issue",
      type: "date",
    },
  ];

  const uploadFields = [
    { key: "texInvoiceDoc", title: "Tex Invoice Doc", type: "upload" },
    // { key: "policySecheduleDoc", title: "Policy Sechedule Doc" },
    // { key: "creditNoteDoc", title: "Credit Note Doc" },
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
        dispatch(getExpiredPolicyRecords());
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

  // console.log("EDIT DATA", editData);

  const EditFinish = async (data) => {
    const formData = new FormData();

    formData.append("policyId", Id);
    formData.append("clientId", data.clientId);
    formData.append("scbrokerNameId", data.scbrokerNameId);
    formData.append("scIncCompanyId", data.scIncCompanyId);
    formData.append("agnentNameId", data.agnentNameId);
    formData.append("chassisNumber", data.chassisNumber);
    formData.append("dateOfIssue", data.dateOfIssue);
    formData.append("netPolicyAmount", data.netPolicyAmount);
    formData.append("creditNoteAmount", data.creditNoteAmount);
    formData.append("texInvoiceDoc", data.texInvoiceDoc);
    formData.append("created_by", userId);

    // Log the formData entries
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
    try {
      const response = await dispatch(RenewPolicyRecords(formData));
      if (response?.payload?.success === true) {
        setLoading(false);
        notification.success({
          message: "Renewed",
          description: "Policy Record has been renewed successfully",
          placement: "topRight",
          showProgress: true,
        });
        dispatch(getExpiredPolicyRecords());
        setOpen(false);
      } else {
        notification.error({
          message: "Policy Record Failed to renewed",
          description:
            "The Policy Record could not be renewed due to an unexpected error.",
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

  const handleRenewPolicy = (record) => {
    EditModal(record);
    // console.log("CHECK", record);

    // Replace this with your real renew flow:
    // navigate("/renew-policy", { state: { policy: record } });
    // OR open renew modal with selected record
    // OR dispatch(setRenewPolicy(record))
  };

  const columns = [
    {
      title: "Issue Date",
      key: "dateOfIssue",
      dataIndex: "dateOfIssue",
      width: 240,
      ...getColumnSearchProps("dateOfIssue"),
      sorter: (a, b) =>
        new Date(a.dateOfIssue || 0) - new Date(b.dateOfIssue || 0),
      render: (v, record) => {
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
            <span className="font-medium">{formatDateTime(v)}</span>
            {isSelected ? (
              <motion.span
                layoutId="selected-pill"
                className="ml-1 h-2 w-2 rounded-full bg-[#009ce3]"
              />
            ) : null}
          </motion.div>
        );
      },
    },
    {
      title: "Expiry Date",
      key: "expiryDate",
      dataIndex: "expiryDate",
      fixed: "left",
      width: 240,
      ...getColumnSearchProps("expiryDate"),
      sorter: (a, b) =>
        new Date(a.expiryDate || 0) - new Date(b.expiryDate || 0),
      render: (v, record) => {
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
            <span className="font-medium">{formatDateTime(v)}</span>
            {isSelected ? (
              <motion.span
                layoutId="selected-pill"
                className="ml-1 h-2 w-2 rounded-full bg-[#009ce3]"
              />
            ) : null}
          </motion.div>
        );
      },
    },
    {
      title: "Client Name",
      key: "clientName",
      dataIndex: "clientName",
      width: 260,
      ...getColumnSearchProps("clientName"),
      sorter: (a, b) =>
        (a.clientName || "").length - (b.clientName || "").length,
    },
    {
      title: "Invoice Number",
      key: "chassisNumber",
      dataIndex: "chassisNumber",
      width: 260,
      ...getColumnSearchProps("chassisNumber"),
      sorter: (a, b) =>
        (a.chassisNumber || "").length - (b.chassisNumber || "").length,
    },
    {
      title: "SC Broker Name",
      key: "brokerName",
      dataIndex: "brokerName",
      width: 180,
      ...getColumnSearchProps("brokerName"),
      sorter: (a, b) =>
        (a.brokerName || "").length - (b.brokerName || "").length,
    },
    {
      title: "SC Company Name",
      key: "companyName",
      dataIndex: "companyName",
      width: 180,
      ...getColumnSearchProps("companyName"),
      sorter: (a, b) =>
        (a.companyName || "").length - (b.companyName || "").length,
    },
    {
      title: "Claim Wolf Agent Name",
      key: "agentName",
      dataIndex: "agentName",
      width: 220,
      ...getColumnSearchProps("agentName"),
      sorter: (a, b) => (a.agentName || "").length - (b.agentName || "").length,
    },
    {
      title: "Tax Invoice Amount",
      key: "netPolicyAmount",
      dataIndex: "netPolicyAmount",
      width: 180,
      ...getColumnSearchProps("netPolicyAmount"),
      sorter: (a, b) => (a.netPolicyAmount || 0) - (b.netPolicyAmount || 0),
      render: (value) => formatCurrency(value),
    },
    {
      title: "Emirate",
      key: "creditNoteAmount",
      dataIndex: "creditNoteAmount",
      width: 140,
      ...getColumnSearchProps("creditNoteAmount"),
      sorter: (a, b) =>
        String(a.creditNoteAmount || "").localeCompare(
          String(b.creditNoteAmount || ""),
        ),
    },
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
      sorter: (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
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
          {record?.policyStatus !== 2 ? (
            <Tooltip title="Renew Policy">
              <button
                className="text-black font-bold rounded-full"
                onClick={() => EditModal(record)}
              >
                <Approval style={{ fontSize: "20px" }} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip title="Policy Already Renewed">
              <butoon>
                <CheckCircleOutlined
                  style={{ fontSize: "22px", color: "green" }}
                />
              </butoon>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  const RowData = (e) => {
    setSelectedRow(e?.id);
  };

  return (
    <div className="relative">
      <div className="m-4">
        {/* Extra Info Start */}
        <AnimatePresence mode="wait">
          {!activeModal && shwoExtraDetails && !isEditModalOpen && !open ? (
            <motion.div
              initial={{ opacity: 0, y: 50, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 30, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative my-4 overflow-hidden rounded-3xl p-4 md:p-5 shadow-sm"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-200/50 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-cyan-200/50 blur-3xl" />

              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl textTitle">Expired Policy Overview</h2>
                  <p className="text-sm textTitle">
                    Interactive summary of expired policies, invoice coverage,
                    and selected record details
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Chip active={!selectedRecord}>All Records</Chip>
                  <Chip active={!!selectedRecord}>
                    {selectedRecord ? "Row Selected" : "No Selection"}
                  </Chip>
                  <Chip active={docCompletionPercent < 100}>
                    Missing Docs: {noDocPolicies}
                  </Chip>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <TopStatCard
                  loading={loading}
                  icon={<WarningOutlined className="text-xl" />}
                  label="Expired Policies"
                  value={totalExpiredPolicies}
                  subValue={
                    mostRecentExpired?.expiryDate
                      ? `Latest expiry: ${formatDate(mostRecentExpired.expiryDate)}`
                      : "No expired records available"
                  }
                  accent="from-rose-500 to-red-500"
                  active={!selectedRecord}
                />

                <TopStatCard
                  loading={loading}
                  icon={<DollarOutlined className="text-xl" />}
                  label="Expired Amount"
                  value={formatCurrency(totalExpiredAmount)}
                  subValue="Total tax invoice amount in current filtered records"
                  accent="from-emerald-500 to-teal-500"
                />

                <TopStatCard
                  loading={loading}
                  icon={<FileTextOutlined className="text-xl" />}
                  label="Document Coverage"
                  value={`${policiesWithDocs}/${totalExpiredPolicies || 0}`}
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

                <TopStatCard
                  loading={loading}
                  icon={<EyeOutlined className="text-xl" />}
                  label="Selected Policy"
                  value={selectedClient}
                  subValue={`Expiry: ${selectedExpiryDate} • ${selectedExpiredDays}`}
                  accent="from-sky-500 to-cyan-500"
                  active={!!selectedRecord}
                  right={
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
                      <span className="text-xs font-medium text-gray-500">
                        Same expiry date
                      </span>
                      <Tooltip title="Policies on same expiry date">
                        <Badge
                          count={
                            selectedRecord?.expiryDate
                              ? getEventsCountByDate(selectedRecord.expiryDate)
                              : 0
                          }
                          showZero
                        />
                      </Tooltip>
                    </div>
                  }
                />
              </div>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>

        {/* Extra Info End */}
        <div className="pr-10 max-sm:pr-3">
          <Tooltip title={shwoExtraDetails ? "Hide Details" : "Show Details"}>
            <div
              onClick={() => setShwoExtraDetails(!shwoExtraDetails)}
              className="translate-y-20 w-fit px-6 py-3 bg-white hover:bg-black group rounded-xl shadow-xl duration-200"
            >
              <Info className="text-gray-500 group-hover:text-white" />
            </div>
          </Tooltip>
          <FilterSection
            formType="expired_policy_records"
            columns={columns}
            data={ExpiredPolicyData || []}
            selectColumn={selectColumn}
            setSelectColumn={setSelectColumn}
            setSelectData={setSelectData}
            isDataFiltered={selectData}
            selectDateColumn={selectDateColumn}
            setSelectDateColumn={setSelectDateColumn}
            setSelectDateRange={setSelectDateRange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
          <motion.div layout className="min-w-0">
            <div
              className={clsx(
                "rounded-3xl p-2 shadow-sm transition-all duration-300",
                selectedRecord && "xl:pr-2",
              )}
            >
              <TableSection
                columns={columns}
                dataSource={filteredData}
                loading={loading}
                onRowClick={RowData}
              />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {selectedRecord ? (
              <RenewSidebar
                key="renew-sidebar"
                selectedRecord={selectedRecord}
                onClose={() => setSelectedRow(null)}
                onRenew={handleRenewPolicy}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                formatDateTime={formatDateTime}
                daysExpired={daysExpired}
                getEventsCountByDate={getEventsCountByDate}
              />
            ) : (
              <motion.div
                key="empty-sidebar"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="sticky top-6 mt-20 h-fit rounded-[28px] border border-dashed border-sky-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 shadow-sm"
              >
                <div className="flex h-full min-h-[440px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-md">
                    <ArrowRightOutlined className="text-xl text-[#009ce3]" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    Select a policy row
                  </h3>
                  <p className="mt-2 max-w-[260px] text-sm leading-6 text-gray-500">
                    Click any row from the table to open sidebar with policy
                    details and renewal actions.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Delete
        open={open}
        setOpen={setOpen}
        text="Expired Policy Record"
        handelDelete={handelDelete}
      />

      <Edit
        title="Renew Expired Policy Record"
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        editFields={editfields}
        editData={editData}
        onEditFinish={EditFinish}
        modalType="Renew"
        setPdfFile={setPdfFile}
        pdfFile={pdfFile}
        editDataUpload={uploadFields}
      />
    </div>
  );
};

export default ExpiredPolicyRecords;
