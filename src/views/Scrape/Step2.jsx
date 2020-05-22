/*!

=========================================================
* Now UI Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {Progress} from "reactstrap";

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0
    };
    // this.urlChange = this.urlChange.bind(this);
  }

  isValidated() {
    return this.state.percentage >= 100;
  }

  render() {
    return (
      <>
        <div className="progress-container">
          <span className="progress-badge">Progress</span>
          <Progress max="100" value="25">
            <span className="progress-value">25%</span>
          </Progress>
        </div>
      </>
    );
  }
}


export default Step2;
