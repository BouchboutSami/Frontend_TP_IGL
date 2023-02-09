import React from "react";

const user = (props) => {
  console.log(props.user);
  return (
    <div className="text-IGLblanc flex flex-col w-full bg-IGLbgLogin text-xl pl-5 py-10 gap-10">
      <div className="text-IGLblanc">
        <span className="text-IGLorange">Username:</span>
        {props.user[1]}
      </div>
      <div className="text-IGLblanc">
        <span className="text-IGLorange">Email:</span>
        {props.user[2]}
      </div>
    </div>
  );
};

export default user;
