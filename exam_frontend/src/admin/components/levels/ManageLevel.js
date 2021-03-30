import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LevelForm from "./LevelForm";
import { saveLevel, getLevels } from "../../../redux/actions/levelActions";
export function ManageLevel({ levels, getLevels, ...props }) {
  const [level, setLevel] = useState({ ...props.level });

  useEffect(() => {
    if (levels.length === 0) {
      getLevels();
    } else {
      setLevel({ ...props.level });
    }
  }, [props.level, getLevels, levels.length]);

  function handleChange(event) {
    const { name, value } = event.target;
    setLevel((prevLevel) => ({
      ...prevLevel,
      [name]: value.toUpperCase(),
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.saveLevel(level, props.history);
  }

  return (
    <LevelForm
      onChange={handleChange}
      level={level}
      levels={levels}
      onSubmit={handleSubmit}
    />
  );
}
ManageLevel.propTypes = {
  levels: PropTypes.array.isRequired,
  level: PropTypes.object.isRequired,
  getLevels: PropTypes.func.isRequired,
};
export function getLevelById(levels, id) {
  return levels.find((level) => level.id === id);
}
const mapStateToProps = (state, ownProps) => {
  const newLevel = { id: "", level: "" };
  const level_id = Number(ownProps.match.params.level_id);

  const level =
    level_id && state.levels.length > 0
      ? getLevelById(state.levels, level_id)
      : newLevel;
  // console.log(state);
  return {
    level,
    levels: state.levels,
  };
};
const mapDispatchToProps = {
  saveLevel,
  getLevels,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLevel);
