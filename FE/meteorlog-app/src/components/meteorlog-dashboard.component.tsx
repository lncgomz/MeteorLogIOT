import { Component, ChangeEvent } from "react";
import MeteorlogDataService from "../services/meteorlog.service";
import IMeteorlogData from '../types/meteorlog.type';
import MeteorlogGrid from "./meteorlog-grid.component";
import { TabView, TabPanel } from 'primereact/tabview';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { MeteorlogChart } from "./meteorlog-chart.component";
import { MeteorlogCards } from "./meteorlog-cards.component";

type Props = {};

type State = {
  logs: Array<IMeteorlogData>,
  currentLog: IMeteorlogData | null,
  currentIndex: number,
  startDate: Date,
  endDate: Date
};

enum DateType {
  STARTDATE,
  ENDDATE,
}

export default class MeteorlogDashboard extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchDateSpan = this.onChangeSearchDateSpan.bind(this);
    this.retrieveLogs = this.retrieveLogs.bind(this);
    this.refreshLogs = this.refreshLogs.bind(this);
    this.removeAllLogs = this.removeAllLogs.bind(this);
    this.searchDateSpan = this.searchDateSpan.bind(this);

    this.state = {
      logs: [],
      currentLog: null,
      currentIndex: -1,
      startDate: new Date(),
      endDate: new Date()
    };
  }

  componentDidMount() {
    this.retrieveLogs();
  }

  onChangeSearchDateSpan(e: ChangeEvent<HTMLInputElement>, type: DateType) {
    const searchDateValue = e.target.value;

    switch (type) {
      case DateType.STARTDATE:
        this.setState({
          startDate: new Date(searchDateValue)
        });
        break;
      case DateType.ENDDATE:
        this.setState({
          endDate: new Date(searchDateValue)
        });
        break;
      default:
        this.setState({
          startDate: new Date(searchDateValue),
          endDate: new Date(searchDateValue)
        });
        break;
    }
  }

  retrieveLogs() {
    MeteorlogDataService.getAll()
      .then((response: any) => {
        this.setState({
          logs: response.data
        });
        debugger;
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshLogs() {
    this.retrieveLogs();
    this.setState({
      currentLog: null,
      currentIndex: -1
    });
  }

  removeAllLogs() {
    MeteorlogDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshLogs();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchDateSpan() {
    this.setState({
      currentLog: null,
      currentIndex: -1
    });

    MeteorlogDataService.findByDate(this.state.startDate, this.state.endDate)
      .then((response: any) => {
        this.setState({
          logs: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { startDate, endDate, logs, currentLog, currentIndex } = this.state;
    debugger;
    console.log(logs);

    return (
      logs.length > 0 && <div className="tabview">
        <div className="card">
          <TabView>
            <TabPanel header="Grid View">
              <div>
                <MeteorlogGrid logs={logs} />
              </div>
            </TabPanel>
            <TabPanel header="Chart View">
              <div>
                <MeteorlogChart logs={logs} />
              </div>
            </TabPanel>
            <TabPanel header="Insights View">
              <div>
                <MeteorlogCards logs={logs} />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
      // <div className="list row">
      //   <div className="col-md-8">
      //     <div className="input-group mb-3">
      //       <input
      //         type="text"
      //         className="form-control"
      //         placeholder="Search by title"
      //         value={searchDateSpan}
      //         onChange={this.onChangesearchDateSpan}
      //       />
      //       <div className="input-group-append">
      //         <button
      //           className="btn btn-outline-secondary"
      //           type="button"
      //           onClick={this.searchDateSpan}
      //         >
      //           Search
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="col-md-6">
      //     <h4>Tutorials List</h4>

      //     <ul className="list-group">
      //       {tutorials &&
      //         tutorials.map((tutorial: IMeteorlogData, index: number) => (
      //           <li
      //             className={
      //               "list-group-item " +
      //               (index === currentIndex ? "active" : "")
      //             }
      //             onClick={() => this.setActiveTutorial(tutorial, index)}
      //             key={index}
      //           >
      //             {tutorial.title}
      //           </li>
      //         ))}
      //     </ul>

      //     <button
      //       className="m-3 btn btn-sm btn-danger"
      //       onClick={this.removeAllTutorials}
      //     >
      //       Remove All
      //     </button>
      //   </div>
      //   <div className="col-md-6">
      //     {currentLog ? (
      //       <div>
      //         <h4>Tutorial</h4>
      //         <div>
      //           <label>
      //             <strong>Title:</strong>
      //           </label>{" "}
      //           {currentLog.title}
      //         </div>
      //         <div>
      //           <label>
      //             <strong>Description:</strong>
      //           </label>{" "}
      //           {currentLog.description}
      //         </div>
      //         <div>
      //           <label>
      //             <strong>Status:</strong>
      //           </label>{" "}
      //           {currentLog.published ? "Published" : "Pending"}
      //         </div>

      //         <Link
      //           to={"/tutorials/" + currentLog.id}
      //           className="badge badge-warning"
      //         >
      //           Edit
      //         </Link>
      //       </div>
      //     ) : (
      //       <div>
      //         <br />
      //         <p>Please click on a Tutorial...</p>
      //       </div>
      //     )}
      //   </div>
      // </div>
    );
  }
}
