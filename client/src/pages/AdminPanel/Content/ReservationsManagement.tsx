import useReservationsData, {
  convertedReservationType,
} from "../../../hooks/useReservationsData";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderEditCellParams,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridValueOptionsParams,
} from "@mui/x-data-grid";
import { success } from "../../../types/common";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  updateReservation,
  updateReservationParams,
} from "./api/updateReservation";
import { toast } from "react-toastify";
import { getUser, IUser } from "./api/getUser";
import BasicModal from "../../../components/BasicModal";
import Info from "../../../components/Info";
import CustomDateEdit from "../../../components/Booking/CustomDateEdit";

import {
  getTimeOptions,
  getTimeOptionsForReservation,
  ITimeOptions,
} from "../../../hooks/useTimeOptions";
export function ReservationsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<IUser>();
  const { reservations, fetchReservations } = useReservationsData();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [timeOptions, setTimeOptions] = useState<ITimeOptions>({});

  async function handleDateChange(date: Date, id: number) {
    const newTimeOptions: ITimeOptions = await getTimeOptionsForReservation(
      date,
      id,
    );
    setTimeOptions({
      ...timeOptions,
      [id]: newTimeOptions[id],
    });
  }

  useEffect(() => {
    const response = getTimeOptions(reservations);
    setTimeOptions(response);
  }, [reservations]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, maxWidth: 40, type: "number" },
    {
      field: "userId",
      headerName: "User",
      flex: 1,
      minWidth: 100,
      type: "actions",
      getActions: ({ id }) => {
        const userId = reservations.filter((item) => item.id === id)[0].userId;
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
      editable: true,
    },

    {
      field: "reservationDate",
      headerName: "Date",
      type: "date",
      flex: 1,
      minWidth: 150,
      editable: true,
      renderEditCell: (
        params: GridRenderEditCellParams<convertedReservationType>,
      ) => {
        return (
          <CustomDateEdit {...params} handleDateChange={handleDateChange} />
        );
      },
    },
    {
      field: "reservationTime",
      headerName: "Time",
      flex: 1,
      minWidth: 80,
      editable: true,
      type: "singleSelect",
      valueOptions: (
        params: GridValueOptionsParams<convertedReservationType>,
      ) => timeOptions[params.id as number] || [],
    },
    {
      field: "extraInformation",
      headerName: "Extra information",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Waiting", "Confirmed", "Cancelled", "Finished"],
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
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleShowUser = (userId: number) => async () => {
    const user = await getUser(userId);
    setUserDetails(user.user);
    setIsModalOpen(true);
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const mySaveOnServerFunction = async (
    updatedRow: GridRowModel<updateReservationParams>,
    originalRow: GridRowModel<updateReservationParams>,
  ) => {
    const success: success = await updateReservation({ ...updatedRow });
    if (success.message === "success") {
      toast.success(`Successfully updated!`);
      return updatedRow;
    } else {
      if (success.content) {
        const invalids = Object.values(success.content).filter(
          (status) => status !== 1,
        );
        invalids.forEach((errorText) => {
          toast.error(`Update error: ${errorText}`);
        });
      }
    }
    return originalRow;
  };
  return (
    <div className="items-center max-w-7xl m-auto h-[640px]">
      <BasicModal
        headerContent={
          <FontAwesomeIcon className="text-center mb-8" icon={faUser} />
        }
        isOpen={isModalOpen}
        handleClose={handleModalClose}
      >
        {userDetails ? (
          <Info
            row={["Username", "Email", "Phone"]}
            col={[
              userDetails.username,
              userDetails.email,
              userDetails.phoneNumber || "000-000-000",
            ]}
          />
        ) : null}
      </BasicModal>
      <div className="overflow-y-auto h-screen">
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
            mySaveOnServerFunction(updatedRow, originalRow)
          }
          onProcessRowUpdateError={(err) => console.error(err)}
        />
      </div>
    </div>
  );
}
