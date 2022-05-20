import React, { useEffect, useState } from "react";
import {
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import BigStat from "./Components/BigStat/BigStat";
import axios from "axios";
import Tables from "./Components/tables/Tables";
import SectionPop from "../../components/Models/SectionPop";
import YearPop from "../../components/Models/YearPop";


export default function Dashboard(props) {
	var classes = useStyles();
	const [section, setSection] = useState('');
	const [sectionDetails, setSectionDetails] = useState(null)
	const [year, setYear] = useState('');
	const [allSelectedStudents, setAllSelectedStudents] = useState(null);
	const [membersData, setMembersData] = useState(null)
	const genders = ([{ id: 'male', value: 'Male', color: 'primary' }, { id: 'female', value: 'Female', color: 'secondary' }]);
	const handleSectionChange = (e) => {
		setSection(e)
	}
	const handleYearChange = (e) => {
		setYear(e)
	}
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
				setAllSelectedStudents(null);
				console.log(error);
			})
	}
	useEffect(() => {
		setSectionDetails(null);
		setMembersData(null)
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
	}, [section, year]);
	const handleMembersClick = (e) => {
		setMembersData(e)
	}
	return (
		<>
			<PageTitle title="Dashboard" button={(<> <SectionPop onSectionChange={handleSectionChange} /> <YearPop onYearChange={handleYearChange} /> </>)} />
			<Grid container spacing={4}>
				{allSelectedStudents === null && <Grid container spacing={4}>
					<Grid item xs={12} md={12}>
						<Widget title="NO DATA AVAILABLE" disableWidgetMenu>Please Select Section or Year</Widget>
					</Grid>
				</Grid>}
				{allSelectedStudents && allSelectedStudents.map((details) => {
					return (
						<Grid key={details._id} item lg={3} md={4} sm={6} xs={12}>
							<Widget
								title={`${details.year} Batch Students`}
								upperTitle
								bodyClass={classes.fullHeightBody}
								className={classes.card}
								disableWidgetMenu
							>
								<div className={classes.visitsNumberContainer}>
									<Grid container item alignItems={"center"}>
										<Grid item xs={6}>
											<Button onClick={() => { setSectionDetails(details) }} >
												<Typography size="xl" weight="medium" noWrap>
													{`${details.students.length} - ${details.section}`}
												</Typography>
											</Button>
										</Grid>
										<Grid item xs={6}>
											{genders.map((gender) => {
												return (
													<div key={gender.id} className={classes.pieChartLegendWrapper}>
														<div className={classes.legendItemContainer}>
															<Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
																&nbsp;{`${gender.value}`}&nbsp;
															</Typography>
															<Typography color="text" colorBrightness="secondary">
																&nbsp;{details[gender.id]}
															</Typography>
														</div>
													</div>
												)
											})}
										</Grid>
									</Grid>
								</div>
								<Grid
									container
									direction="row"
									justify="space-between"
									alignItems="center"
								>
									<Grid item xs={4}>
										<Typography color="text" colorBrightness="secondary" noWrap>
											Class Pass%
										</Typography>
										<Typography size="md">{details.percentage}%</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography color="text" colorBrightness="secondary" noWrap>
											Male Pass%
										</Typography>
										<Typography size="md">{details.malePercentage}%</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography color="text" colorBrightness="secondary" noWrap>
											Female Pass%
										</Typography>
										<Typography size="md">{details.femalePercentage}%</Typography>
									</Grid>
								</Grid>
							</Widget>
						</Grid>
					)
				})}
			</Grid>
			{sectionDetails && <><PageTitle title={`Section ${sectionDetails.section}`} />
				<Grid container spacing={4}>
					<Grid item md={4} sm={6} xs={12}>
						<BigStat {...(
							{
								product: "All",
								color: "success",
								totalStrength: sectionDetails.male + sectionDetails.female,
								allPass: `${(sectionDetails.male + sectionDetails.female) - (sectionDetails.maleBacklogs + sectionDetails.femaleBacklogs)}`,
								percentage: sectionDetails.percentage,
								backlogs: `${sectionDetails.femaleBacklogs + sectionDetails.maleBacklogs}`,
								students: sectionDetails.students
							})
						} handleMembersClick={handleMembersClick} />
					</Grid>
					<Grid item md={4} sm={6} xs={12}>
						<BigStat {...(
							{
								product: "Male",
								color: "primary",
								totalStrength: sectionDetails.male,
								allPass: `${sectionDetails.male - sectionDetails.maleBacklogs}`,
								percentage: sectionDetails.malePercentage,
								backlogs: sectionDetails.maleBacklogs,
								students: sectionDetails.students.filter((student) => student.gender === ('M' || 'Male' || 'male' || 'm'))
							})
						} handleMembersClick={handleMembersClick} />
					</Grid>
					<Grid item md={4} sm={6} xs={12}>
						<BigStat {...(
							{
								product: "Female",
								color: "secondary",
								totalStrength: sectionDetails.female,
								allPass: `${sectionDetails.female - sectionDetails.femaleBacklogs}`,
								percentage: sectionDetails.femalePercentage,
								backlogs: sectionDetails.femaleBacklogs,
								students: sectionDetails.students.filter((student) => student.gender === ('F' || 'Female' || 'female' || 'f'))
							})
						} handleMembersClick={handleMembersClick} />
					</Grid>
				</Grid>
			</>}
			{membersData &&
				<>
					<PageTitle title={`Students Data`} />
					<Tables membersData={membersData} />
				</>}
		</>
	);
}
