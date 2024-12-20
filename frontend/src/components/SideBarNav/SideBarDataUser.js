import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

const firstName = localStorage.getItem("firstName");
const lastName = localStorage.getItem("lastName");


export const SideBarDataUser = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
  },

  {
    title: "Quiz",
    icon: <IoIcons.IoIosBook />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      
      {
        title: "Attempt Quiz",
        path: "/quiz/attempt_quiz",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "Result",
    icon: <FaIcons.FaForward />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "MCQ results",
        path: "/mcq_result",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      },
      {
        title: "Comp results",
        path: "/comp_result_list",
        icon: <IoIcons.IoIosAdd />,
        cName: "sub-nav",
      }
    ],
  },
  
  {
    botNavU: "Logged in as:\n(USER) "+firstName+" "+lastName
  }
];
