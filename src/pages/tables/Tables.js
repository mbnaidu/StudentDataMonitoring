import React from "react";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {
	Table,
	TableRow,
	TableHead,
	TableBody,
	TableContainer, Paper,
	TableCell, Grid
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
// import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

const datatableData = [
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

const useStyles = makeStyles(theme => ({
	tableOverflow: {
		overflow: 'auto'
	}
}))
const handleRowClick = (rowData, rowMeta) => {
	console.log(rowData, rowMeta);
};
const subjects = [
	{ sem: '1-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3 }, { sem: '1-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '2-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '2-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '3-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '3-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '4-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '4-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3 }
]
const options = {
	filter: true,
	// onFilterChange: (changedColumn, filterList) => {
	// 	console.log(changedColumn, filterList);
	// },
	onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected,) => {
		console.log(rowsSelectedData[0] && datatableData[rowsSelectedData[0].dataIndex]);
	},
	selectableRows: "multiple",
	filterType: "dropdown",
	responsive: "vertical",
	rowsPerPage: 10,
	expandableRows: true,
	download: true,
	downloadOptions: {
		filename: "tableDownload.csv",
		separator: ";",
		filterOptions: { useDisplayedColumnsOnly: false },
		useDisplayedRowsOnly: false,
	},
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
	page: 1,
};
export default function Tables() {
	const classes = useStyles();
	return (
		<>
			<PageTitle title="Tables" />
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<MUIDataTable
						title="Students Table"
						data={datatableData}
						columns={["Reg ID", "Name", "Percentage", "Backlogs"]}
						options={options}
					/>
				</Grid>
				{/* <Grid item xs={12}>
					<Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
						<Table data={mock.table} />
					</Widget>
				</Grid> */}
			</Grid>
		</>
	);
}
