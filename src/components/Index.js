import React from "react";
import Container from "react-bootstrap/esm/Container";

const Index = () => {
  return (
    <>
      <Container>
        <div>
          <h3>
            hello Admin <p>{`${localStorage.getItem("adminName")}`}</p>
          </h3>
        </div>
      </Container>
    </>
  );
};

export default Index;
