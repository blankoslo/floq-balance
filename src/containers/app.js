import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    props.getProjects();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.location.query.year !== this.props.location.query.year) {
  //     this.props.selectYear(nextProps.location.query.year);
  //   }
  //   if (nextProps.location.query.week !== this.props.location.query.week) {
  //     this.props.selectWeek(nextProps.location.query.week);
  //   }
  // }

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
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
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
