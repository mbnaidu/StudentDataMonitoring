import React from "react";
import {
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";
import { toggleSidebar, useLayoutDispatch, useLayoutState } from "../../../../context/LayoutContext";

export default function SidebarLink({
	link,
	icon,
	label,
	children,
	location,
	isSidebarOpened,
	nested,
	type,
}) {
	var classes = useStyles();
	var layoutState = useLayoutState();
	var layoutDispatch = useLayoutDispatch();

	var isLinkActive =
		link &&
		(location.pathname === link || location.pathname.indexOf(link) !== -1);
	if (type === "divider") return <Divider className={classes.divider} />;
	if (!children)
		return (
			<ListItem
				button
				onClick={() => layoutState.isSidebarOpened && toggleSidebar(layoutDispatch)}
				component={link && Link}
				to={link}
				className={classes.link}
				classes={{
					root: classnames(classes.linkRoot, {
						[classes.linkActive]: isLinkActive && !nested,
						[classes.linkNested]: nested,
					}),
				}}
				disableRipple
			>
				<ListItemIcon
					className={classnames(classes.linkIcon, {
						[classes.linkIconActive]: isLinkActive,
					})}
				>
					{icon}
				</ListItemIcon>
				<ListItemText
					classes={{
						primary: classnames(classes.linkText, {
							[classes.linkTextActive]: isLinkActive,
							[classes.linkTextHidden]: !isSidebarOpened,
						}),
					}}
					primary={label}
				/>
			</ListItem>
		);
}
