import useReservationsData from "../../../hooks/useReservationsData";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
export function ReservationsManagement() {
  const { reservations, fetchReservations } = useReservationsData();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "numberOfPeople",
      headerName: "How many people",
      flex: 1,
      minWidth: 150,
    },

    {
      field: "reservationDate",
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
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      type: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleSaveClick = (id: GridRowId) => () => {
    // update the changes to database

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  function handleEditClick(id: GridRowId) {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  }

  return (
    <div className="items-center max-w-7xl m-auto h-[640px]">
      <h1 className="text-center text-4xl font-bold p-12">Reservations</h1>
      <DataGrid
        columns={columns}
        rows={reservations}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        rowSelection={false}
        pageSizeOptions={[10, 25, 50, 75, 100]}
        editMode="row"
        rowModesModel={rowModesModel}
      />
    </div>
  );
}
