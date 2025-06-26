import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
const formatArray = ["Face-to-face","Online"];
const formatOptions = formatArray.map((x) => ({ name: x, value: x }));

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const CohortEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [course, setCourse] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount courses
                    client
                        .service("courses")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCoursesId } })
                        .then((res) => {
                            setCourse(res.data.map((e) => { return { name: e['title'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Courses", type: "error", message: error.message || "Failed get courses" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            course: _entity?.course?._id,
name: _entity?.name,
start: _entity?.start,
end: _entity?.end,
format: _entity?.format,
capacity: _entity?.capacity,
enrolledCount: _entity?.enrolledCount,
        };

        setLoading(true);
        try {
            
        await client.service("cohort").patch(_entity._id, _data);
        const eagerResult = await client
            .service("cohort")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "course",
                    service : "courses",
                    select:["title"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info cohort updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const courseOptions = course.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Cohort" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="cohort-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="course">Course:</label>
                <Dropdown id="course" value={_entity?.course?._id} optionLabel="name" optionValue="value" options={courseOptions} onChange={(e) => setValByKey("course", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["course"]) && (
              <p className="m-0" key="error-course">
                {error["course"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) && (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="start">Start:</label>
                <Calendar id="start" value={_entity?.start ? new Date(_entity?.start) : null} onChange={ (e) => setValByKey("start", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["start"]) && (
              <p className="m-0" key="error-start">
                {error["start"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="end">End:</label>
                <Calendar id="end" value={_entity?.end ? new Date(_entity?.end) : null} onChange={ (e) => setValByKey("end", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["end"]) && (
              <p className="m-0" key="error-end">
                {error["end"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="format">Format:</label>
                <Dropdown id="format" value={_entity?.format} options={formatOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("format", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["format"]) && (
              <p className="m-0" key="error-format">
                {error["format"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="capacity">Capacity:</label>
                <InputNumber id="capacity" className="w-full mb-3 p-inputtext-sm" value={_entity?.capacity} onChange={(e) => setValByKey("capacity", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["capacity"]) && (
              <p className="m-0" key="error-capacity">
                {error["capacity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="enrolledCount">Enrolled Count:</label>
                <InputNumber id="enrolledCount" className="w-full mb-3 p-inputtext-sm" value={_entity?.enrolledCount} onChange={(e) => setValByKey("enrolledCount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["enrolledCount"]) && (
              <p className="m-0" key="error-enrolledCount">
                {error["enrolledCount"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
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

export default connect(mapState, mapDispatch)(CohortCreateDialogComponent);
