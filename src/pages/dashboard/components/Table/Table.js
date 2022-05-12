import React from "react";
import {
	Table,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails
} from "@material-ui/core";
import {
	ArrowDownward as ExpandMoreIcon,
} from "@material-ui/icons";
import { Cell, Pie, PieChart } from "recharts";

export default function TableComponent({ data }) {
	var keys = Object.keys(data[0]).map(i => i.toUpperCase());
	return (
		<Table className="mb-0" style={{ height: 100 }}>
			<TableHead>
				<TableRow>
					{keys.map(key => (
						<TableCell align="center" key={key}>{key}</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody >
				{data.map(({ id, name, email, percentage, backlogs, attendance }) => (
					<TableRow key={id}>
						<TableCell className="pl-3 fw-normal" align="center">
							<Accordion style={{ width: 300 }}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>{id}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
										malesuada lacus ex, sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion></TableCell>
						<TableCell align="center">{name}</TableCell>
						<TableCell align="center">
							{email}
						</TableCell>
						<TableCell align="center">{percentage}</TableCell>
						<TableCell align="center">{backlogs}</TableCell>
						<TableCell align="center">
							{/* <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} /> */}
							<PieChart width={50} height={50} style={{ paddingLeft: 60 }}>
								<text
									x={25}
									y={25}
									textAnchor="middle"
									dominantBaseline="middle"
								>
									{attendance}
								</text>
								<Pie
									data={[
										{ id: "1", name: "L1", value: 75 },
										{ id: "2", name: "L2", value: 25 }
									]}
									dataKey="value"
									innerRadius="80%"
									outerRadius="100%"
									fill="#82ca9d"
									startAngle={90}
									endAngle={-270}
									paddingAngle={0}
									blendStroke
								>
									<Cell
										key="test"
										fill="#CCC"
									/>
								</Pie>
							</PieChart>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
