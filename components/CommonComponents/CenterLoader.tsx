import React from "react";
import { Loader } from "./Loader";


const CenteredLoader = () => {
  return (
    <div style={{ position: 'relative', minHeight: '400px' }}> 
      <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", }}>
        <Loader isLoading={true} />
      </div>
    </div>  
  );
};

export default CenteredLoader;
