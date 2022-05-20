import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Fab, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";

// styles
import useStyles from "./styles";
import {
	RemoveRounded as SubIcon,
	AddRounded as AddIcon,
	AddToPhotosRounded as AddToPhotos,
} from "@material-ui/icons";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Close as CloseIcon } from "@material-ui/icons";
import SendIcon from '@material-ui/icons/Send';
import './uploadData.css';
import SectionPop from "../../components/Models/SectionPop";
import YearPop from "../../components/Models/YearPop";
import axios from "axios";

export default function UploadDataPage(props) {

	const drop = document.querySelector(".drop");
	const progress = document.querySelector(".progress");
	const pdfprogress = document.querySelector(".pdfprogress");
	const pdfdrop = document.querySelector(".pdfdrop");
	const pdfsupplyprogress = document.querySelector(".pdfsupplyprogress");
	const pdfsupplydrop = document.querySelector(".pdfsupplydrop");

	var classes = useStyles();
	const [excelFileData, setExcelFileData] = useState({ preview: '', data: '' })
	const [excelFileName, setExcelFileName] = useState(null);
	const [selectedSem, setSelectedSem] = useState([]);
	const [PDFFileData, setPDFFileData] = useState({ preview: '', data: '' })
	const [PDFFileName, setPDFFileName] = useState(null);
	const [regularAvailable, setRegularAvailable] = useState(true)
	const [presentSemNoofAttempts, setPresentSemNoOfAttempts] = useState(null);
	const [semCount, setSemCount] = useState(null);
	const [excelStatus, setExcelStatus] = useState('')
	const [PDFStatus, setPDFStatus] = useState('')
	const [section, setSection] = useState(null);
	const [year, setYear] = useState(null);
	const [isDisabled, setIsDisabled] = useState(true);
	const [allSelectedStudents, setAllSelectedStudents] = useState(null);
	const commonFunc = (route) => {
		const data = {
			section: section,
			year: year
		}
		axios.post(`http://localhost:3001/${route}`, { data })
			.then((response) => {
				if (response.data.length > 0) {
					setAllSelectedStudents(response.data)
				}
				else {
					setAllSelectedStudents(null)
				}
			})
			.catch((error) => {
				console.log(error);
			})
	}
	useEffect(() => {
		allSelectedStudents && allSelectedStudents[0].presentSem.some(element => {
			if (element.name === selectedSem) {
				setRegularAvailable(false);
				setPresentSemNoOfAttempts(element.noOfAttempts);
				setSemCount(element.noOfAttempts)
			}
			else {
				setRegularAvailable(true)
			}
		});
		allSelectedStudents && allSelectedStudents[0].presentSem.length === 0 && setRegularAvailable(true)
	}, [selectedSem])
	useEffect(() => {
		if (section && !year) {
			commonFunc('getbysection');
		}
		else if (!section && year) {
			commonFunc('getbyyear');
		}
		else if (section && year) {
			commonFunc('getbysectionandyear');
		}
		else {
			setAllSelectedStudents(null)
		}
	}, [section, year])
	const emptyStates = () => {
		setAllSelectedStudents(null)
		setSection('');
		setYear('');
		setExcelFileData({ preview: '', data: '' });
		setExcelFileName(null);
	}
	useEffect(() => {
		if (excelFileName !== null && excelFileData && section && year) {
			setIsDisabled(false)
		}
	}, [excelFileName, section, year, excelStatus])
	const handleExcelSubmit = async (e) => {
		setExcelStatus(null)
		e.preventDefault()
		let formData = new FormData()
		formData.append('file', excelFileData.data)
		formData.append('section', section)
		formData.append('year', year)
		formData.append('isPrev', section + year)
		const response = await fetch('http://localhost:3001/uploadStudentDataExcel', {
			method: 'POST',
			body: formData,
		})
		if (response) {
			setExcelStatus(response.excelStatusText);
			emptyStates()
			window.location.reload(false)
		}
	}
	const handlePDFSubmit = async (e) => {
		setPDFStatus(null)
		e.preventDefault()
		const formData = new FormData();
		formData.append('file', PDFFileData.data)
		formData.append('section', section)
		formData.append('year', year)
		formData.append('isPrev', section + year)
		formData.append('semNumber', selectedSem)
		try {
			const res = await axios.post(
				"http://localhost:3001/uploadResultPDF",
				formData
			);
			if (res.data) {
				setPDFStatus(res.excelStatusText);
				emptyStates()
				window.location.reload(false)
			}
		} catch (ex) {
			console.log(ex);
		}
	}
	const handleSupplySubmit = async (e) => {
		var isSupply = presentSemNoofAttempts === semCount ? false : true;
		setPDFStatus(null)
		e.preventDefault()
		const formData = new FormData();
		formData.append('file', PDFFileData.data)
		formData.append('section', section)
		formData.append('year', year)
		formData.append('isPrev', section + year)
		formData.append('semNumber', selectedSem)
		formData.append('noOfAttempts', presentSemNoofAttempts)
		formData.append('isSupply', isSupply)
		try {
			const res = await axios.post(
				"http://localhost:3001/uploadSupplyPDF",
				formData
			);
			if (res.data) {
				setPDFStatus(res.excelStatusText);
				emptyStates()
				window.location.reload(false)
			}
		} catch (ex) {
			console.log(ex);
		}
	}
	function excelupload() {
		// fake Upload Logic
		let intervalCount = 0.25;
		progress.style.display = "block";
		progress.style.width = `${20 * intervalCount}%`;
		const interval = setInterval(() => {
			intervalCount += 0.25;
			progress.style.width = `${20 * intervalCount}%`;
			if (intervalCount === 5) {
				clearInterval(interval);
				progress.style.display = "none";
				drop.style.display = "block";
			}
		}, 100);
	} function pdfupload() {
		// fake Upload Logic
		let intervalCount = 0.25;
		pdfprogress.style.display = "block";
		pdfprogress.style.width = `${20 * intervalCount}%`;
		const interval = setInterval(() => {
			intervalCount += 0.25;
			pdfprogress.style.width = `${20 * intervalCount}%`;
			if (intervalCount === 5) {
				clearInterval(interval);
				pdfprogress.style.display = "none";
				pdfdrop.style.display = "block";
			}
		}, 100);
	} function pdfsupplyupload() {
		// fake Upload Logic
		let intervalCount = 0.25;
		pdfsupplyprogress.style.display = "block";
		pdfsupplyprogress.style.width = `${20 * intervalCount}%`;
		const interval = setInterval(() => {
			intervalCount += 0.25;
			pdfsupplyprogress.style.width = `${20 * intervalCount}%`;
			if (intervalCount === 5) {
				clearInterval(interval);
				pdfsupplyprogress.style.display = "none";
				pdfsupplydrop.style.display = "block";
			}
		}, 100);
	}
	const handleExcelFileChange = (e) => {
		drop.style.display = "none";
		excelupload()
		const fileInfo = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		}
		setExcelFileName(e.target.files[0].name)
		setExcelFileData(fileInfo)
	}
	const handlePDFFileChange = (e) => {
		pdfdrop.style.display = "none";
		pdfupload()
		const fileInfo = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		}
		setPDFFileName(e.target.files[0].name)
		setPDFFileData(fileInfo);
	}
	const handleSupplyPDFChange = (e) => {
		pdfsupplydrop.style.display = "none";
		pdfsupplyupload()
		const fileInfo = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		}
		setPDFFileName(e.target.files[0].name)
		setPDFFileData(fileInfo);
	}
	const handleSectionChange = (e) => {
		setSection(e)
	}
	const handleYearChange = (e) => {
		setYear(e)
	}
	function CloseButton({ closeToast, className }) {
		return <CloseIcon className={className} onClick={closeToast} />;
	}
	const renderDropDown = () => {
		return (
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Selected Sem</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={selectedSem}
					label="Age"
					onChange={(e) => setSelectedSem(e.target.value)}
				>
					<MenuItem value={'sem1Data'}>Sem - 1</MenuItem>
					<MenuItem value={'sem2Data'}>Sem - 2</MenuItem>
					<MenuItem value={'sem3Data'}>Sem - 3</MenuItem>
					<MenuItem value={'sem4Data'}>Sem - 4</MenuItem>
					<MenuItem value={'sem5Data'}>Sem - 5</MenuItem>
					<MenuItem value={'sem6Data'}>Sem - 6</MenuItem>
					<MenuItem value={'sem7Data'}>Sem - 7</MenuItem>
					<MenuItem value={'sem8Data'}>Sem - 8</MenuItem>
				</Select>
			</FormControl>
		)
	}
	return (
		<>
			<PageTitle title="" button={(<> <SectionPop onSectionChange={handleSectionChange} /> <YearPop onYearChange={handleYearChange} /> </>)} />
			<Grid container spacing={10}>
				<Grid item xs={12} md={12} className={section && year ? null : 'disabledcursor'}>
					<PageTitle title="Upload Student Excel Sheet" />
					<div className="drop-container">
						<div className="drop">
							{excelStatus === null ? <CircularProgress size={50} className={classes.loginLoader} /> : (
								allSelectedStudents ? `Student Data Already Exists` :
									(excelFileName ? excelFileName :
										<>
											<AddToPhotos />
											<span className="text">
												Upload Students Details Through Excel Sheet
											</span>
											<label htmlFor="file-upload">Browse Files</label>
											<input type="file" id="file-upload" className="file-input" accept='.xlsx, .xls, .csv' onChange={handleExcelFileChange} disabled={section && year ? false : true} />
										</>))}
						</div>
						<div className="progress"></div>
						<Button disabled={isDisabled} variant="contained" onClick={handleExcelSubmit} style={{ backgroundColor: !isDisabled ? '#7B1FA2' : '#eeeeee', color: '#FFFFFF', marginTop: 29 }} endIcon={<SendIcon />}>
							Submit
						</Button>
					</div>
				</Grid>
				{allSelectedStudents && section && year && <Grid item xs={12} md={12} key={`data.clsName`}>
					<Widget title={renderDropDown()} disableWidgetMenu>
						{PDFStatus === null ? <CircularProgress size={50} className={classes.loginLoader} /> : (
							<>
								<div className={classes.dashedBorder}>
									<div style={{ display: 'flex', justifyContent: 'space-between' }}>
										<div className={`drop-container ${regularAvailable && selectedSem.length > 0 ? '' : 'disabledCursor'}`}>
											<div className="pdfdrop">
												{PDFFileName ? PDFFileName : (<>
													<span className="text">
														Upload Regular PDF
													</span>
													<label htmlFor="file-uploads">Browse Files</label>
													<input type="file" id="file-uploads" className="file-input" accept='.pdf' onChange={(e) => { handlePDFFileChange(e) }} disabled={!regularAvailable} /></>)}
											</div>
											<div className="pdfprogress"></div>
											{regularAvailable && <Button disabled={PDFFileName ? false : true} variant="contained" onClick={handlePDFSubmit} style={{ backgroundColor: PDFFileName ? '#7B1FA2' : '#eeeeee', color: '#FFFFFF', marginTop: 29 }} endIcon={<SendIcon />}>
												Submit
											</Button>}
										</div>
										<div style={{ alignItems: 'center', display: 'flex' }}>
											<h3 style={{ paddingRight: 30 }}>Num Of Attempts : {presentSemNoofAttempts}</h3>
											<Fab color="primary" aria-label="add" onClick={() => { setPresentSemNoOfAttempts(semCount === presentSemNoofAttempts ? parseInt(semCount) + 1 : semCount) }} disabled={regularAvailable}>
												{semCount === presentSemNoofAttempts ? <AddIcon /> : <SubIcon />}
											</Fab>
										</div>
										<div className={`drop-container ${regularAvailable ? 'disabledCursor' : ''}`}>
											<div className="pdfsupplydrop">
												{PDFFileName ? PDFFileName : (<>
													<span className="text">
														Upload Supply PDF
													</span>
													<label htmlFor="file-supplyPDFupload">Browse Files</label>
													<input type="file" id="file-supplyPDFupload" className="file-input" accept='.pdf' onChange={(e) => { handleSupplyPDFChange(e) }} disabled={regularAvailable} /></>)}
											</div>
											<div className="pdfsupplyprogress"></div>
											{!regularAvailable && <div style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}><Button disabled={PDFFileName ? false : true} variant="contained" onClick={handleSupplySubmit} style={{ backgroundColor: PDFFileName ? '#7B1FA2' : '#eeeeee', color: '#FFFFFF', marginTop: 29 }} endIcon={<SendIcon />}>
												Submit
											</Button></div>}
										</div>
									</div>
								</div>
							</>)}
					</Widget>
				</Grid>}
			</Grid>
		</>
	);
}
