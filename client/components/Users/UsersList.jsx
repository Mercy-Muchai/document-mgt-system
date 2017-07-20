import React, { PropTypes } from "react";
import { UsersListRow } from "./UsersListRow.jsx";

export const UsersList = ({ user }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {user.length > 0 ? user.map(user =>
          <UsersListRow key={user.id} user={user} />
        ) : <span>User Does Not Exist </span>}
      </tbody>
    </table>
  );
};

UsersList.propTypes = {
  user: PropTypes.array.isRequired
};
