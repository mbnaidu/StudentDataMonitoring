import React, { useEffect, useState } from "react";
import {
	Grid,
	Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import SectionPop from "../../components/SectionPop";
import YearPop from "../../components/YearPop";
import axios from "axios";


export default function Dashboard(props) {
	var classes = useStyles();
	var theme = useTheme();
	const [section, setSection] = useState('');
	const [year, setYear] = useState('');
	const [allSelectedStudents, setAllSelectedStudents] = useState(null);
	const PieChartData = [
		{ name: "Section A", value: 50, color: "primary" },
		{ name: "Section B", value: 70, color: "secondary" },
		{ name: "Section C", value: 100, color: "warning" },
		{ name: "Section D", value: 90, color: "success" },
	];
	const handleSectionChange = (e) => {
		setSection(e)
	}
	const handleYearChange = (e) => {
		setYear(e)
	}
	useEffect(() => {
		if (section && !year) {
			const data = {
				section: section,
				year: year
			}
			axios.post('http://localhost:3001/getbysection', { data })
				.then((response) => {
					response.data !== null ? setAllSelectedStudents(response.data) : setAllSelectedStudents(null);
				})
				.catch((error) => {
					console.log(error);
				})
		}
		else if (!section && year) {
			const data = {
				section: section,
				year: year
			}
			axios.post('http://localhost:3001/getbyyear', { data })
				.then((response) => {
					if (response.data) {
						setAllSelectedStudents([response.data])
					}
					else {
						setAllSelectedStudents(null)
					}
				})
				.catch((error) => {
					console.log(error);
				})
		}
		else if (section && year) {
			const data = {
				section: section,
				year: year
			}
			axios.post('http://localhost:3001/getbysectionandyear', { data })
				.then((response) => {
					console.log('++++++++++++', response.data);
					response.data !== null ? setAllSelectedStudents([response.data]) : setAllSelectedStudents(null);
				})
				.catch((error) => {
					console.log(error);
				})
		}
		else {
			setAllSelectedStudents(null)
		}
	}, [section, year])
	return (
		<>
			<PageTitle title="Dashboard" button={(<> <SectionPop onSectionChange={handleSectionChange} />, <YearPop onYearChange={handleYearChange} /> </>)} />
			<Grid container spacing={4}>
				{allSelectedStudents === null && <Grid container spacing={4}>
					<Grid item xs={12} md={12}>
						<Widget title="NO DATA AVAILABLE" disableWidgetMenu>Please Select Section or Year</Widget>
					</Grid>
				</Grid>}
				{allSelectedStudents && allSelectedStudents.map((details) => {
					return (
						<Grid key={details.isPrev} item lg={3} md={4} sm={6} xs={12}>
							<Widget
								title={`${details.year} Batch Students`}
								upperTitle
								bodyClass={classes.fullHeightBody}
								className={classes.card}
							>
								<div className={classes.visitsNumberContainer}>
									<Grid container item alignItems={"center"}>
										<Grid item xs={6}>
											<Typography size="xl" weight="medium" noWrap>
												{details.students.length}
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<div className={classes.pieChartLegendWrapper}>
												<div key={'secondary'} className={classes.legendItemContainer}>
													<Dot color={'secondary'} />
													<Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
														&nbsp;{`${details.section}`}&nbsp;
													</Typography>
													<Typography color="text" colorBrightness="secondary">
														&nbsp;{50}
													</Typography>
												</div>
											</div>
										</Grid>
									</Grid>
								</div>
								<Grid
									container
									direction="row"
									justify="space-between"
									alignItems="center"
								>
									<Grid item xs={3}>
										<Typography color="text" colorBrightness="secondary" noWrap>
											Section A
										</Typography>
										<Typography size="md">35%</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography color="text" colorBrightness="secondary" noWrap>
											Section B
										</Typography>
										<Typography size="md">25%</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography color="text" colorBrightness="secondary" noWrap>
											Section C
										</Typography>
										<Typography size="md">45%</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography color="text" colorBrightness="secondary" noWrap>
											Section D
										</Typography>
										<Typography size="md">50%</Typography>
									</Grid>
								</Grid>
							</Widget>
						</Grid>
					)
				})}
			</Grid>
			<PageTitle title="Section A" />
			<Grid container spacing={4}>
				{mock.bigStat.map(stat => (
					<Grid item md={4} sm={6} xs={12} key={stat.product}>
						<BigStat {...stat} />
					</Grid>
				))}
			</Grid>
		</>
	);
}
