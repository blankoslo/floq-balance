import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { clearApiError } from '../actions';

class ErrorDialog extends Component {
  handleClose = () => {
    this.props.clearApiError();
  };

  render() {
    const actions = [
      <FlatButton
        label='Got it'
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title='Error'
          actions={actions}
          modal
          open={this.props.error !== null}
          onRequestClose={this.handleClose}
        >
          {this.props.error}
        </Dialog>
      </div>
    );
  }
}

ErrorDialog.propTypes = {
  error: React.PropTypes.string,
  clearApiError: React.PropTypes.func
};

const mapStateToProps = (state) => ({
  error: state.error
});

export default connect(mapStateToProps, { clearApiError })(ErrorDialog);
