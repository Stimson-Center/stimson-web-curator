import React, {Component} from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";
// reactstrap components
import {Col} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import {isEmpty} from "../../Utils";
import Cookies from 'universal-cookie';

// https://demos.creative-tim.com/now-ui-dashboard-pro/examples/components/icons.html
// https://github.com/creativetimofficial/react-bootstrap-wizard/issues/1

class Cleanse extends Component {
  render() {
    if (!isEmpty(this.props) && "cleanse_url" in this.props) {
      // console.log("Cleanse: in render()")
      const cookies = new Cookies();
      let d = new Date();
      const minutes = 10;
      d.setTime(d.getTime() + (minutes*60*1000));
      cookies.set("cleanse_url", this.props.cleanse_url, {path: "/", expires: d});
    }
    return (
      <>
        <PanelHeader size="sm"/>
        <div className="content">
          <Col xs={12} md={10} className="mr-auto ml-auto">
            <ReactWizard
              steps={[
                {
                  stepName: "Download",
                  stepIcon: "now-ui-icons arrows-1_cloud-download-93",
                  component: Step1
                  // component: <Step1
                  //   props={this.props}
                  // />
                },
                {
                  stepName: "Review",
                  stepIcon: "now-ui-icons education_paper",
                  component: Step2
                },
                {
                  stepName: "Publish",
                  stepIcon: "now-ui-icons arrows-1_cloud-upload-94",
                  component: Step3
                }
              ]}
              navSteps
              validate
              title="Cleanse Article"
              description=""
              headerTextCenter
              color="blue"
              finishButtonClick={this.handleFinishButton}
              finishButtonClasses="btn-wd"
              nextButtonClasses="btn-wd"
              previousButtonClasses="btn-wd"
            />
          </Col>
        </div>
      </>
    );
  }
}

export default Cleanse;
