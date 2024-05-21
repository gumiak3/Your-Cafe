import useReservationsData from "../../../hooks/useReservationsData";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function ReservationsManagement() {
  const { reservations, fetchReservations } = useReservationsData();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, maxWidth: 40 },
    {
      field: "userId",
      headerName: "User",
      flex: 1,
      minWidth: 100,
      type: "actions",
      getActions: ({ id }) => {
        const userId = reservations[Number(id)].userId;
        return [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faUser} />}
            label="ShowUser"
            className="textPrimary"
            onClick={handleShowUser(userId)}
            color="inherit"
          />,
        ];
      },
    },
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
      minWidth: 80,
    },
    {
      field: "extraInformation",
      headerName: "Extra information",
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
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleShowUser = (userId: number) => () => {
    console.log(`Show user: ${userId}`);
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const mySaveOnServerFunction = (updatedRow: GridRowModel) => {
    console.log(updatedRow);
    return updatedRow;
  };
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
        processRowUpdate={(updatedRow, originalRow) =>
          mySaveOnServerFunction(updatedRow)
        }
        onProcessRowUpdateError={(err) => console.log()}
      />
    </div>
  );
}
