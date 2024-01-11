import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useSelector } from "react-redux";
import { FaBlackTie, FaGraduationCap, FaUser } from "react-icons/fa6";

const Dashboard = () => {
  const user = useSelector((store) => store.user);
  const { data: profile, isLoading } = useFetch("/profile/me");
  console.log(user._id);
  return isLoading ? (
    <div id="spinner" className="vh-100 fixed">
      <Spinner className="spinner" />
    </div>
  ) : profile ? (
    <div id="dashboard" className="container">
      <h1 className="text-info my-3 display-2 fw-bold">Dashboard</h1>
      <p className="fs-4">
        <FaUser /> Welcome {user.name}
      </p>
      <div className="d-flex gap-3">
        <Button as={Link} to="/edit-profile" variant="light">
          <FaUser /> Edit Profile
        </Button>
        <Button as={Link} to="/add-exp" variant="light">
          <FaBlackTie /> Add Experience
        </Button>
        <Button as={Link} to="/add-edu" variant="light">
          <FaGraduationCap /> Add Education
        </Button>
      </div>
      <h2 className="my-3">Experience Credentials</h2>

      <table className="table w-75">
        <thead>
          <tr>
            <td>Company</td>
            <td>Title</td>
            <td>Years</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {profile.experience.map((exp) => {
            return (
              <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                  {new Date(exp.from).toLocaleDateString()} -{" "}
                  {new Date(exp.to).toLocaleDateString()}
                </td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 className="my-3">Education Credentials</h2>

      <table className="table w-75">
        <thead>
          <tr>
            <td>School</td>
            <td>Degree</td>
            <td>Years</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {profile.education.map((edu) => {
            return (
              <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                  {new Date(edu.from).toLocaleDateString()} -{" "}
                  {new Date(edu.to).toLocaleDateString()}
                </td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button variant="danger">
        <FaUser /> Delete My Account
      </Button>
    </div>
  ) : (
    <div id="dashboard" className="container">
      <h1 className="text-info my-3 display-2 fw-bold">Dashboard</h1>
      <p className="fs-4">{/* <FaUser /> Welcome {user.name} */}</p>
      <Button variant="info">Create Profile</Button>
    </div>
  );
};

export default Dashboard;
