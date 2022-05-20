import React, { useEffect, useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Menu,
	Typography,
} from "@material-ui/core";
import {
	Menu as MenuIcon,
	Person as AccountIcon,
	Close as CloseIcon,
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";


export default function Header(props) {
	var classes = useStyles();

	// global
	var layoutState = useLayoutState();
	var layoutDispatch = useLayoutDispatch();
	var userDispatch = useUserDispatch();

	// local
	var [userName, setUserName] = useState(null);
	var [profileMenu, setProfileMenu] = useState(null);

	useEffect(() => {
		setUserName(localStorage.getItem('id_token'));
	}, [])
	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					color="inherit"
					onClick={() => toggleSidebar(layoutDispatch)}
					className={classNames(
						classes.headerMenuButtonSandwich,
						classes.headerMenuButtonCollapse,
					)}
				>
					{layoutState.isSidebarOpened ? (
						<CloseIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse,
								),
							}}
						/>
					) : (
						<MenuIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse,
								),
							}}
						/>
					)}
				</IconButton>
				<Typography variant="h6" weight="medium" className={classes.logotype}>
					Student Data Monitoring
				</Typography>
				<div className={classes.grow} />
				<IconButton
					aria-haspopup="true"
					color="inherit"
					className={classes.headerMenuButton}
					aria-controls="profile-menu"
					onClick={e => setProfileMenu(e.currentTarget)}
				>
					<AccountIcon classes={{ root: classes.headerIcon }} />
				</IconButton>
				<Menu
					id="profile-menu"
					open={Boolean(profileMenu)}
					anchorEl={profileMenu}
					onClose={() => setProfileMenu(null)}
					className={classes.headerMenu}
					classes={{ paper: classes.profileMenu }}
					disableAutoFocusItem
				>
					<div className={classes.profileMenuUser}>
						<Typography variant="h4" weight="medium">
							{userName && userName.slice(1, -1)}
						</Typography>
					</div>
					<div className={classes.profileMenuUser}>
						<Typography
							className={classes.profileMenuLink}
							color="primary"
							onClick={() => signOut(userDispatch, props.history)}
						>
							Sign Out
						</Typography>
					</div>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
