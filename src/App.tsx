/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import MOCK_DATA from "./mockData";
import FieldTypeCheckbox from "./components/checkbox/FieldTypeColumn";

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
  const [dynamicTableFieldsTypes, setDynamicTableFieldsType] =
    useState<DynamicTableFieldsTypes>({
      rows: [],
      columns: [],
      filters: [],
      value: [],
    });

  function handleFieldType(
    type: keyof DynamicTableFieldsTypes,
    option: string
  ) {
    setDynamicTableFieldsType((prev) => {
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

  return (
    <div className="p-2">
      <p>{JSON.stringify(dynamicTableFieldsTypes)}</p>
      <p>{JSON.stringify(keys)}</p>
      <div className="flex gap-4 mt-6">
        <FieldTypeCheckbox
          options={keys}
          fieldType="columns"
          label="colunas"
          onChange={handleFieldType}
          selectedKeys={dynamicTableFieldsTypes.columns}
        />
        <FieldTypeCheckbox
          options={keys}
          fieldType="filters"
          label="filtros"
          onChange={handleFieldType}
          selectedKeys={dynamicTableFieldsTypes.filters}
        />
        <FieldTypeCheckbox
          options={keys}
          fieldType="rows"
          label="linhas"
          onChange={handleFieldType}
          selectedKeys={dynamicTableFieldsTypes.rows}
        />
        <FieldTypeCheckbox
          options={keys}
          fieldType="value"
          label="valores"
          onChange={handleFieldType}
          selectedKeys={dynamicTableFieldsTypes.value}
        />
      </div>
    </div>
  );
}
