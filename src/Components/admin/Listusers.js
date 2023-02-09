import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./user";

const Listusers = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:8000/GetAllusers").then((response) => {
      // console.log(response.data);
      setUsers(response.data);
    });
  }, [Users]);

  return (
    Users && (
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-IGLorange text-3xl underline">
          Liste des utilisateurs
        </h1>
        <div className="w-full flex flex-col gap-4">
          {Users.map((user, i) => {
            return <User key={i} user={user} />;
          })}
        </div>
      </div>
    )
  );
};

export default Listusers;
