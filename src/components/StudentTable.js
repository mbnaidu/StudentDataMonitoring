import * as React from 'react';
import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    IconButton,
} from "@material-ui/core";
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@material-ui/icons";
import { Cell, Pie, PieChart } from 'recharts';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const subjects = [
        { sem: '1-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3 }, { sem: '1-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '2-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '2-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '3-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '3-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '4-1', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3, sub6: 2 }, { sem: '4-2', sub1: 3, sub2: 2, sub3: 1, sub4: 3, sub5: 3 }
    ]
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : row.id}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.percentage}</TableCell>
                <TableCell align="center">{row.backlogs}</TableCell>
                <TableCell align="center">
                    {/* <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} /> */}
                    <PieChart width={50} height={50} style={{ paddingLeft: 60 }}>
                        <text
                            x={25}
                            y={25}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {row.attendance}
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
            <TableRow style={{ display: open ? 'revert' : 'none' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Semester</TableCell>
                                        <TableCell align="center">Subject 1</TableCell>
                                        <TableCell align="center">Subject 2</TableCell>
                                        <TableCell align="center">Subject 3</TableCell>
                                        <TableCell align="center">Subject 4</TableCell>
                                        <TableCell align="center">Subject 5</TableCell>
                                        <TableCell align="center">Subject 6</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subjects.map((historyRow) => (
                                        <TableRow key={historyRow.sem}>
                                            <TableCell align="center">{historyRow.sem}</TableCell>
                                            <TableCell align="center">{historyRow.sub1 ? historyRow.sub1 : 'No Subject'}</TableCell>
                                            <TableCell align="center">{historyRow.sub2 ? historyRow.sub2 : 'No Subject'}</TableCell>
                                            <TableCell align="center">{historyRow.sub3 ? historyRow.sub3 : 'No Subject'}</TableCell>
                                            <TableCell align="center">{historyRow.sub4 ? historyRow.sub4 : 'No Subject'}</TableCell>
                                            <TableCell align="center">{historyRow.sub5 ? historyRow.sub5 : 'No Subject'}</TableCell>
                                            <TableCell align="center">{historyRow.sub6 ? historyRow.sub6 : 'No Subject'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    {
        id: '18PA1A1212',
        name: "Mark Otto",
        email: "18PA1A1212@vishnu.edu.in",
        percentage: 0,
        backlogs: 0,
        attendance: 25,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    },
    {
        id: '18PA1A1213',
        name: "Jacob Thornton",
        email: "18PA1A1213@vishnu.edu.in",
        percentage: 0,
        backlogs: 0,
        attendance: 25,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    },
    {
        id: '18PA1A1214',
        name: "Larry the Bird",
        email: "18PA1A1214@vishnu.edu.in",
        percentage: 0,
        backlogs: 0,
        attendance: 25,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    },
    {
        id: '18PA1A1215',
        name: "Joseph May",
        email: "18PA1A1215@vishnu.edu.in",
        percentage: 0,
        backlogs: 0,
        attendance: 25,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    },
    {
        id: '18PA1A1216',
        name: "Peter Horadnia",
        email: "18PA1A1216@vishnu.edu.in",
        percentage: 0,
        backlogs: 0,
        attendance: 25,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    }
];

export default function StudentTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">E-mail</TableCell>
                        <TableCell align="center">Percentage</TableCell>
                        <TableCell align="center">Backlogs</TableCell>
                        <TableCell align="center">Attendance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
