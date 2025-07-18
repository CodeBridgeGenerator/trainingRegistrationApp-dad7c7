import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { getSchemaValidationErrorsStrings } from "../../../utils";
import { Dropdown } from "primereact/dropdown";

const CompaniesCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();

  const companyTypes = [
    { label: "Atlas", value: "atlas" },
    { label: "IRMS", value: "irms" },
    { label: "External", value: "external" },
    { label: "Customer", value: "customer" },
    { label: "CodeBridge", value: "codebridge" },
  ];

  useEffect(() => {
    let init = { companyNo: "", isdefault: false };
    if (!_.isEmpty(props?.entity)) {
      init = initilization({ ...props?.entity, ...init }, [], setError);
    }
    setError({});
    set_entity({ ...init });
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (_.isEmpty(_entity?.companyNo)) {
      error["companyNo"] = `Company no field is required`;
      ret = false;
    }
    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      name: _entity?.name,
      companyNo: _entity?.companyNo,
      newCompanyNumber: _entity?.newCompanyNumber,
      companyType: _entity?.companyType,
      DateIncorporated: _entity?.DateIncorporated,
      isdefault: _entity?.isdefault || false,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("companies").create(_data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Companies created successfully",
      });
      props.onCreateResult(result);
    } catch (error) {
      console.debug("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Companies",
      });
    }
    setLoading(false);
  };

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  return (
    <Dialog
      header="Create Companies"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="companies-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="name">Name:</label>
            <InputText
              id="name"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.name}
              onChange={(e) => setValByKey("name", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="companyType">Company Type:</label>
            <Dropdown
              id="companyType"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.companyType}
              options={companyTypes}
              onChange={(e) => setValByKey("companyType", e.value)}
              placeholder="Select a Company Type"
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["companyType"]) ? (
              <p className="m-0" key="error-companyType">
                {error["companyType"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="companyNo">Company no:</label>
            <InputText
              id="companyNo"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.companyNo}
              onChange={(e) => setValByKey("companyNo", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["companyNo"]) ? (
              <p className="m-0" key="error-companyNo">
                {error["companyNo"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="newCompanyNumber">New company number:</label>
            <InputNumber
              id="newCompanyNumber"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.newCompanyNumber}
              useGrouping={false}
              onChange={(e) => setValByKey("newCompanyNumber", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["newCompanyNumber"]) ? (
              <p className="m-0" key="error-newCompanyNumber">
                {error["newCompanyNumber"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="DateIncorporated">Date Incorporated:</label>
            <Calendar
              id="DateIncorporated"
              value={
                _entity?.DateIncorporated
                  ? new Date(_entity?.DateIncorporated)
                  : new Date()
              }
              dateFormat="dd/mm/yy"
              onChange={(e) =>
                setValByKey("DateIncorporated", new Date(e.target.value))
              }
              showIcon
              showButtonBar
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["DateIncorporated"]) ? (
              <p className="m-0" key="error-DateIncorporated">
                {error["DateIncorporated"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field flex">
          <span className="align-items-center">
            <label htmlFor="isdefault">Is default:</label>
            <Checkbox
              id="isdefault"
              className="ml-3"
              checked={_entity?.isdefault}
              onChange={(e) => setValByKey("isdefault", e.checked)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["isdefault"]) ? (
              <p className="m-0" key="error-isdefault">
                {error["isdefault"]}
              </p>
            ) : null}
          </small>
        </div>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CompaniesCreateDialogComponent);
