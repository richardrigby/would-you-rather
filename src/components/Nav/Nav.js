import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem
} from "@atlaskit/dropdown-menu";
import Button from "@atlaskit/button";
import "./Nav.css";
import { setAuthedUser, logoutUser } from "../../actions/authedUser";

const handleUserSelect = (e, dispatch, id) => {
  e.preventDefault();
  console.log(id);

  dispatch(setAuthedUser(id));
};

const handleUserLogout = (e, dispatch) => {
  e.preventDefault();

  dispatch(logoutUser());
};

function Nav(props) {
  const { users, loading, authedUser, dispatch } = props;

  let user = users.filter(user => user.id === authedUser);
  return (
    <div className="nav">
      <nav>
        <div className="right userSelect">
          <DropdownMenu
            trigger={user.length === 1 ? user[0].name : "Login User"}
            triggerType="button"
            shouldFlip={true}
            isLoading={loading}
            position="left top"
          >
            <DropdownItemGroup>
              {users.map(user => {
                return (
                  <DropdownItem
                    id={user.id}
                    key={user.id}
                    onClick={e => handleUserSelect(e, dispatch, user.id)}
                  >
                    {user.name}
                  </DropdownItem>
                );
              })}
              {authedUser ? (
                <div>
                  <hr />
                  <DropdownItem
                    id="logout"
                    onClick={e => handleUserLogout(e, dispatch)}
                  >
                    Logout
                  </DropdownItem>
                </div>
              ) : null}
            </DropdownItemGroup>
          </DropdownMenu>
        </div>
        {!authedUser ? null : (
          <Fragment>
            <ul>
              <li>
                <NavLink
                  className="menu-btn"
                  to="/"
                  exact
                  activeClassName="active"
                >
                  <Button>Questions</Button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="menu-btn"
                  to="/leaderboard"
                  exact
                  activeClassName="active"
                >
                  <Button>Leaderboard</Button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="menu-btn"
                  to="/new"
                  exact
                  activeClassName="active"
                >
                  <Button>New</Button>
                </NavLink>
              </li>
              <li>
                <h3 className="center">Would you Rather?</h3>
              </li>
            </ul>
          </Fragment>
        )}
      </nav>
    </div>
  );
}

function mapStateToProps({ users, authedUser }) {
  const usersArray = Object.values(users);

  users = usersArray.map(user => {
    return {
      id: user.id,
      name: user.name
    };
  });
  const loading = users.length === 0;
  return { users, loading, authedUser };
}

export default withRouter(connect(mapStateToProps)(Nav));
