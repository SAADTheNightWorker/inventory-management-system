import React, { useRef } from "react";
import {
  BellOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuItem } from "@mui/material";
import { Avatar, Tag, Tooltip } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import { AnimatePresence, motion } from "framer-motion";

import { styled, alpha } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Notifcation from "./Notifcation";
import { useTheme } from "../Theme/context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotifications } from "../../../store/actionApis/notification.Api";
import { useState } from "react";
import { LogOut } from "lucide-react";

const MainNavBar = ({ userType, userName, userProfile }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openNotifcation, setOpenNotifcation] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isLength, setIslength] = useState(0);
  const { notifications } = useSelector((item) => item?.notifications);
  const notifRef = useRef(null);
  const bellRef = useRef(null);
  // console.log("CHECK NO", isLength);

  // useEffect(() => {
  //   const onKey = (e) => e.key === "Escape" && setShowNotif(false);
  //   window.addEventListener("keydown", onKey);
  //   return () => window.removeEventListener("keydown", onKey);
  // }, []);
  useEffect(() => {
    const handleOutside = (e) => {
      if (!openNotifcation) return;

      const clickedInsideNotif = notifRef.current?.contains(e.target);
      const clickedInsideBell = bellRef.current?.contains(e.target);

      if (!clickedInsideNotif && !clickedInsideBell) {
        setOpenNotifcation(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [openNotifcation]);

  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    const unread =
      notifications?.payload?.reduce(
        (count, n) => count + (n.is_read === 0 ? 1 : 0),
        0,
      ) || 0;

    setIslength(unread);
  }, [notifications]);

  const navigate = useNavigate();

  return (
    <div className="h-14 border-b flex justify-between items-center topNavBg">
      {/* Right */}
      <div>
        <img
          src={"images/crm1.png"}
          alt="Logo"
          className="h-20 translate-y-2 w-24 pb-4 ml-4 object-cover"
        />
      </div>
      {/* Left */}
      <div className="flex items-center gap-4">
        <div
          ref={bellRef}
          className="relative cursor-pointer  rounded-full px-2 py-1"
        >
          <BellOutlined
            onClick={() => setOpenNotifcation(!openNotifcation)}
            style={{ fontSize: "24px", color: "gray" }}
            className={`${isLength > 0 ? "animate-shake" : ""}`}
          />
          {isLength > 0 && (
            <p className="h-3 w-3 rounded-full bg-red-500 absolute top-[2px] right-[2px] animate-pulse flex items-center justify-center">
              <span className="text-white text-[12px] ml-[5px] bottom-[-1px] absolute">
                {/* {isLength || 0} */}
              </span>
            </p>
          )}
          <AnimatePresence mode="wait">
            {openNotifcation && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                ref={notifRef}
                onMouseDown={(e) => e.stopPropagation()}
                className="absolute sm:top-10 sm:right-12 -right-36 top-14 w-[32vh] bg-white rounded-lg shadow-lg z-50"
              >
                {/* absolute top-8 -left-[32vh] */}
                <Notifcation className="" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          onClick={toggleTheme}
          className="cursor-pointer  rounded-full px-2 py-1"
        >
          {theme === "light" ? (
            <div>
              <MoonOutlined
                style={{ fontSize: "20px", color: "gray" }}
                className=""
              />
            </div>
          ) : (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <SunOutlined
                style={{ fontSize: "20px", color: "gray" }}
                className=""
              />
            </motion.div>
          )}
        </div>

        <div className="mr-4 flex items-cente border px-1 rounded-full">
          <Tooltip
            title="Your Profile"
            className="flex justify-center items-center cursor-pointer"
          >
            <Button
              className="h-10 !w-full !rounded-full py-1 flex justify-center items-center"
              id="demo-customized-button"
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Avatar
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-[36px] h-[34px] rounded-full object-cover"
              />
              <div className="text-sm text-gray-500 font-medium flex flex-col items-center justify-center py-[3px]">
                <p>
                  {userName ? (
                    <p className="rounded-full border-none text-sm !font-semibold">
                      {" "}
                      {userName}
                    </p>
                  ) : (
                    <p>{userProfile.name}</p>
                  )}
                </p>
                <p className="text-xs font-normal">
                  {userType !== undefined && (
                    <span className="">
                      {userType === 1 ? (
                        "Admin"
                      ) : userType === 0 ? (
                        <Tag
                          className="rounded-full text-gray-500 border-none text-xs !font-semibold"
                          color=""
                        >
                          User
                        </Tag>
                      ) : (
                        <Tag
                          className="rounded-full text-gray-500 border-none text-xs !font-semibold"
                          color=""
                        >
                          Approver
                        </Tag>
                      )}
                    </span>
                  )}
                </p>
                {/* Display decoded name or default */}
              </div>
            </Button>
          </Tooltip>
          {/* Menu */}
          <div className="z-50">
            <Menu
              className="mt-2 ml-1 !rounded-full"
              id=""
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                className="!w-[15vh] !flex !justify-between !items-center !font-thine !rounded-lg hover:!bg-gray-100"
                onClick={() => {
                  handleClose();
                  navigate("/profile");
                }}
                disableRipple
              >
                Profile
                <UserOutlined />
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                className="!w-[15vh] !flex !justify-between !items-center !font-thine !rounded-lg hover:!bg-gray-100"
                onClick={() => {
                  handleClose()
                  navigate("/signOut")
                }}
                
                disableRipple
              >
                Sign Out
                <LogOut className="h-5" />
              </MenuItem>
            </Menu>
          </div>
          {/* Menu END */}
        </div>
      </div>
    </div>
  );
};

export default MainNavBar;
