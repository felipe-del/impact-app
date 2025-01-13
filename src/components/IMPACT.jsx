import PropTypes from 'prop-types';
import Sidebar from "./sidebar/Sidebar.jsx";
import TopBar from "./topBar/TopBar.jsx";

export default function IMPACT({ responseWrapper }) {
    const user = responseWrapper.data;
    console.log(user);
    return (
        <div id="wrapper">
            {/* Sidebar */}
            <Sidebar role={user.userRoleResponse.roleName} />
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
                {/* Main Content */}
                <div id="content">
                    {/* TopBar */}
                    <TopBar userName={user.name}/>
                </div>
            </div>
        </div>
    )
}
IMPACT.propTypes = {
    responseWrapper: PropTypes.any.isRequired,
};