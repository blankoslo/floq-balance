import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    props.getProjects();
  }

  render() {
    if (this.props.projects.loading) {
      return null;
    }
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        projects: this.props.projects,
      }));

    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,

  // mapStateToProps
  projects: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  getProjects: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

const mapDispatchToProps = {
  getProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
