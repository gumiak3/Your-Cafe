import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "numberOfPeople",
    headerName: "How many people",
    width: 150,
    editable: true,
  },

  {
    field: "ReservationDate",
    headerName: "Date",
    width: 150,
    editable: true,
  },
  {
    field: "reservationTime",
    headerName: "Time",
    width: 150,
    editable: true,
  },

  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
  },
];

export const rows = [
  // get from api
];
