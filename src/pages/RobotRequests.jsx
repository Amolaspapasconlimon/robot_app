import RobotInfoDisplay from "../components/RobotInfoDisplay";
import RobotSearchBar from "../components/RobotSearchBar";
import Homepage from "../components/HomePageBanner";

import supabase from "../api-connection/client";

import { useState } from "react";

export default function RobotRequestPage() {
  const [name, setName] = useState("");
  const [robot, setRobot] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("robots")
      .select("name, market")
      .eq("name", name.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    setRobot(data ?? { name, market: "not found" });
  }

  return (
    <div className="login-page">
      <div className="RobotRequestPage-RRP">
        <div className="login-things">
          <Homepage></Homepage>
        </div>
        <div className="robot-frame">
          <RobotSearchBar
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
          <RobotInfoDisplay robot={robot}></RobotInfoDisplay>
        </div>
      </div>
    </div>
  );
}
