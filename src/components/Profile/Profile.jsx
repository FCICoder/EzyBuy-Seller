// import React from "react";
import Container from "../UI/Container";
import FormData from "./FormData";
// import Progress from "./Progress";
import UserPanel from "./UserPanel";

const Profile = () => {
  return (
    <Container>
      <div style={{ gridRow: "span 2" }}>
        <UserPanel />
      </div>

      <div style={{ gridColumn: "span 2" }}>
        <FormData />
      </div>
      {/* <div style={{gridColumn: 'span 2'}}>
        <Progress />
      </div> */}
    </Container>
  );
};

export default Profile;
