import React, { useState } from "react";
import {
	Grid,
	LinearProgress,
	Select,
	OutlinedInput,
	MenuItem,
	Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
	ResponsiveContainer,
	ComposedChart,
	AreaChart,
	LineChart,
	Line,
	Area,
	PieChart,
	Pie,
	Cell,
	YAxis,
	XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import StudentTable from "../../components/StudentTable";
import SectionPop from "../../components/SectionPop";
import YearPop from "../../components/YearPop";

const mainChartData = getMainChartData();
const PieChartData = [
	{ name: "Section A", value: 50, color: "primary" },
	{ name: "Section B", value: 70, color: "secondary" },
	{ name: "Section C", value: 100, color: "warning" },
	{ name: "Section D", value: 90, color: "success" },
];

export default function Dashboard(props) {
	var classes = useStyles();
	var theme = useTheme();

	// local
	var [mainChartState, setMainChartState] = useState("monthly");

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

function getMainChartData() {
	var resultArray = [];
	var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
	var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
	var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

	for (let i = 0; i < tablet.length; i++) {
		resultArray.push({
			tablet: tablet[i].value,
			desktop: desktop[i].value,
			mobile: mobile[i].value,
		});
	}

	return resultArray;
}
