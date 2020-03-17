import React, { Component } from 'react';
import { connect } from 'react-redux';

class RenderRouter extends Component<any> {

  render() {
    return (
      <div>
        RenderRouter
      </div>
    );
  }
}

export default connect()(RenderRouter);