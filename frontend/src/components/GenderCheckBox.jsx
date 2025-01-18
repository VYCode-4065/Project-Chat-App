import React from "react";

const GenderCheckBox = ({ onGenderChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            name="male"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={(e) => onGenderChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            name="female"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={(e) => onGenderChange("female")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Other</span>
          <input
            type="checkbox"
            name="other"
            className="checkbox border-slate-900"
            checked={selectedGender === "other"}
            onChange={() => onGenderChange("other")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
