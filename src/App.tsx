/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import MOCK_DATA from "./mockData";
import FieldTypeCheckbox from "./components/checkbox/FieldTypeColumn";
import { handleTableValues } from "./utils/table";

export type DynamicTableFieldsTypes = {
  rows: any[];
  columns: any[];
  filters: any[];
  value: any[];
};

function getKeys(data: Array<any>) {
  if (data.length === 0) return [];

  const firstRow = data[0];
  return Object.keys(firstRow);
}

export default function App() {
  const mockData = MOCK_DATA;
  const keys = getKeys(mockData);
  const [tableStructure, setTableStructure] = useState<DynamicTableFieldsTypes>(
    {
      rows: [],
      columns: [],
      filters: [],
      value: [],
    }
  );
  const [fieldsTypes, setFieldsTypes] = useState<DynamicTableFieldsTypes>({
    rows: [],
    columns: [],
    filters: [],
    value: [],
  });

  function handleFieldType(
    type: keyof DynamicTableFieldsTypes,
    option: string
  ) {
    setFieldsTypes((prev) => {
      const newFieldType = Object.keys(prev).reduce((acc, key) => {
        const fieldType = prev[key as keyof DynamicTableFieldsTypes];
        if (key === type) {
          if (!fieldType.includes(option)) {
            acc[key as keyof DynamicTableFieldsTypes] = [...fieldType, option];
          } else {
            acc[key as keyof DynamicTableFieldsTypes] = fieldType.filter(
              (item) => item !== option
            );
          }
        } else {
          acc[key as keyof DynamicTableFieldsTypes] = fieldType.filter(
            (item) => item !== option
          );
        }
        return acc;
      }, {} as DynamicTableFieldsTypes);

      return newFieldType;
    });
  }

  useEffect(() => {
    setTableStructure(handleTableValues(fieldsTypes, mockData));
  }, [fieldsTypes]);

  return (
    <div className="p-2">
      <p>{JSON.stringify(fieldsTypes)}</p>
      <p>{JSON.stringify(keys)}</p>
      <div className="flex gap-4 mt-6">
        <FieldTypeCheckbox
          options={keys}
          fieldType="columns"
          label="colunas"
          onChange={handleFieldType}
          selectedKeys={fieldsTypes.columns}
        />
        <FieldTypeCheckbox
          options={keys}
          fieldType="filters"
          label="filtros"
          onChange={handleFieldType}
          selectedKeys={fieldsTypes.filters}
        />
        <FieldTypeCheckbox
          options={keys}
          fieldType="rows"
          label="linhas"
          onChange={handleFieldType}
          selectedKeys={fieldsTypes.rows}
        />
        <FieldTypeCheckbox
          options={keys}
          fieldType="value"
          label="valores"
          onChange={handleFieldType}
          selectedKeys={fieldsTypes.value}
        />
      </div>

      <table className="mt-10">
        <thead>
          <tr>
            {tableStructure.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {tableStructure.rows.map((row, index) => (
              <td key={index}>{row}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
