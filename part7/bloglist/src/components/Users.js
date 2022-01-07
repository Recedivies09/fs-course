import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <Link to={`/users/${user.id}`}>
                  <td>{user.username}</td>
                </Link>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
