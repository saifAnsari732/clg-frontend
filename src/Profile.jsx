import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; // Assuming you have a CSS file for additional styles
import { BACK } from "./Util";
import { Link } from "react-router-dom";
const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profileData, setProfileData] = useState("");
  // const [Attendance, setAttendance] = useState(0);
  const [count, setCount] = useState();
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const toke = localStorage.getItem("authToken"); // Initialize authToken in localStorage
// profile data fetch
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${BACK}/user/data`, {
          headers: {
            Authorization: `Bearer ${toke}`,
          },
          withCredentials: true, // Ensure cookies are sent with the request
        });
        console.log(
          "Profile data fetched successfully:",
          response.data.userdata
        );
        setProfileData(response.data.userdata);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchdata();
  }, []);

  // attendence fetch  code
  useEffect(() => {
    const fetchAttendance = async () => { 
      try {
        const response = await axios.get(`${BACK}/user/attendence`, {
          headers: {
            Authorization: `Bearer ${toke}`,
          },
          withCredentials: true,
        });
       
        setCount(response.data.length);
        console.log(response.data.length,"lenth"); // Assuming response.data is an array of attendance records
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchAttendance();
  }, []); 

  // attendance create code
  

  const handelattendence = async () => {
    try {
      const response = await axios.post(`${BACK}/user/createattendence`, {
        attendance: count,
      });

      console.log("Attendance created successfully:", response.data);
    } catch (error) {
      console.error("Error creating attendance:", error);
    }
  };

  return (
    <div>
      <div
        className={`min-h-screen transition-colors duration-300  ${
          darkMode
            ? "bg-gradient-to-br from-green-300 to-purple-500"
            : "bg-gradient-to-br from-blue-900 to-black"
        } py-12 px-4 sm:px-6 lg:px-8`}
      >
        <Link className="btn2" to="/">
          Login
        </Link>
        <div className="max-w-3xl mx-auto ">
          {/* Dark Mode Toggle */}

          <div className="flex justify-end mb-4">
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                darkMode
                  ? "bg-purple-600 focus:ring-purple-500"
                  : "bg-gray-200 focus:ring-gray-500"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>

            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {darkMode ? "Dark" : "Light"}
            </span>
          </div>

          {/* Gradient Banner */}
          <div
            className={`rounded-t-2xl p-6 text-white shadow-lg ${
              darkMode
                ? "bg-gray-800"
                : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
            }`}
          >
            <h1 className="text-3xl font-bold text-center">Student Profile</h1>
          </div>

          {/* Profile Card */}
          <div
            className={`rounded-b-2xl shadow-xl overflow-hidden ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
          >
            <div className="md:flex ">
              {/* Profile Image Section */}
              <div className=" p-6 flex justify-center">
                <div className="relative">
                  <img
                    id="imag"
                    className="w-[400px] h-[400px] rounded-full  object-cover "
                    style={{ borderColor: darkMode ? "#7c3aed" : "#e9d5ff" }}
                    src={profileData?.image?.url}
                    alt="Profile"
                  />
                  {/* <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold shadow-md ${darkMode ? 'bg-purple-700' : 'bg-purple-600'} text-white`}>
                  Student ID: 20230045
                </div> */}
                </div>
              </div>

              {/* Profile Details Section */}

              <div className="md:w-2/3 p-6">
                <div className="space-y-4">
                  <div>
                    <h2
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {profileData.username || "Alex Johnson"}
                    </h2>
                    <p
                      className={`font-medium ${
                        darkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      Computer Science Engineering
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <h3
                        className={`text-sm font-semibold uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Academic Info
                      </h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center">
                          <span
                            className={`font-medium w-24 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Roll No:
                          </span>
                          <span>{profileData.roll}</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className={`font-medium w-24 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Class:
                          </span>
                          <span>{profileData.classname}</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className={`font-medium w-24 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Semester:
                          </span>
                          <span>{profileData.semester}</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className={`font-medium w-24 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Branch:
                          </span>
                          <span>{profileData.branch}</span>
                        </li>
                      </ul>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <h3
                        className={`text-sm font-semibold uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Contact Info
                      </h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center">
                          <span
                            className={`font-medium w-24 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Phone:
                          </span>
                          <span>{profileData.phone}</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className={`font-medium w-24 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Email:
                          </span>
                          <span>{profileData.email}</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className={`font-medium w-24 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Address:
                          </span>
                          <span>{profileData.address}</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className={`font-medium w-24 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Date:
                          </span>
                          <span>
                            {profileData?.createdAt
                              ? new Date(profileData.createdAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h3
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Institution Details
                    </h3>
                    <div className="mt-2 space-y-2">
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Maharishi University of Technology
                      </p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        Sitapur Road, P.O-Maharishi Vidya Mandir, Lucknow-226013
                        (UP)
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Accredited by APS | Est. 1995
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className={`px-6 py-4 border-t ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <div className="flex items-center justify-start space-x-4">
                <p
                  className={`text-lg ${
                    darkMode ? "text-green-500" : "text-purple-900"
                  } text-1xl`}
                >
                  Creater By : Saifuddin Ansari
                </p>

                <div className="flex space-x-6 space-y-2">
                  <button onClick={handelattendence}
                    className={`px-3 py-2 text-1xl font-medium border-2 border-s-violet-600 ${
                      darkMode
                        ? "bg-gradient-to-r from-purple-600 to-blue-500 text-green-200"
                        : "bg-gradient-to-r from-teal-300 to-blue-400 text-green-800"
                    }`}
                  >
                    Attendance: 
                  </button>
                  <p className={`text-2xl  border-x-slate-950  ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{count} - day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
