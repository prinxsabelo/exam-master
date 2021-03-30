import React from "react";
import { connect } from "react-redux";
import { getLevels, deleteLevel } from "../../../redux/actions/levelActions";
import PropTypes from "prop-types";
import LevelList from "./LevelList";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";

class LevelsPage extends React.Component {
  state = {
    redirectToAddLevelPage: false,
  };
  componentDidMount() {
    const { levels } = this.props;
    if (levels.length === 0) {
      this.props.getLevels();
    }
  }
  handleDelete = async (level) => {
    this.props.deleteLevel(level);
  };
  handleEdit = (level) => {
    this.props.history.push(`/admin/main/level/${level.id}`);
  };
  render() {
    const { levels } = this.props;
    return (
      <>
        {this.state.redirectToAddLevelPage && (
          <Redirect to="/admin/main/level" />
        )}
        <div className="container shadow-lg p-2">
          <Button
            style={{ marginBottom: 20 }}
            variant="contained"
            color="primary"
            onClick={() => this.setState({ redirectToAddLevelPage: true })}
          >
            ADD LEVEL
          </Button>
          <LevelList
            levels={levels}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        </div>
      </>
    );
  }
}
LevelsPage.propTypes = {
  levels: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    levels: state.levels,
  };
};
const mapDispatchToProps = {
  getLevels,
  deleteLevel,
};
export default connect(mapStateToProps, mapDispatchToProps)(LevelsPage);
