import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";
import SectionsPage from "../SectionsPage/SectionsPage";
import ProfilesPage from "../ProfilesPage/ProfilesPage";
import RecentService from "../../../services/RecentService";

const SingleDepartmentsPage = (props) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);
  const [newRecentItem, setNewRecentItem] = useState(null);
  const departmentId = urlParams.singleDepartmentsId;

  const [companyId, setCompanyId] = useState([]);

  useEffect(() => {
    //on mount
    client
      .service("departments")
      .get(urlParams.singleDepartmentsId, {
        query: {
          $populate: [
            {
              path: "createdBy",
              service: "users",
              select: ["name"],
            },
            {
              path: "updatedBy",
              service: "users",
              select: ["name"],
            },
            "companyId",
          ],
        },
      })
      .then((res) => {
        set_entity(res || {});
        const companyId = Array.isArray(res.companyId)
          ? res.companyId.map((elem) => ({ _id: elem._id, name: elem.name }))
          : res.companyId
            ? [{ _id: res.companyId._id, name: res.companyId.name }]
            : [];
        setCompanyId(companyId);
        const recentItem = {
          icon: "pi pi-building",
          label: "departments",
          url: `/departments/${res._id}`,
          mainMenu: "company",
          id: res._id,
          name: Object.values(res)[1],
        };
        setNewRecentItem(recentItem);
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Departments",
          type: "error",
          message: error.message || "Failed get departments",
        });
      });
  }, [props, urlParams.singleDepartmentsId]);

  const goBack = () => {
    navigate("/departments");
  };

  const helpSidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        helpSidebarRef.current &&
        !helpSidebarRef.current.contains(event.target) &&
        isHelpSidebarVisible
      ) {
        setHelpSidebarVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHelpSidebarVisible]);

  const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

  const menuItems = [
    {
      label: "Copy link",
      icon: "pi pi-copy",
      command: () => copyPageLink(),
    },
    {
      label: "Help",
      icon: "pi pi-question-circle",
      command: () => toggleHelpSidebar(),
    },
  ];

  return (
    <ProjectLayout>
      <div className="col-12 flex flex-column align-items-center">
        <div className="col-12">
          <div className="flex align-items-center justify-content-between">
            <div className="flex align-items-center">
              <Button
                className="p-button-text"
                icon="pi pi-chevron-left"
                onClick={() => goBack()}
              />
              <h3 className="m-0">Departments</h3>
              <SplitButton
                model={menuItems.filter(
                  (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                )}
                dropdownIcon="pi pi-ellipsis-h"
                buttonClassName="hidden"
                menuButtonClassName="ml-1 p-button-text"
              />
            </div>

            {/* <p>departments/{urlParams.singleDepartmentsId}</p> */}
          </div>
          <div className="card w-full">
            <div className="grid ">
              <div className="col-12 md:col-6 lg:col-3 mb-10">
                <label className="text-sm text-gray-600">Name</label>
                <p className="m-0 ml-3">{_entity?.name}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3 mb-10">
                <label className="text-sm text-gray-600">Code</label>
                <p className="m-0 ml-3">{_entity?.code}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3 mb-10">
                <label className="text-sm text-gray-600">Is default</label>
                <p className="m-0">
                  <i
                    id="isDefault"
                    className={`pi ${_entity?.isDefault ? "pi-check" : "pi-times"}`}
                  ></i>
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3 mb-10">
                <label className="text-sm text-gray-600">Company</label>
                {companyId.map((elem) => (
                  <Link key={elem._id} to={`/companies/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">{elem.name}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="col-12">&nbsp;</div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <TabView>
            {" "}
            <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
              <SectionsPage />
            </TabPanel>
            <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
              <ProfilesPage />
            </TabPanel>
          </TabView>
        </div>{" "}
        <CommentsSection
          recordId={urlParams.singleDepartmentsId}
          user={props.user}
          alert={props.alert}
          serviceName="departments"
        />
        {newRecentItem && (
          <RecentService
            companyId={departmentId}
            get={props.get}
            set={props.set}
            newRecentItem={newRecentItem}
          />
        )}
        <div
          id="rightsidebar"
          className={classNames(
            "overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out",
            { hidden: !isHelpSidebarVisible },
          )}
          style={{ top: "60px", height: "calc(100% - 60px)" }}
        >
          <div className="flex flex-column h-full p-4">
            <span className="text-xl font-medium text-900 mb-3">Help bar</span>
            <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
          </div>
        </div>
      </div>
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  get: () => dispatch.cache.get(),
  set: (data) => dispatch.cache.set(data),
});

export default connect(mapState, mapDispatch)(SingleDepartmentsPage);
