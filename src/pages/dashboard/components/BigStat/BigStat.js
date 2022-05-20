import React from "react";
import { Button, Grid, } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget/Widget";
import { Typography } from "../../../../components/Wrappers/Wrappers";

export default function BigStat(props) {
	var { product, color, totalStrength, allPass, backlogs, students, handleMembersClick } = props;
	var classes = useStyles();
	var theme = useTheme();

	return (
		<Widget
			header={
				<div className={classes.title}>
					<Typography variant="h5">{product}</Typography>
				</div>
			}
			upperTitle
			bodyClass={classes.bodyWidgetOverflow}
		>
			<div className={classes.totalValueContainer}>
				<div className={classes.totalValue}>
					<Button onClick={() => { handleMembersClick(students) }}>
						<Typography size="xxl" color="text" colorBrightness="secondary">
							{totalStrength}
						</Typography>
					</Button>
				</div>
				<BarChart width={150} height={70} data={getRandomData()}>
					<Bar
						dataKey="value"
						fill={theme.palette[color].main}
						radius={10}
						barSize={10}
					/>
				</BarChart>
			</div>
			<div className={classes.bottomStatsContainer}>
				<div className={classnames(classes.statCell, classes.borderRight)}>
					<Grid container alignItems="center">
						<Typography variant="h6">{allPass}</Typography>
						<ArrowForwardIcon
							className={classnames(classes.profitArrow)}
						/>
					</Grid>
					<Typography size="sm" color="text" colorBrightness="secondary">
						All Pass
					</Typography>
				</div>
				<div className={classes.statCell}>
					<Grid container alignItems="center">
						<Typography variant="h6">{backlogs}</Typography>
						<ArrowForwardIcon
							className={classnames(classes.profitArrowDanger)}
						/>
					</Grid>
					<Typography size="sm" color="text" colorBrightness="secondary">
						Backlogs
					</Typography>
				</div>
			</div>
		</Widget>
	);
}

// #######################################################################

function getRandomData() {
	return Array(7)
		.fill()
		.map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
