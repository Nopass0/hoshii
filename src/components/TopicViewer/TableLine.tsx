import React from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { LineType, ColumnDefType } from "@/types";

type TableLineProps = {
  line: LineType;
};

const TableLine: React.FC<TableLineProps> = ({ line }) => {
  if (line.type !== "tables") return null;

  return (
    <motion.div
      className={`flex flex-col gap-2 ${
        line.backgroundColor ? `bg-${line.backgroundColor}` : ""
      }`}
      style={{
        padding: line.padding || "0",
        color: line.color || "inherit",
        marginBottom: line.marginBottom || "0",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`flex flex-wrap gap-4 ${
          line.align ? `justify-${line.align}` : ""
        }`}
      >
        {line.tables.map(
          (
            tableItem: {
              tableData: any[];
              width: string;
              columns: ColumnDefType[];
            },
            tableIndex: number,
          ) => {
            const columns = tableItem.columns;
            const data = tableItem.tableData;

            const table = useReactTable({
              data,
              columns,
              getCoreRowModel: getCoreRowModel(),
              getSortedRowModel: getSortedRowModel(),
            });

            return (
              <div key={tableIndex} className={`w-${tableItem.width}`}>
                <div className="rounded-md border">
                  <Table>
                    {columns.length > 0 && (
                      <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                              return (
                                <TableHead key={header.id}>
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                      )}
                                </TableHead>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableHeader>
                    )}
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            );
          },
        )}
      </div>
    </motion.div>
  );
};

export default TableLine;
