import { makeStyles } from "@material-ui/styles";
import { bgColor, bgIconColor, bgTextColor } from "../../Globals/Globals";

const drawerWidth = 240;

export default makeStyles(theme => ({
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		color: bgTextColor,
		backgroundImage: bgColor,
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		color: bgTextColor,
		backgroundImage: bgColor,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 40,
		[theme.breakpoints.down("sm")]: {
			width: drawerWidth,
		},
	},
	toolbar: {
		...theme.mixins.toolbar,
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	sidebarList: {
		marginTop: theme.spacing(2),
	},
	mobileBackButton: {
		marginTop: theme.spacing(0.5),
		marginLeft: 18,
		[theme.breakpoints.only("sm")]: {
			marginTop: theme.spacing(0.625),
		},
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	// Sidebarlink


	link: {
		textDecoration: "none",
		"&:hover, &:focus": {
			backgroundColor: theme.palette.background.light,
		},
	},
	externalLink: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textDecoration: 'none'
	},
	linkActive: {
		backgroundColor: theme.palette.background.light,
	},
	linkNested: {
		paddingLeft: 0,
		"&:hover, &:focus": {
			backgroundColor: "#FFFFFF",
		},
	},
	linkIcon: {
		marginRight: theme.spacing(1),
		color: 'white',
		transition: theme.transitions.create("color"),
		width: 24,
		display: "flex",
		justifyContent: "center",
	},
	linkIconActive: {
		color: bgIconColor,
	},
	linkText: {
		padding: 0,
		color: 'white',
		transition: theme.transitions.create(["opacity", "color"]),
		fontSize: 16,
	},
	linkTextActive: {
		color: theme.palette.text.primary,
	},
	linkTextHidden: {
		opacity: 0,
	},
	nestedList: {
		paddingLeft: theme.spacing(2) + 30,
	},
	sectionTitle: {
		marginLeft: theme.spacing(4.5),
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(4),
		height: 1,
		backgroundColor: "#D8D8D880",
	},
}));
