interface IInfo {
  row: string[];
  col: string[];
}
export default function Info({ row, col }: IInfo) {
  return (
    <section className="grid grid-cols-3">
      <div className="flex flex-col col-span-1 space-y-4">
        {row.map((item, index) => {
          return (
            <span key={`${item}-${index}`}>
              {item[0].toUpperCase() + item.slice(1, item.length)}:
            </span>
          );
        })}
      </div>
      <div className="flex flex-col col-span-2 space-y-4">
        {col.map((item, index) => {
          return (
            <span className="border-b-2" key={`${item}-${index}`}>
              {item.length > 0
                ? item[0].toUpperCase() + item.slice(1, item.length)
                : null}
            </span>
          );
        })}
      </div>
    </section>
  );
}
