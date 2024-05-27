export class DataConverter {
  constructor() {}
  private toCamelCase(str: string) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
  }
  public convertToCamel(data: {}[]) {
    const newData = [];
    data.forEach((item) => {
      const newItem: any = {};
      for (const key in item) {
        const camelKey = this.toCamelCase(key);
        newItem[camelKey] = item[key];
      }
      newData.push(newItem);
    });
    return newData;
  }
  public convertDate(date: string) {
    return new Date(date).toLocaleDateString("en-CA");
  }
  public convertToReadable(data: {}[]) {
    const camelCaseData = this.convertToCamel(data);
    return camelCaseData.map((item) => {
      item.reservationDate = this.convertDate(item.reservationDate);
      return item;
    });
  }
}
