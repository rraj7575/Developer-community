import React from "react";
import classnames from "classname";
import PropTypes from "prop-types";
const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
}) => {
  return (
    <div className="form-gropu">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {/*{info && <small className='form-text text-muted'>{info}</small>}*/}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
};

export default TextAreaFieldGroup;
