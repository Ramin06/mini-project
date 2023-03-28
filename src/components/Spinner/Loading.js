import React from 'react';
import './Loading.css';
import { ClipLoader } from 'react-spinners'

function Loader() {
    return (
      <>
        <div>
          <ClipLoader color="#00ccff" size={100} />
        </div>
      </>
    );
  }

export default Loader;