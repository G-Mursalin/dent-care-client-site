import { useState, useEffect } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminIsLoading, setAdminIsLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`https://dent-care.herokuapp.com/user/${email}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.admin);
          setAdminIsLoading(false);
        });
    }
  }, [user]);

  return [admin, adminIsLoading];
};

export default useAdmin;
