import { useEffect } from "react";
// import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../api-connection/client";

function Homepage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <h2>You're currently located in the homepage</h2>
      <button disabled={false} onClick={() => supabase.auth.signOut()}>
        Click here to exit
      </button>
    </>

  );
}
export default Homepage