import React, { useState, useEffect, useMemo } from "react";

function UserTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.company?.name}</td>
            <td>{user.address?.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const MemoUserTable = React.memo(UserTable);

function UserList({
  apiUrl = "https://glowing-adventure-p7rqjpjgpw47f6w54-8080.app.github.dev/java-coding-practice/api/users",
  authToken,
  authType = "Bearer",
  username,
  password,
  credentials = "omit",
  extraHeaders = {},
}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = useMemo(() => {
    const h = { Accept: "application/json", ...extraHeaders };
    if (authToken) {
      h.Authorization = `${authType} ${authToken}`;
    } else if (username && password) {
      h.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
    }
    return h;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, authType, username, password, JSON.stringify(extraHeaders)]);

  const fetchOptions = useMemo(() => ({ headers, credentials }), [headers, credentials]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    fetch(apiUrl, { ...fetchOptions, signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch users (${response.status} ${response.statusText})`);
        }
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setLoading(false);
        setUsers((prev) => {
          try {
            const prevStr = JSON.stringify(prev);
            const dataStr = JSON.stringify(data);
            if (prevStr === dataStr) return prev;
          } catch (e) {
            // fall through to set new data
          }
          return data;
        });
      })
      .catch((err) => {
        if (signal.aborted || cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [apiUrl, fetchOptions]);

  return (
    <div>
      <h2>User List</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <MemoUserTable users={users} />
      )}
    </div>
  );
}

export default React.memo(UserList);
