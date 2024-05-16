import { columns } from "./reservationTableContent.data";
import useReservationsData from "../../../hooks/useReservationsData";
import { DataGrid } from "@mui/x-data-grid";
export function ReservationsManagement() {
  const { reservations, fetchReservations } = useReservationsData();
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
        pageSizeOptions={[10, 25, 50, 75, 100]}
        onCellEditStop={(params, event) => console.log("tutaj")}
      />
    </div>
  );
}
