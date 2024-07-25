import { Card, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faDollarSign, faClipboardList, faComments, faEllipsisV, faCircle } from '@fortawesome/free-solid-svg-icons';
import '../style/sb-admin-2.min.css';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <FontAwesomeIcon icon={faCalendar} className="text-white-50" /> Generate Report
                </a>
            </div>

            {/* Content Row */}
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <Card className="border-left-primary shadow h-100 py-2">
                        <Card.Body>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Earnings (Monthly)
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faCalendar} className="fa-2x text-gray-300" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <Card className="border-left-success shadow h-100 py-2">
                        <Card.Body>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Earnings (Annual)
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faDollarSign} className="fa-2x text-gray-300" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <Card className="border-left-info shadow h-100 py-2">
                        <Card.Body>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks</div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                        </div>
                                        <div className="col">
                                            <ProgressBar now={50} variant="info" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faClipboardList} className="fa-2x text-gray-300" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <Card className="border-left-warning shadow h-100 py-2">
                        <Card.Body>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Pending Requests
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faComments} className="fa-2x text-gray-300" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Content Row */}
            <div className="row">
                <div className="col-xl-8 col-lg-7">
                    <Card className="shadow mb-4">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Dropdown Header:</div>
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-area">
                                <canvas id="myAreaChart"></canvas>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xl-4 col-lg-5">
                    <Card className="shadow mb-4">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Dropdown Header:</div>
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-pie pt-4 pb-2">
                                <canvas id="myPieChart"></canvas>
                            </div>
                            <div className="mt-4 text-center small">
                                <span className="mr-2"><FontAwesomeIcon icon={faCircle} className="text-primary" /> Direct</span>
                                <span className="mr-2"><FontAwesomeIcon icon={faCircle} className="text-success" /> Social</span>
                                <span className="mr-2"><FontAwesomeIcon icon={faCircle} className="text-info" /> Referral</span>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Content Row */}
            <div className="row">
                <div className="col-lg-6 mb-4">
                    <Card className="shadow mb-4">
                        <Card.Header>
                            <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
                        </Card.Header>
                        <Card.Body>
                            <h4 className="small font-weight-bold">Server Migration <span className="float-right">20%</span></h4>
                            <ProgressBar now={20} variant="danger" className="mb-4" />
                            <h4 className="small font-weight-bold">Sales Tracking <span className="float-right">40%</span></h4>
                            <ProgressBar now={40} variant="warning" className="mb-4" />
                            <h4 className="small font-weight-bold">Customer Database <span className="float-right">60%</span></h4>
                            <ProgressBar now={60} className="mb-4" />
                            <h4 className="small font-weight-bold">Payout Details <span className="float-right">80%</span></h4>
                            <ProgressBar now={80} variant="info" />
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-6 mb-4">
                    <Card className="shadow mb-4">
                        <Card.Header>
                            <h6 className="m-0 font-weight-bold text-primary">Tasks</h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="todo-list">
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Task 1</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Task 2</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Task 3</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
