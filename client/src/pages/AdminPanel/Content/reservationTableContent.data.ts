import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    field: "numberOfPeople",
    headerName: "How many people",
    flex: 1,
    minWidth: 150,
  },

  {
    field: "reservationDate",
    editable: true,
    headerName: "Date",
    type: "date",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "reservationTime",
    headerName: "Time",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    type: "singleSelect",
    valueOptions: ["Waiting", "Confirmed", "Canceled"],
    editable: true,
    minWidth: 150,
  },
];
