import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
// import { Button } from "react-bootstrap";
// import botNavF from "./botNav"

// const firstName = localStorage.getItem("firstName");
// const lastName = localStorage.getItem("lastName");


export const SideBarDataAdmin = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Users",
    // path: "/user",
    icon: <IoIcons.IoIosPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add New User",
        path: "/users/addnewuser",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
        
      },
      {
        title: "User List",
        path: "/users/userlist",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Admins",
    // path: "/user",
    icon: <MdIcons.MdAdminPanelSettings />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add New Admin",
        path: "/admins/addnewadmin",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
        
      },
      {
        title: "Admin List",
        path: "/admins/adminlist",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "Questions",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add New Questions",
        path: "/questions/addnewquestions",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
      {
        title: "Question Bank",
        path: "/questions/questionbank",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "Quiz",
    // path: "/reports",
    icon: <IoIcons.IoIosBook />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add New MCQ Quiz",
        path: "/quiz/add_new_mcq_quiz",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
      {
        title: "Add New Comp. Quiz",
        path: "/quiz/add_new_comp_quiz",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
      {
        title: "Quiz List",
        path: "/quiz/quizlist",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "Result",
    // path: "/reports",
    icon: <FaIcons.FaForward />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "MCQ results",
        path: "/all_mcq_result",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
      {
        title: "Comp results",
        path: "/all_comp_result",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      }
    ],
  },

  

  {
    title: "Settings",
    // path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Groups",
        path: "/settings/groups",
        icon: <IoIcons.IoIosGitBranch />,
      },
      {
        title: "Categories",
        path: "/settings/categories",
        icon: <IoIcons.IoIosBookmark />,
      },
      {
        title: "General Settings",
        path: "/settings/generalsettings",
        icon: <IoIcons.IoIosSettings />,
      },
    ],
  },

  // {
  //   botNav: "Logged in as:\n(ADMIN) "+firstName+" "+lastName
  // }
];
