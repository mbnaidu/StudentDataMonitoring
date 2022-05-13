import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Close as CloseIcon } from "@material-ui/icons";
import SendIcon from '@material-ui/icons/Send';
import '../typography/typography.css';
import SectionPop from "../../components/SectionPop";
import YearPop from "../../components/YearPop";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function TypographyPage(props) {
	var classes = useStyles();
	const [excelFileData, setExcelFileData] = useState({ preview: '', data: '' })
	const [excelFileName, setExcelFileName] = useState('Select your file!');

	const [PDFFileData, setPDFFileData] = useState({ preview: '', data: '' })
	const [PDFFileName, setPDFFileName] = useState('Select your file!');
	const [activeClass, setActiveClass] = useState('1-1sem')
	const [excelStatus, setExcelStatus] = useState('')
	const [PDFStatus, setPDFStatus] = useState('')
	const [section, setSection] = useState('');
	const [year, setYear] = useState('');
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
		setExcelFileName('Select your file!');
	}
	useEffect(() => {
		emptyStates();
	}, [])
	useEffect(() => {
		if (excelFileName.indexOf('.xlsx') !== -1 && excelFileData && section && year) {
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
			toast("Successfully Added !")
			setExcelStatus(response.excelStatusText);
			emptyStates()
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
		try {
			const res = await axios.post(
				"http://localhost:3001/uploadResultPDF",
				formData
			);
			if (res.data) {
				toast("Successfully Added !")
				setPDFStatus(res.excelStatusText);
				emptyStates()
			}
		} catch (ex) {
			console.log(ex);
		}
	}
	const handleExcelFileChange = (e) => {
		const fileInfo = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		}
		setExcelFileName(e.target.files[0].name)
		setExcelFileData(fileInfo)
	}
	const handlePDFFileChange = (e, id) => {
		const fileInfo = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		}
		setPDFFileName(e.target.files[0].name)
		setPDFFileData(fileInfo);
		setActiveClass(id);
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

	const uploadData = [
		{ title: '1-1 Semester', clsName: '1-1sem' },
		{ title: '1-2 Semester', clsName: '1-2sem' },
		{ title: '2-1 Semester', clsName: '2-1sem' },
		{ title: '2-2 Semester', clsName: '2-2sem' },
		{ title: '3-1 Semester', clsName: '3-1sem' },
		{ title: '3-2 Semester', clsName: '3-2sem' },
		{ title: '4-1 Semester', clsName: '4-1sem' },
		{ title: '4-2 Semester', clsName: '4-2sem' },
	]
	return (
		<>
			<PageTitle title="Upload Semester Datas" button={(<> <SectionPop onSectionChange={handleSectionChange} />, <YearPop onYearChange={handleYearChange} /> </>)} />
			<ToastContainer className={classes.toastsContainer}
				closeButton={
					<CloseButton className={classes.notificationCloseButton} />
				}
				closeOnClick={false}
				progressClassName={classes.notificationProgress} />
			<Grid container spacing={4}>
				<Grid item xs={12} md={12}>
					<Widget title="Student List" disableWidgetMenu >
						{excelStatus === null ? <CircularProgress size={50} className={classes.loginLoader} /> : (
							<div className={classes.dashedBorder} style={{ flexDirection: 'row' }}>
								{allSelectedStudents === null ?
									<>
										<div className="container">
											<form className="form">
												<div className="file-upload-wrapper" data-text={excelFileName}>
													<input type="file" accept='.xlsx, .xls, .csv' onChange={handleExcelFileChange}></input>
												</div>
											</form>
										</div>
										<div className="fs-title">
											<Button disabled={isDisabled} variant="contained" onClick={handleExcelSubmit} style={{ backgroundColor: !isDisabled ? '#7B1FA2' : '#eeeeee', color: '#FFFFFF', marginTop: 29 }} endIcon={<SendIcon />}>
												Submit
											</Button>
										</div>
									</>
									: <h4>Data Exists {section && year && <Button variant="contained" color="secondary">Delete Data</Button>}</h4>}
							</div>)}
					</Widget>
				</Grid>
				{section && year && allSelectedStudents && uploadData && uploadData.map((data) => {
					return (
						<Grid item xs={12} md={6} key={data.clsName}>
							<Widget title={data.title} disableWidgetMenu>
								{PDFStatus === null ? <CircularProgress size={50} className={classes.loginLoader} /> : (
									<>
										<div className={classes.dashedBorder}>
											<div className="container" >
												<form className="form" style={{ backgroundColor: 'red' }} >
													<div className="file-upload-wrapper" data-text={activeClass === data.clsName ? PDFFileName : `${activeClass} is active`}>
														<input type="file" accept='.pdf' onChange={(e) => { handlePDFFileChange(e, data.clsName) }} ></input>
													</div>
												</form>
											</div>
										</div>
										<Button variant="contained" disabled={activeClass === data.clsName ? false : true} onClick={handlePDFSubmit} style={{ backgroundColor: activeClass === data.clsName ? '#7B1FA2' : '#eee', color: '#FFFFFF', marginTop: 29 }} endIcon={<SendIcon />}>
											Submit
										</Button>
									</>)}
							</Widget>
						</Grid>
					)
				})}
			</Grid>
		</>
	);
}
