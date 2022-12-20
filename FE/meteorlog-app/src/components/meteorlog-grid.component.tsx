import { AgGridReact } from "ag-grid-react";
import { CellClickedEvent } from "ag-grid-community";
import moment from 'moment';
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Component } from "react";
import IMeteorlogData, { MeteorLogRow } from "../types/meteorlog.type";

type Props = {
    logs: Array<IMeteorlogData>
};

type State = {
  logs: Array<MeteorLogRow>,
  columnDefs: any[],
  selectedRows: any[]
};

export default class MeteorlogGrid extends Component<Props, State> {
  public gridRef: any;
  gridApi: any;
  gridColumnApi: any;
  selectedRows: any[] = [];
  self: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      logs: [],
      columnDefs: [],
      selectedRows: []
    };
  }

  public componentDidMount(): void {
    const columnDefs = [
      { field: "deviceId", filter:'agNumberColumnFilter', sortable:true },
      { field: "temperature", filter:'agNumberColumnFilter', headerName: "Temperature (°C)", sortable:true },
      { field: "humidity", filter:'agNumberColumnFilter', headerName: "Humidity (%)", sortable:true},
      { field: "date", filter:'agDateColumnFilter', sortable:true},
      { field: "time", sortable:true},
    ];
    this.setState({ columnDefs: columnDefs });

    this.setState({ logs: this.formatRows(this.props.logs)});

    this.setState({ selectedRows: [] });
  }

  public onCellClicked(params: CellClickedEvent): void {
    console.log("Cell was clicked");
    console.log(params);
  }

  onGridReady = (params: {
    api: { setRowData: (arg0: any) => any };
    columnApi: any;
  }) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onSelectionChanged = () => {

    const selectedRows = this.gridApi.getSelectedRows();
    this.setState({ selectedRows: selectedRows });
  };

//   onClearClick = () => {

//     const selectedId = this.state.selectedRows[0]["Id"];
//     this.props.onDeleteClick(selectedId);
//   };

formatRows(rawRows: Array<IMeteorlogData>): Array<MeteorLogRow> {
    const result = rawRows.map(rr => {
        const rawDate = new Date(rr.createdAt);
        return {
            ...rr,
            date: `${moment(rawDate).format('YYYY/MM/DD')}`,
            time: `${moment(rawDate).format('HH:mm')}`
        }        
    });
    return result;
}

  render() {
    const { logs } = this.state;
    return (
      <div>
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            rowData={logs}
            columnDefs={this.state.columnDefs}
            rowSelection={"single"}
            onGridReady={this.onGridReady}
            onSelectionChanged={this.onSelectionChanged}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}