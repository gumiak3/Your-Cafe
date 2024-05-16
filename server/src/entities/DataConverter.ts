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
}
