import React, { useEffect, useState } from 'react';
import DataTable from 'mui-datatables';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';


const columns = [
	{ label: 'Reg ID', name: 'registerID' },
	{ label: 'Name', name: 'fullName' },
	{ label: 'Backlogs', name: 'backlogs' },
	{ label: 'Gender', name: 'gender' },
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
export default function Tables({ data }) {
	const [studentsData, setStudentData] = useState(null);
	useEffect(() => {
		var sample = []
		data.map((member) => {
			sample.push({
				registerID: member.registerID,
				fullName: member.fullName,
				gender: member.gender,
				backlogs: member.backlogs,
				semesters: member.semesters,
				placements: member.placements
			})
		})
		setStudentData(sample);
	}, [data])

	const renderExtraData = (index) => {
		var allSemesterData = data[index]['semesters'].filter((semester) => semester['isAvailable'] === true)
		return (
			<>
				<React.Fragment key={index}>
					<tr>
						<td colSpan={6}>
							<TableContainer component={Paper}>
								<Table style={{ minWidth: "650" }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Semester</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Subject 1</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Subject 2</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Subject 3</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Subject 4</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Subject 5</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Subject 6</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Subject 7</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Subject 8</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>SCGPA</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{allSemesterData.map((eachSemester) => (
											<TableRow key={eachSemester.name}>
												<TableCell key={eachSemester.name} align="center">{eachSemester.name}</TableCell>
												{(eachSemester[eachSemester.name]).map((subject) => {
													return (
														<TableCell key={JSON.stringify(subject)} align="center">{subject.subcode} - {subject.grade} {subject.noOfAttempts > 0 ? ` - ${subject.noOfAttempts}` : ''}</TableCell>
													)
												})}
												<TableCell>{(eachSemester.OC / eachSemester.TC).toFixed(2)}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</td>
					</tr>
				</React.Fragment>
				<React.Fragment key={index}>
					<tr>
						<td colSpan={6}>
							<TableContainer component={Paper}>
								<Table style={{ minWidth: "650" }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Company Name</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Package</TableCell>
											<TableCell align="center" style={{ fontWeight: 'bold' }}>Date</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data[index]['placements'].map((placement) => {
											return (
												<TableRow>
													<TableCell align="center">{placement.companyName}</TableCell>
													<TableCell align="center">{placement.package ? placement.package : 'No Data'}</TableCell>
													<TableCell align="center">{placement.date ? placement.date.split(' ')[0] : 'No Data'}</TableCell>
												</TableRow>
											)
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</td>
					</tr>
				</React.Fragment>
			</>
		)
	}
	return (
		<>
			{studentsData && <DataTable
				title="Student Data"
				data={studentsData}
				columns={columns}
				options={{
					filterType: "multiselect",
					print: false,
					download: false,
					expandableRows: true,
					customToolbarSelect: (selectedRows, data) =>
						<SelectedRowsToolbar
							selectedRows={selectedRows}
							data={data}
							columns={columns}
							datatableTitle="StudentData"
						/>,
					renderExpandableRow: (rowData, rowMeta) => {
						return (
							renderExtraData(rowMeta.dataIndex)
						);
					},
				}}
			/>}

		</>
	);
};