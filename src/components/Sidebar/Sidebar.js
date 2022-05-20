import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List, Link } from "@material-ui/core";
import {
	Home as HomeIcon,
	Group as GroupIcon,
	ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

import { Instagram as InstagramIcon, Facebook as FacebookIcon, GitHub as GithubIcon } from '@material-ui/icons';

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink";

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
	{ id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
	{ id: 1, type: "divider" },
	{
		id: 2,
		label: "Upload Data",
		link: "/app/uploadData",
		icon: <GroupIcon />,
	},
];

function Sidebar({ location }) {
	var classes = useStyles();
	var theme = useTheme();

	// global
	var { isSidebarOpened } = useLayoutState();
	var layoutDispatch = useLayoutDispatch();

	// local
	var [isPermanent, setPermanent] = useState(true);

	useEffect(function () {
		window.addEventListener("resize", handleWindowWidthChange);
		handleWindowWidthChange();
		return function cleanup() {
			window.removeEventListener("resize", handleWindowWidthChange);
		};
	});

	return (
		<Drawer
			variant={isPermanent ? "permanent" : "temporary"}
			className={classNames(classes.drawer, {
				[classes.drawerOpen]: isSidebarOpened,
				[classes.drawerClose]: !isSidebarOpened,
			})}
			classes={{
				paper: classNames({
					[classes.drawerOpen]: isSidebarOpened,
					[classes.drawerClose]: !isSidebarOpened,
				}),
			}}
			open={isSidebarOpened}
		>
			<div className={classes.toolbar} />
			<div className={classes.mobileBackButton}>
				<IconButton onClick={() => toggleSidebar(layoutDispatch)}>
					<ArrowBackIcon
						classes={{
							root: classNames(classes.headerIcon, classes.headerIconCollapse),
						}}
					/>
				</IconButton>
			</div>
			<List className={classes.sidebarList}>
				{structure.map(link => (
					<SidebarLink
						key={link.id}
						location={location}
						isSidebarOpened={isSidebarOpened}
						{...link}
					/>
				))}
			</List>
			<div style={{ bottom: '0', position: 'absolute', alignSelf: 'center' }}>
				<Link
					href={'https://www.facebook.com/madhubabu.g.92'}
					target={'_blank'}
				>
					<IconButton aria-label="facebook">
						<FacebookIcon />
					</IconButton>
				</Link>
				<Link
					href={'https://www.instagram.com/mb_naidu/'}
					target={'_blank'}
				>
					<IconButton
						aria-label="instagram"
					>
						<InstagramIcon />
					</IconButton>
				</Link>
				<Link
					href={'https://github.com/mbnaidu'}
					target={'_blank'}
				>
					<IconButton
						aria-label="github"
					>
						<GithubIcon
						/>
					</IconButton>
				</Link>
			</div>
		</Drawer>
	);

	// ##################################################################
	function handleWindowWidthChange() {
		var windowWidth = window.innerWidth;
		var breakpointWidth = theme.breakpoints.values.md;
		var isSmallScreen = windowWidth < breakpointWidth;

		if (isSmallScreen && isPermanent) {
			setPermanent(false);
		} else if (!isSmallScreen && !isPermanent) {
			setPermanent(true);
		}
	}
}

export default withRouter(Sidebar);
