import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleCourseCategoriesPage from "../components/app_components/CourseCategoriesPage/SingleCourseCategoriesPage";
import CourseCategoryProjectLayoutPage from "../components/app_components/CourseCategoriesPage/CourseCategoryProjectLayoutPage";
import SingleCoursesPage from "../components/app_components/CoursesPage/SingleCoursesPage";
import CourseProjectLayoutPage from "../components/app_components/CoursesPage/CourseProjectLayoutPage";
import SingleCohortPage from "../components/app_components/CohortPage/SingleCohortPage";
import CohortProjectLayoutPage from "../components/app_components/CohortPage/CohortProjectLayoutPage";
import SingleCourseRegistrationPage from "../components/app_components/CourseRegistrationPage/SingleCourseRegistrationPage";
import CourseRegistrationProjectLayoutPage from "../components/app_components/CourseRegistrationPage/CourseRegistrationProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
<Route path="/courseCategories/:singleCourseCategoriesId" exact element={<SingleCourseCategoriesPage />} />
<Route path="/courseCategories" exact element={<CourseCategoryProjectLayoutPage />} />
<Route path="/courses/:singleCoursesId" exact element={<SingleCoursesPage />} />
<Route path="/courses" exact element={<CourseProjectLayoutPage />} />
<Route path="/cohort/:singleCohortId" exact element={<SingleCohortPage />} />
<Route path="/cohort" exact element={<CohortProjectLayoutPage />} />
<Route path="/courseRegistration/:singleCourseRegistrationId" exact element={<SingleCourseRegistrationPage />} />
<Route path="/courseRegistration" exact element={<CourseRegistrationProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
        </Routes>
    );
}

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
