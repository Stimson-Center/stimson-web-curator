import React from "react";
// react plugin used to create DropdownMenu for selecting items
// reactstrap components
import {Col, FormGroup, Input, Label, Row} from "reactstrap";
import {isEmpty} from "../../Utils";

// core components

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    const {wizardData} = props;
    this.state = {
      select: null,
      article: !isEmpty(wizardData) && !isEmpty(wizardData.Progress.article) ? props.wizardData.Progress.article : null
    };
  }

  componentDidMount() {
    const {wizardData} = this.props;
    const {article} = this.state;
    if (!isEmpty(wizardData) && !isEmpty(wizardData.Progress.article) && isEmpty(article)) {
      console.log("Step3 article=" + JSON.stringify(wizardData.Progress, null, 2));
      this.setState({article: wizardData.Progress.article});
    }
  }

  render() {
    let {article} = this.state;
    const {wizardData} = this.props;
    if (!isEmpty(wizardData) && !isEmpty(wizardData.Progress)) {
      article = wizardData.Progress.article;
    }
    return (
      <>
        <h5 className="info-text"> Review / Modify Results</h5>
        <Row className="justify-content-center">
          <Col xs={12} sm={7}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                value={!isEmpty(article) ? article.title : "edit"}
                onChange={value => this.setState({select: value})}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={3}>
            <FormGroup>
              <Label>Publish Date</Label>
              <Input
                type="text"
                value={!isEmpty(article) ? article.publish_date : "edit"}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={5}>
            <FormGroup>
              <Label>Authors</Label>
              <Input
                type="text"
                value={!isEmpty(article) ? article.authors : "edit"}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={5}>
            <FormGroup>
              <Label>Summary</Label>
              <Input
                type="text"
                value={!isEmpty(article) ? article.summary : "edit"}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={5}>
            <FormGroup>
              <Label>Keywords</Label>
              <Input
                type="text"
                value={!isEmpty(article) ? article.keywords : "enter"}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={5}>
            <FormGroup>
              <Label>Text</Label>
              <Input
                type="text"
                value={!isEmpty(article) ? article.text : "enter"}
              />
            </FormGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default Step3;
