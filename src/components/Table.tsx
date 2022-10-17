import React from 'react';
import { Column, useFlexLayout, useSortBy, useTable } from "react-table";

import { Item } from '../items';
import DeleteButton from './DeleteButton';

import "./Table.css"

export default function Table() {
	const [data, setData] = React.useState<Item[]>([new Item("foo", 1, 2), new Item("bar", 3, 4)]);

	const columns = React.useMemo<Column<Item>[]>(
		() => [
			{
				accessor: () => "delete",
				id: "delete",
				Cell: () => (<DeleteButton></DeleteButton>),
				disableSortBy: true,
				width: 15
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

	const tableInstance = useTable(
		{ columns, data },
		useSortBy,
		useFlexLayout
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow
	} = tableInstance;

	return (
		<table {...getTableProps()} className="table">
			<thead>{
				headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>{
						headerGroup.headers.map(column => (
							<th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{ column.render("Header") }
								<span>{
									column.isSorted ? column.isSortedDesc ? " 🔽" : " 🔼" : ""
								}</span>
							</th>
						))
					}</tr>
				))
			}</thead>
			<tbody {...getTableBodyProps()}>{
				rows.map(row => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>{
							row.cells.map(cell => (
								<td {...cell.getCellProps()}>{
									cell.render("Cell")
								}</td>
							))
						}</tr>
					)
				})
			}</tbody>
		</table>
	);
}
