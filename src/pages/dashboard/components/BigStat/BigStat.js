import React from "react";
import { Button, Grid, Typography, } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget/Widget";

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
	)
}
