import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <img className="vector-icon" alt="" src="/vector.svg" />
      <div className="admin-dashboard-item" />
      <div className="dashboard">dashboard</div>
      <div className="past-card">
        <div className="past-card-child" />
        <div className="view-all-complaints">View All Complaints</div>
        <div className="view-current-and">
          View Current and past complaints here
        </div>
        <div className="past-card-item" />
        <div className="past-card-inner" />
        <div className="line-div" />
        <div className="past-card-child1" />
        <div className="past-card-child2" />
        <div className="past-card-child3" />
        <div className="past-card-child4" />
        <div className="past-card-child5" />
        <div className="past-card-child6" />
        <button className="pending">Pending</button>
        <div className="past-card-child7" />
        <button className="in-progress">In Progress</button>
        <button className="solved">{`Solved `}</button>
        <b className="filter-by">Filter By</b>
        <b className="complaint-id">Complaint ID</b>
        <b className="location">Location</b>
        <div className="lorem-impsum">lorem impsum</div>
        <div className="lorem-impsum1">lorem impsum</div>
        <div className="lorem-impsum2">lorem impsum</div>
        <b className="date">{`date `}</b>
      </div>
      <div className="filter">Filter</div>
      <img
        className="admin-dashboard-inner"
        alt=""
        src="https://raw.githubusercontent.com/VOSID8/WaterWeb-SIH/44a6aaa3f143304a6775e4ff860d13a0430b8cc7/dashboard/public/rectangle-8.svg"
      />
      <input className="search" placeholder="Search" type="text" />
      <img
        className="logo-1-3"
        alt=""
        src="https://raw.githubusercontent.com/VOSID8/WaterWeb-SIH/master/dashboard/public/logo-1-3%402x.png"
      />
    </div>
  );
};

export default Dashboard;
