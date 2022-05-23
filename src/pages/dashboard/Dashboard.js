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
import BigStat from "./components/BigStat/BigStat";
import axios from "axios";
import Tables from "./components/tables/Tables";
import SectionPop from "../../components/Models/SectionPop";
import YearPop from "../../components/Models/YearPop";
import { movingText } from "../../Globals/Globals";


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
			<PageTitle title={movingText('Dashboard')} button={(<div className={classes.dashboardHeader} style={{ justifyContent: 'space-evenly', width: '100%' }}> <SectionPop onSectionChange={handleSectionChange} /> <YearPop onYearChange={handleYearChange} /> </div>)} />
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
												<div style={{ fontSize: 26, fontWeight: 'bold' }}>
													{movingText(`${details.students.length} - ${details.section}`)}
												</div>
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
															<Typography>
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
									justifyContent="space-between"
									alignItems="center"
								>
									<Grid item xs={4}>
										<div>
											Class Pass%
										</div>
										<div>{details.percentage}</div>
									</Grid>
									<Grid item xs={4}>
										<Typography noWrap>
											Male Pass%
										</Typography>
										<Typography size="md">{details.malePercentage}</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography noWrap>
											Female Pass%
										</Typography>
										<Typography size="md">{details.femalePercentage}</Typography>
									</Grid>
								</Grid>
							</Widget>
						</Grid>
					)
				})}
			</Grid>
			{sectionDetails && <><PageTitle title={movingText(`Section ${sectionDetails.section}`)} />
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
					<PageTitle title={movingText(`Students Data`)} />
					<Tables data={membersData} />
				</>}
		</>
	);
}
