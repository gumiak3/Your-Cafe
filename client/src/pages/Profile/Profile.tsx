import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Info from "../../components/Info";
import { listElements } from "./navbar.data";
import AdminMenuListElement from "../AdminPanel/LeftSideMenu/AdminMenuListElement";
import useGetUser from "../../hooks/useGetUser";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ButtonType, IUserState } from "../../types/common";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { reservationType } from "../../hooks/useReservationsData";
import { CircularProgress } from "@mui/material";

export default function Profile() {
  const authUser: IUserState | null = useAuthUser();
  const { user } = useGetUser({ userId: authUser?.id || 0 });
  const [reservations, setReservations] = useState<reservationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns: GridColDef[] = [
    {
      field: "reservationDate",
      headerName: "Date",
      type: "string",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "reservationTime",
      headerName: "Time",
      type: "string",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "numberOfPeople",
      headerName: "How many people",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "extraInformation",
      headerName: "Extra information",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
    },
  ];
  function handleEdit() {}
  useEffect(() => {
    if (!authUser?.id) {
      return;
    }
    async function fetchUserReservations(userId: number) {
      const authToken = Cookies.get("_auth");
      if (!authToken || !authUser?.id) {
        console.error("User is not authorized");
        return;
      }

      try {
        const response = await fetch(`/api/user/reservations`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            userId: authUser.id,
          }),
        });
        const data = await response.json();
        setIsLoading(false);
        setReservations(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUserReservations(authUser.id);
  }, []);
  return (
    <div className="background-image-w h-screen relative ">
      <div className="shadow-around max-w-6xl m-auto relative shadow-2xl bg-white bg-opacity-100 grid grid-cols-4">
        <section className="col-span-4 p-4 border-2 grid grid-cols-4">
          <div className="text-6xl text-white rounded-full bg-gray-500 w-[150px] h-[150px] col-span-1 flex justify-center items-center">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="flex flex-col gap-6 col-span-3">
            {user && (
              <Info
                col={[
                  user?.username,
                  user?.email,
                  user.phoneNumber || "000-000-000",
                ]}
                row={["Username", "Email", "Phone number"]}
              />
            )}

            <Button
              type={ButtonType.BUTTON}
              handleClick={handleEdit}
              extraStyles={"w-fit px-8 py-2 w-32"}
            >
              Edit
            </Button>
          </div>
        </section>
        <section className="col-span-4 flex">
          {/*vertical menu*/}
          <nav className="flex flex-col text-black list-none h-full border-2">
            {listElements.map((element, index) => {
              return (
                <AdminMenuListElement
                  {...element}
                  key={`profile-panel-${index}`}
                  className="border-b-2 p-[15px]"
                />
              );
            })}
          </nav>
          {/*reservation table*/}
          <div className="col-span-3 w-full relative overflow-x-auto min-h-96">
            {isLoading ? (
              <div className="w-full flex justify-center `mt`-4">
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <DataGrid
                columns={columns}
                rows={reservations}
                rowSelection={false}
                getRowId={(row: reservationType) => row.reservationId}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
