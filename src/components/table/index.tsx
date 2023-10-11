import { Table as MNtable } from "@mantine/core";
import React from "react";

interface TableProps {
  row: React.ReactNode | undefined;
  head: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ head, row }) => {
  return (
    <MNtable.ScrollContainer minWidth={100} style={{ width: "100%" }}>
      <MNtable withTableBorder highlightOnHover>
        <MNtable.Thead>{head}</MNtable.Thead>
        <MNtable.Tbody>{row}</MNtable.Tbody>
      </MNtable>
    </MNtable.ScrollContainer>
  );
};
