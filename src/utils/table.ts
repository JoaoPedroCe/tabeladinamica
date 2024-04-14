/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { DynamicTableFieldsTypes } from "../App";

export function flatMap(array: Array<unknown>) {
  return array.flatMap((value) => {
    return value;
  });
}

export function handleTableValues<T>(
  fieldsType: DynamicTableFieldsTypes,
  data: Array<T>
): DynamicTableFieldsTypes {
  const { columns, rows } = fieldsType;
  const columnsData = columns.map((column) => {
    if (data[0]?.hasOwnProperty(column)) {
      return data.map((item: any) => item[column]);
    } else {
      return [];
    }
  });

  const rowsData = rows.map((column) => {
    if (data[0]?.hasOwnProperty(column)) {
      return data.map((item: any) => item[column] as string);
    } else {
      return [];
    }
  });

  console.log(columnsData);
  return {
    columns: flatMap(columnsData),
    filters: [],
    rows: flatMap(rowsData),
    value: [],
  };
}

export function getKeys(data: Array<any>) {
  if (data.length === 0) return [];

  const firstRow = data[0];
  return Object.keys(firstRow);
}
