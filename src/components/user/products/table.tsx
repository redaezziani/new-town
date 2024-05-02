import * as React from "react";
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    ColumnDef,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type DataItem = Record<string, any>;

// the element prop is used to render a custom element in the table
interface DataTableProps {
    data: DataItem[];
    columns: ColumnDef<DataItem>[];
    loading?: boolean;
    total?: number;
    element?: React.ReactNode;
}

export type Cell<T = any> = {
    id: string;
    column: {
        id: string;
        columnDef: ColumnDef<T>;
        getCanHide: () => boolean;
        getIsVisible: () => boolean;
        toggleVisibility: (isVisible: boolean) => void;
    };
    getCellProps: () => Record<string, any>;
    getCellState: () => Record<string, any>;
    getIsSelected: () => boolean;
    getValue: () => T[keyof T];
    getContext: () => {
        row: Row<T>;
    };

};

export type Row<T = any> = {
    id: string;
    original: T;
    getIsSelected: () => boolean;
    getVisibleCells: () => Cell<T>[];
    getValue: (accessorKey: keyof T) => T[keyof T];
};

export function DataTable({ data, columns, loading = false, total = 0, element }: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState(
        data.reduce((acc, item, index) => {
            acc[index] = false;
            return acc;
        }, {} as Record<number, boolean>)
    );

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },

    });



    return (
        <div className="w-full  p-2 rounded-lg bg-background">
            <div className="flex items-center flex-wrap justify-between gap-3 md:py-4 lowercase">
                <Input
                    placeholder="search ..."
                    //@ts-ignore
                    value={(table.getColumn(columns[2]?.accessorKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        //@ts-ignore
                        table.getColumn(columns[2]?.accessorKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex gap-4 justify-between items-center">
                    {element}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-md " asChild>
                            <Button
                                variant={'outline'}
                                className=" flex gap-2 justify-center items-center border-slate-300/30 text-slate-600 px-2 ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none">
                                    <path d="M3 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 17H9" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                    <path d="M18 17L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                                    <path d="M15 7L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                filter columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className=" border-none mt-6">
                <Table className="min-h-48">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className={` text-sm bg-slate-300/15 truncate text-slate-900 dark:text-slate-50 capitalize font-semibold ${header.column.id === 'id' ? 'hidden' : ''}`}
                                            key={header.id}>
                                            <div className="flex gap-2 text-slate-400/90 dark:text-slate-50">
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                }
                                                <svg
                                                    className=" text-slate-400/90 dark:text-slate-50 w-4 h-4 cursor-pointer hover:text-slate-400 dark:hover:text-slate-50"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                                                    <path d="M7 4V20" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M17 19L17 4" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M10 6.99998C10 6.99998 7.79053 4.00001 6.99998 4C6.20942 3.99999 4 7 4 7" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M20 17C20 17 17.7905 20 17 20C16.2094 20 14 17 14 17" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>

                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody

                    >
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className={`h-12 ${cell.column.id === 'id' ? 'hidden' : ''}`}
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="w-full absolute p-10 flex gap-2 justify-center items-center text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                                    <path d="M13 21H10.9325C8.18162 21 6.8062 21 5.8516 20.2402C4.55052 19.1942 4.46138 17.0725 4.20066 15.5878L3.60807 12.2134C3.50177 11.6081 3.09673 11.0876 2.51841 10.8132C2.37896 10.747 2.27952 10.6235 2.24894 10.4784C2.07874 9.67075 1.6264 8.5469 2.63812 8.10084C2.86684 8 3.17922 8 3.80397 8H7.5M11.5 8H20.196C20.8208 8 21.1332 8 21.3619 8.10084C22.3736 8.5469 21.9213 9.67075 21.7511 10.4784C21.7205 10.6235 21.621 10.747 21.4816 10.8132C20.742 11.1642 20.4959 11.7928 20.3468 12.5" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" />
                                    <path d="M16 15L19 18M19 18L22 21M19 18L16 21M19 18L22 15" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" />
                                    <path d="M6.5 11L10 3M15 3L17.5 8" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" />
                                </svg>
                                no products found ...
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center  justify-end space-x-2 py-4">
                <div className="flex-1 text-xs lg:text-sm text-muted-foreground">
                    Showing {" "}
                    {table.getFilteredSelectedRowModel().rows.length + 1} {" "}
                    to {" "} {table.getFilteredSelectedRowModel().rows.length + 10} of {table.getFilteredRowModel().rows.length} entries
                </div>
                <Pagination table={table} />
            </div>
        </div>
    );
}


const Pagination = ({ table }: any) => {
    return (
        <div className=" flex gap-2 justify-center items-center">
            <Button
                variant="outline"
                size="sm"
                className=" size-10"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </Button>
            {table.getPageOptions().map((page: any) => (
                page >= 4 ? (
                    <Button
                        key={page}
                        variant='ghost'
                        size="sm"
                        className=" size-10"
                    >
                        ...
                    </Button>
                ) :
                    <Button
                        key={page}
                        variant="outline"
                        size="sm"
                        className=" size-10"
                        onClick={() => table.setPageIndex(page)}
                        disabled={table.getPageCount() === page}
                    >
                        {page + 1}
                    </Button>
            ))}

            <Button
                variant="outline"
                size="sm"
                className=" size-10"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </Button>
        </div>
    )
}
export type { ColumnDef };
