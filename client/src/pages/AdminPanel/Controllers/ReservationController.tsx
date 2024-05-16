import { convertedReservationType } from "../../../hooks/useReservationsData";
import Button from "../../../components/Button";
import { ButtonType } from "../../../types/common";

type reservationRow = {
  id: number;
  numberOfPeople: number;
  extraInformation: string;
  status: HTMLButtonElement;
  reservationTime: string;
  reservationDate: Date;
};

export class ReservationController {
  public createRows(rows: convertedReservationType[]) {
    const newRow: reservationRow[] = [];
    rows.forEach((row) => {
      const newStatus = <button>{row.status}</button>;
    });
  }
  private createButton(status: string) {
    return <Button type={ButtonType.BUTTON} />;
  }
}
