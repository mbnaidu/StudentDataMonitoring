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
	const [fileData, setFileData] = useState({ preview: '', data: '' })
	const [fileName, setFileName] = useState('Select your file!');
	const [status, setStatus] = useState('')
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
		setFileData({ preview: '', data: '' });
		setFileName('Select your file!');
	}
	useEffect(() => {
		emptyStates();
	}, [])
	useEffect(() => {
		if (fileName.indexOf('.xlsx') !== -1 && fileData && section && year) {
			setIsDisabled(false)
		}
	}, [fileName, section, year, status])
	const handleSubmit = async (e) => {
		setStatus(null)
		e.preventDefault()
		let formData = new FormData()
		formData.append('file', fileData.data)
		formData.append('section', section)
		formData.append('year', year)
		formData.append('isPrev', section + year)
		const response = await fetch('http://localhost:3001/upload', {
			method: 'POST',
			body: formData,
		})
		if (response) {
			toast("Successfully Added !")
			setStatus(response.statusText);
			emptyStates()
		}
	}
	const handleFileChange = (e) => {
		const fileInfo = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		}
		setFileName(e.target.files[0].name)
		setFileData(fileInfo)
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
						{status === null ? <CircularProgress size={50} className={classes.loginLoader} /> : (
							<div className={classes.dashedBorder} style={{ flexDirection: 'row' }}>
								{allSelectedStudents === null ?
									<>
										<div className="container">
											<form className="form">
												<div className="file-upload-wrapper" data-text={fileName}>
													<input type="file" accept='.xlsx, .xls, .csv' onChange={handleFileChange}></input>
												</div>
											</form>
										</div>
										<div className="fs-title">
											<Button disabled={isDisabled} variant="contained" onClick={handleSubmit} style={{ backgroundColor: !isDisabled ? '#7B1FA2' : '#eeeeee', color: '#FFFFFF', marginTop: 29 }} endIcon={<SendIcon />}>
												Submit
											</Button>
										</div>
									</>
									: <h1>Please Select Proper SECTION AND YEAR</h1>}
							</div>)}
					</Widget>
				</Grid>
				<Grid item xs={12} md={6}>
					<Widget title="1-1 Semester" disableWidgetMenu>
						<div className={classes.dashedBorder}>
							Regular - upload
							Supply - Upload - count
						</div>
					</Widget>
				</Grid>
				<Grid item xs={12} md={6}>
					<Widget title="1-2 Semester" disableWidgetMenu>
						<div className={classes.dashedBorder}>
							Regular - upload
							Supply - Upload - count
						</div>
					</Widget>
				</Grid>
				<Grid item xs={12} md={6}>
					<Widget title="2-1 Semester" disableWidgetMenu>
						<div className={classes.dashedBorder}>
							Regular - upload
							Supply - Upload - count
						</div>
					</Widget>
				</Grid>
				<Grid item xs={12} md={6}>
					<Widget title="2-2 Semester" disableWidgetMenu>
						<div className={classes.dashedBorder}>
							Regular - upload
							Supply - Upload - count
						</div>
					</Widget>
				</Grid>
				<Grid item xs={12} md={6}>
					<Widget title="3-1 Semester" disableWidgetMenu>
						<div className={classes.dashedBorder}>
							Regular - upload
							Supply - Upload - count
						</div>
					</Widget>
				</Grid>
				<Grid item xs={12} md={6}>
					<Widget title="3-1 Semester" disableWidgetMenu>
						<div className={classes.dashedBorder}>
							Regular - upload
							Supply - Upload - count
						</div>
					</Widget>
				</Grid>
				<Grid item xs={12} md={6}>
					<Widget title="4-1 Semester" disableWidgetMenu>
						<div className={classes.dashedBorder}>
							Regular - upload
							Supply - Upload - count
						</div>
					</Widget>
				</Grid>
				<Grid item xs={12} md={6}>
					<Widget title="4-2 Semester" disableWidgetMenu>
						<div className={classes.dashedBorder}>
							Regular - upload
							Supply - Upload - count
						</div>
					</Widget>
				</Grid>
			</Grid>
		</>
	);
}
