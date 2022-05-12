import React from 'react';
import DataTable from 'mui-datatables';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

const data = [
	["18PA1A1201", "A", "90%", "2-B"],
	["18PA1A1210", "B", "80%", "3-B"],
	["18PA1A1211", "C", "76%", "1-B"],
	["18PA1A1212", "D", "20%", "3-B"],
	["18PA1A1213", "E", "80%", "5-B"],

	["18PA1A1214", "F", "87%", "0-B"],
	["18PA1A1215", "G", "75%", "0-B"],
	["18PA1A1216", "H", "70%", "8-B"],
	["18PA1A1217", "I", "56%", "1-B"],
	["18PA1A1218", "J", "75%", "1-B"],

	["18PA1A1219", "K", "98%", "0-B"],
	["18PA1A1202", "L", "55%", "1-B"],
	["18PA1A1203", "M", "70%", "0-B"],
	["18PA1A1204", "N", "63%", "0-B"],
	["18PA1A1205", "O", "64%", "4-B"],

	["18PA1A1206", "P", "36%", "3-B"],
	["18PA1A1207", "A", "26%", "0-B"],
];

const columns = [
	{ label: 'Reg ID', name: 'Reg ID' },
	{ label: 'Name', name: 'Name' },
	{ label: 'Percentage', name: 'Percentage' },
	{ label: 'Backlogs', name: 'Backlogs' },
];

// gets from all the data the selected rows
const getRowsToBeDownloaded = (selectedRows, data) => {
	return data.filter(row => selectedRows.data.some(selected => selected.dataIndex === row.dataIndex)).map(row => row.data);
}

// this function return the csv string
const getCsvStringFromArrayOfStrings = (columns, data) => {
	// maps through the columns array and generates the csv header
	const csvHeader = columns.map(column => `"${column.label}"`).join();
	// maps through each row and adds a new line so the next row can be generated
	const csvBody = data.map(row => row.map(cell => cell !== null ? `"${cell}"` : '""').join()).join('\n');
	// joins together the csv header and body and puts a new line in between of them
	return `${csvHeader}\n${csvBody}`;
};

// i know it is disgusting but dont judge me
// creates an artificial link, clicks it automatically so it downloads immediately and it removes it 
const saveCsvStringAsFile = (csvString, fileName) => {
	const url = window.URL.createObjectURL(new Blob([csvString]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${fileName.replace(' ', '')}.xlsx`);
	document.body.appendChild(link);
	link.click();
	link.parentNode.removeChild(link);
};

const downloadRowsAsCSV = (rows, columns, fileName) => {
	// generate the csv string
	const csvString = getCsvStringFromArrayOfStrings(columns, rows);

	// some disgusting way of downloading the csv but it works i guess
	saveCsvStringAsFile(csvString, fileName);
}

const SelectedRowsToolbar = ({ selectedRows, data, columns, datatableTitle }) => {
	return (
		<div>
			<IconButton onClick={() => downloadRowsAsCSV(getRowsToBeDownloaded(selectedRows, data), columns, datatableTitle)}>
				<CloudDownload />
			</IconButton>
		</div>
	);
}
export default function Tables() {
	const subjects = [
		{ sem: '1-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3 }, { sem: '1-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '2-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '2-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '3-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '3-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '4-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '4-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3 }
	]
	return (
		<DataTable
			title="Student Data"
			data={data}
			columns={columns}
			options={{
				filterType: "dropdown",
				print: false,
				expandableRows: true,
				customToolbarSelect: (selectedRows, data) =>
					<SelectedRowsToolbar
						selectedRows={selectedRows}
						data={data}
						columns={columns}
						datatableTitle="StudentData"
					/>,
				renderExpandableRow: (rowData, rowMeta) => {
					// console.log(rowData, rowMeta);
					return (
						<React.Fragment>
							<tr>
								<td colSpan={6}>
									<TableContainer component={Paper}>
										<Table style={{ minWidth: "650" }} aria-label="simple table">
											<TableHead>
												<TableRow>
													<TableCell align="center">Semester</TableCell>
													<TableCell align="center">Subject 1</TableCell>
													<TableCell align="center">Subject 2</TableCell>
													<TableCell align="center">Subject 3</TableCell>
													<TableCell align="center">Subject 4</TableCell>
													<TableCell align="center">Subject 5</TableCell>
													<TableCell align="center">Subject 6</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{subjects.map((historyRow) => (
													<TableRow key={historyRow.sem}>
														<TableCell align="center">{historyRow.sem}</TableCell>
														<TableCell align="center">{historyRow.sub1 ? historyRow.sub1 : 'No Subject'}</TableCell>
														<TableCell align="center">{historyRow.sub2 ? historyRow.sub2 : 'No Subject'}</TableCell>
														<TableCell align="center">{historyRow.sub3 ? historyRow.sub3 : 'No Subject'}</TableCell>
														<TableCell align="center">{historyRow.sub4 ? historyRow.sub4 : 'No Subject'}</TableCell>
														<TableCell align="center">{historyRow.sub5 ? historyRow.sub5 : 'No Subject'}</TableCell>
														<TableCell align="center">{historyRow.sub6 ? historyRow.sub6 : 'No Subject'}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</td>
							</tr>
						</React.Fragment>
					);
				},
			}}
		/>
	);
};