import React from 'react';
import {Button} from "reactstrap";
import PropTypes from "prop-types";

import {toUTF8Array} from "../../Utils";

class FileDownload extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  dowloadFileToDefaultFolder = () => {
    const {filename, content, contentType} = this.props;
    const utf8ByteArray = toUTF8Array(JSON.stringify(content));
    const blob = new Blob([utf8ByteArray], {type: contentType});
    const url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }

  render() {
    return (
      <>
        <Button
          color="primary"
          className="btn-round"
          onClick={() => this.dowloadFileToDefaultFolder("application/json")}
        >
          <i className="now-ui-icons ui-2_favourite-28"/> Download Article
        </Button>
      </>
    )
  }

}

FileDownload.propTypes = {
  filename: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  contentType: PropTypes.string.isRequired,
};

export default FileDownload;
