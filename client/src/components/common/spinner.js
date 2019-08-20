import { PureComponent } from "react";
import { CircularProgress } from "@material-ui/core";
import { bool } from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

const Dialog = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

class Spinner extends PureComponent {
  static propTypes = {
    showSpinner: bool
  };
  render() {
    const { showSpinner } = this.props;
    if (!showSpinner) return null;

    return (
      <Dialog>
        <CircularProgress color="secondary" />
      </Dialog>
    );
  }
}

export default connect(state => ({ showSpinner: state.common.showSpinner }))(
  Spinner
);
