import React from 'react';
import { Column, useTable } from "react-table";

import { Item } from '../items';
import DeleteButton from './DeleteButton';

import "./Table.css"

export default function Table() {
	const [data, setData] = React.useState<Item[]>([new Item("test", 0,0 )]);

	const columns = React.useMemo<Column<Item>[]>(
		() => [
			{
				accessor: () => "delete",
				id: "delete",
				Cell: () => (<DeleteButton></DeleteButton>)
			},
			{
				Header: "Item Name",
				accessor: "name"
			},
			{
				Header: "Sell In",
				accessor: "sellIn"
			},
			{
				Header: "Quality",
				accessor: "quality"
			}
		],
		[]
	);

	const tableInstance = useTable({ columns, data });
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow
	} = tableInstance;

	return (
		<table {...getTableProps()} className="table">
			<thead>
				{
					headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{
								headerGroup.headers.map(column => (
									<th {...column.getHeaderProps()}>
										{ column.render("Header") }
									</th>
								))
							}
						</tr>
					))
				}
			</thead>
			<tbody {...getTableBodyProps()}>
				{
					rows.map(row => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{
									row.cells.map(cell => (
										<td {...cell.getCellProps()}>
											{ cell.render("Cell") }
										</td>
									))
								}
							</tr>
						)
					})
				}
			</tbody>
		</table>
	);
}
