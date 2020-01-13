import React, { useEffect } from "react";
import { func } from "prop-types";
import { loadProfile } from "../actions/login-actions";

function InitUser({ dispatch, onUserInitialized }) {
  useEffect(() => {
    dispatch(loadProfile());
    onUserInitialized(true);
  }, []);

  return <p>Loading.....</p>;
}

InitUser.propTypes = {
  dispatch: func,
  onUserInitialized: func
};

export default InitUser;
