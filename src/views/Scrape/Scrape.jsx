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

// https://demos.creative-tim.com/now-ui-dashboard-pro/examples/components/icons.html
const steps = [
  {
    stepName: "Download",
    stepIcon: "now-ui-icons arrows-1_cloud-download-93",
    component: Step1
  },
  {
    stepName: "Curate",
    stepIcon: "now-ui-icons education_paper",
    component: Step2
  },
  {
    stepName: "Publish",
    stepIcon: "now-ui-icons arrows-1_cloud-upload-94",
    component: Step3
  }
];

class Scrape extends Component {
  render() {
    return (
      <>
        <PanelHeader size="sm"/>
        <div className="content">
          <Col xs={12} md={10} className="mr-auto ml-auto">
            <ReactWizard
              steps={steps}
              navSteps
              validate
              title="Examine Website Page"
              description=""
              headerTextCenter
              color="blue"
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

export default Scrape;
