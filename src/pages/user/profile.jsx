import React, { useEffect } from "react";

const profile = () => {
  useEffect(() => {
    document.title = "Profile - SnapNest";
  }, []);
  return <div>profile</div>;
};

export default profile;
