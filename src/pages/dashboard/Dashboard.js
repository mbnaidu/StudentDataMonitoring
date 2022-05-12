import React, { useEffect, useState } from "react";
import {
	Grid,
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
	const [totalITStudentsData, setTotalITStudentsData] = useState();
	const PieChartData = [
		{ name: "Section A", value: 50, color: "primary" },
		{ name: "Section B", value: 70, color: "secondary" },
		{ name: "Section C", value: 100, color: "warning" },
		{ name: "Section D", value: 90, color: "success" },
	];
	useEffect(() => {
		axios.get('http://localhost:3001/getAllStudents').then((response) => { console.log(response.data); }).catch((error) => { console.log(error); })
	}, [])
	return (
		<>
			<PageTitle title="Dashboard" button={(<> <SectionPop />, <YearPop /> </>)} />
			<Grid container spacing={4}>
				<Grid item lg={3} md={4} sm={6} xs={12}>
					<Widget
						title="1st Year Students"
						upperTitle
						bodyClass={classes.fullHeightBody}
						className={classes.card}
					>
						<div className={classes.visitsNumberContainer}>
							<Grid container item alignItems={"center"}>
								<Grid item xs={3}>
									<Typography size="xl" weight="medium" noWrap>
										310
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<ResponsiveContainer width="100%" height={144}>
										<PieChart>
											<Pie
												data={PieChartData}
												innerRadius={30}
												outerRadius={40}
												dataKey="value"
											>
												{PieChartData.map((entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={theme.palette[entry.color].main}
													/>
												))}
											</Pie>
										</PieChart>
									</ResponsiveContainer>
								</Grid>
								<Grid item xs={5}>
									<div className={classes.pieChartLegendWrapper}>
										{PieChartData.map(({ name, value, color }, index) => (
											<div key={color} className={classes.legendItemContainer}>
												<Dot color={color} />
												<Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
													&nbsp;{name}&nbsp;
												</Typography>
												<Typography color="text" colorBrightness="secondary">
													&nbsp;{value}
												</Typography>
											</div>
										))}
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
				<Grid item lg={3} md={4} sm={6} xs={12}>
					<Widget
						title="2nd Year Students"
						upperTitle
						bodyClass={classes.fullHeightBody}
						className={classes.card}
					>
						<div className={classes.visitsNumberContainer}>
							<Grid container item alignItems={"center"}>
								<Grid item xs={3}>
									<Typography size="xl" weight="medium" noWrap>
										310
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<ResponsiveContainer width="100%" height={144}>
										<PieChart>
											<Pie
												data={PieChartData}
												innerRadius={30}
												outerRadius={40}
												dataKey="value"
											>
												{PieChartData.map((entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={theme.palette[entry.color].main}
													/>
												))}
											</Pie>
										</PieChart>
									</ResponsiveContainer>
								</Grid>
								<Grid item xs={5}>
									<div className={classes.pieChartLegendWrapper}>
										{PieChartData.map(({ name, value, color }, index) => (
											<div key={color} className={classes.legendItemContainer}>
												<Dot color={color} />
												<Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
													&nbsp;{name}&nbsp;
												</Typography>
												<Typography color="text" colorBrightness="secondary">
													&nbsp;{value}
												</Typography>
											</div>
										))}
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
				<Grid item lg={3} md={4} sm={6} xs={12}>
					<Widget
						title="3rd Year Students"
						upperTitle
						bodyClass={classes.fullHeightBody}
						className={classes.card}
					>
						<div className={classes.visitsNumberContainer}>
							<Grid container item alignItems={"center"}>
								<Grid item xs={3}>
									<Typography size="xl" weight="medium" noWrap>
										310
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<ResponsiveContainer width="100%" height={144}>
										<PieChart>
											<Pie
												data={PieChartData}
												innerRadius={30}
												outerRadius={40}
												dataKey="value"
											>
												{PieChartData.map((entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={theme.palette[entry.color].main}
													/>
												))}
											</Pie>
										</PieChart>
									</ResponsiveContainer>
								</Grid>
								<Grid item xs={5}>
									<div className={classes.pieChartLegendWrapper}>
										{PieChartData.map(({ name, value, color }, index) => (
											<div key={color} className={classes.legendItemContainer}>
												<Dot color={color} />
												<Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
													&nbsp;{name}&nbsp;
												</Typography>
												<Typography color="text" colorBrightness="secondary">
													&nbsp;{value}
												</Typography>
											</div>
										))}
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
				<Grid item lg={3} md={4} sm={6} xs={12}>
					<Widget
						title="4th Year Students"
						upperTitle
						bodyClass={classes.fullHeightBody}
						className={classes.card}
					>
						<div className={classes.visitsNumberContainer}>
							<Grid container item alignItems={"center"}>
								<Grid item xs={3}>
									<Typography size="xl" weight="medium" noWrap>
										310
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<ResponsiveContainer width="100%" height={144}>
										<PieChart>
											<Pie
												data={PieChartData}
												innerRadius={30}
												outerRadius={40}
												dataKey="value"
											>
												{PieChartData.map((entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={theme.palette[entry.color].main}
													/>
												))}
											</Pie>
										</PieChart>
									</ResponsiveContainer>
								</Grid>
								<Grid item xs={5}>
									<div className={classes.pieChartLegendWrapper}>
										{PieChartData.map(({ name, value, color }, index) => (
											<div key={color} className={classes.legendItemContainer}>
												<Dot color={color} />
												<Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
													&nbsp;{name}&nbsp;
												</Typography>
												<Typography color="text" colorBrightness="secondary">
													&nbsp;{value}
												</Typography>
											</div>
										))}
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

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
	var array = new Array(length).fill();
	let lastValue;

	return array.map((item, index) => {
		let randomValue = Math.floor(Math.random() * multiplier + 1);

		while (
			randomValue <= min ||
			randomValue >= max ||
			(lastValue && randomValue - lastValue > maxDiff)
		) {
			randomValue = Math.floor(Math.random() * multiplier + 1);
		}

		lastValue = randomValue;

		return { value: randomValue };
	});
}