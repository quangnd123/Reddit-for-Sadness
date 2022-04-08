import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth.js";
import ViewProfile from "../../components/Profile/ViewProfile.jsx";
import { getUser } from "../../graphql/query.js";

const User = () => {
  //for now "user" only has _id, username, email, I'll add more information for this query
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  const { id } = router.query;
  const { loading, data, error } = useQuery(getUser, {
    variables: { userID: id },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }
  console.log(data);
  const User = data.getUser;

  return (
    <h3>
      <ViewProfile id={User._id} username={User.username} email={User.email} />
    </h3>
  );
};
export default User;
