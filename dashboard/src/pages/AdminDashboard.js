import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-child" />
      <img className="vector-icon" alt="" src="/vector.svg" />
      <Button className="bell" variant="outline-primary" />
      <div className="water-web">Water Web</div>
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
      <div className="home-parent">
        <div className="home">Home</div>
        <img className="vector-icon1" alt="" src="/vector1.svg" />
      </div>
      <div className="file-a-grievance-parent">
        <div className="file-a-grievance">File a grievance</div>
        <img className="vector-icon2" alt="" src="/vector2.svg" />
      </div>
      <div className="general-parent">
        <div className="general">General</div>
        <img className="vector-icon3" alt="" src="/vector3.svg" />
      </div>
      <div className="vector-parent">
        <img className="vector-icon4" alt="" src="/vector4.svg" />
        <div className="dashboard1">Dashboard</div>
      </div>
      <div className="filter">Filter</div>
      <img className="admin-dashboard-inner" alt="" src="/rectangle-8.svg" />
      <input className="search" placeholder="Search" type="text" />
      <img className="logo-1-3" alt="" src="/logo-1-3@2x.png" />
      <img className="icon-user" alt="" src="/-icon-user.svg" />
    </div>
  );
};

export default AdminDashboard;
