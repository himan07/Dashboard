import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../Assets/CSS/LineChart.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "./Table";
import FileTable from "./Table";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: "0px 20px 2px 20px",
  },
  menu: {
    position: "relative",
    top: "1rem",
  },
}));

const LineChartX = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(null);
  const [menuText, setMenuText] = useState("");
  const [hrsData, setHrsData] = useState([]);
  const [show, setShow] = useState(false);
  const [weeks, setWeeks] = useState([]);
  const [months, setMonths] = useState([]);
  const handleMenuOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (event) => {
    setOpen(null);
    setMenuText(event.target.innerText);
  };

  //fetching time interval
  const fetchTodayData = () => {
    const newData = [];
    let currentHour = new Date();
    currentHour.setHours(0, 0, 0, 0);
    for (let i = 0; i < 24; i++) {
      const newPrice = Math.floor(Math.random() * 200) + 50;
      const hour = currentHour.getHours();
      const formattedHour = hour === 0 ? 12 : hour;
      const startTime = `${formattedHour}:00${hour < 12 ? "am" : "pm"}`;
      const nextHour = new Date(currentHour);
      nextHour.setHours(currentHour.getHours() + 1);
      newData.push({
        name: `${startTime} `,
        price: newPrice,
      });
      currentHour = nextHour;
    }
    setHrsData(newData);
  };

  // fetching days list of a weak
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getCurrentWeek = () => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysSinceMonday = (currentDayOfWeek + 7 - 3) % 7;
    const currentWeek = [];
    for (let i = daysSinceMonday; i < daysSinceMonday + 7; i++) {
      const dayIndex = i % 7;
      const newPrice = Math.floor(Math.random() * 200) + 50;
      currentWeek.push({
        name: `${daysOfWeek[dayIndex]} `,
        price: newPrice,
      });
    }
    return currentWeek;
  };

  const weekData = getCurrentWeek();
  console.log(weekData);

  // fetching the months data
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCurrentYearMonths = () => {
    const currentMonth = new Date().getMonth();
    const currentYearMonths = [];
    for (let i = 0; i < 12; i++) {
      const newPrice = Math.floor(Math.random() * 200) + 50;
      const monthIndex = (currentMonth + i) % 12;
      currentYearMonths.push({
        name: monthsOfYear[monthIndex],
        price: newPrice,
      });
    }
    return currentYearMonths;
  };
  useEffect(() => {
    setWeeks(getCurrentWeek());
    fetchTodayData();
    setMonths(getCurrentYearMonths());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTodayData();
      getCurrentWeek();
      getCurrentYearMonths();
    }, 10000);

    return () => clearInterval(interval);
  }, [hrsData, weeks]);

  const handleClick = () => {
    setShow(true);
  };

  const handleDoubleClick = () => {
    setShow(false);
  };

  console.log(hrsData, weeks, months, "All type of datas");

  return (
    <div className="container">
      <h1 className="help_desk">COSTACLOUD HELP DESK</h1>
      <div className="chart_menu_container">
        <LineChart
          width={1200}
          height={400}
          data={
            menuText === "Today"
              ? hrsData
              : menuText === "Week"
              ? weeks
              : menuText === "Month"
              ? months
              : hrsData
          }
          margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
          onClick={() => setShow(true)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="red"
            strokeWidth={2}
            dot={false}
            activeDot={hrsData ? true : false}
          />
        </LineChart>
        <div className="menu_item">
          <Button
            onClick={handleMenuOpen}
            aria-controls="menu"
            aria-haspopup="true"
            className="menu_btn"
            size="small"
            variant="outlined"
          >
            {menuText ? menuText : "Today"}
          </Button>
          <Menu
            id="menu"
            anchorEl={open}
            keepMounted
            open={Boolean(open)}
            onClose={handleClose}
            className={classes.menu}
          >
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              Today
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              Week
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              Month
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              Year
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="table_container">{show ? <FileTable /> : ""}</div>
    </div>
  );
};

export default LineChartX;
