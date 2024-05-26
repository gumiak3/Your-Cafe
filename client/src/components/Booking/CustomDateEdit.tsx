import { GridEditDateCellProps } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { convertedReservationType } from "../../hooks/useReservationsData";

type CustomDateEditProps = GridEditDateCellProps & {
  handleDateChange: (date: Date, id: number) => void;
};
export default function CustomDateEdit(props: CustomDateEditProps) {
  const { value, api, id, field, handleDateChange, row } = props;
  const handleChange = (newValue: any) => {
    api.setEditCellValue({ id, field, value: new Date(newValue) });
    handleDateChange(new Date(newValue), row.id);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast
        onChange={handleChange}
        value={dayjs(value)}
        format={"DD-MM-YYYY"}
        slotProps={{
          textField: {
            sx: {
              color: "#ad1457",
              borderRadius: "1px",
              borderWidth: "0px",
              borderColor: "#e91e63",
              border: "0px solid",
              backgroundColor: "white",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
