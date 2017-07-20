import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import * as userActions from "../../actions/userActions.js";
import { UsersForm } from "./UsersForm.jsx";
import toastr from "toastr";

export class ManageUsers extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      errors: {}
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.postUsers = this.postUsers.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.deleteUsers = this.deleteUsers.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.user.id != nextProps.user.id) {
      // update state on reload when props change
      this.setState({ user: Object.assign({}, nextProps.user) });

    }
  }
  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user: user });
  }
userFormisValid() {
    let formisValid = true;
    let errors = {};

    if (this.state.user.username.length < 5) {
      errors.username = 'Username must be at least 5 characters.';
      formisValid = false;
    }

    this.setState({ errors: errors });
    return formisValid;
  }
  postUsers(event) {
    event.preventDefault();
     if (!this.userFormisValid()) {
      toastr.error('Username must be at least 5 characters!');
      return;
    }
    this.props.actions.postUsers(this.state.user);
    this.props.actions.allUsers();
    this.context.router.push('/users');

  }
  updateUsers(event) {
    event.preventDefault();
    if (!this.userFormisValid()) {
      toastr.error('Username must be at least 6 characters!');
      return;
    }
    this.props.actions.updateUsers(this.state.user);
    this.context.router.push('/users');

  }
  deleteUsers(event) {
    this.props.actions.deleteUsers(this.state.user);
    toastr.success('User Deleted 😯');
    browserHistory.push('/users');
  }
  render() {
    return (
      <div className="doc-form">
        <UsersForm
          user={this.state.user}
          onChange={this.updateUserState}
          onSave={this.postUsers}
          onUpdate={this.updateUsers}
          errors={this.state.errors} />
      {/\/user$/.test(this.props.location.pathname)
          ? ""
          :<button
          onClick={this.deleteUsers}
          className="btn btn-default" style={{ backgroundColor: '#f44336', marginLeft: "82%", marginTop: "-60px" }}>
          Delete
             </button>
          }   
      </div>
    );
  }
}

//Props Validation
ManageUsers.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

//Make router available by using React Router Context
ManageUsers.contextTypes = {
  router: PropTypes.object
};

const getUserById = (user, id) => {
  const users = user.filter(user => user.id == id);
  if (users) return users[0]; //return the first user
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.params.id; // from the path users/:id
  let user = { id: '', firstName: '', lastName: '', username: '', email: '', password: '' };

  if (userId && state.user.length > 0) {
    user = getUserById(state.user, userId);
  }
  return {
    user: user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
