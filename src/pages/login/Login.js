import React, { useState } from "react";
import {
	Grid,
	CircularProgress,
	Typography,
	Button,
	Tabs,
	Tab,
	TextField,
	Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import GoogleLogin from "react-google-login";
import { socialIcons } from "../../Globals/Globals";

function Login(props) {
	var classes = useStyles();

	// global
	var userDispatch = useUserDispatch();

	// local
	var [isLoading, setIsLoading] = useState(false);
	var [error, setError] = useState(null);
	var [activeTabId, setActiveTabId] = useState(0);
	var [nameValue, setNameValue] = useState("");
	var [loginValue, setLoginValue] = useState('');
	var [passwordValue, setPasswordValue] = useState('');

	const handleGoogleSuccessResponse = async (googleData) => {
		var email = JSON.stringify(googleData['profileObj'].email)
		var password = 12345678
		loginUser(
			userDispatch,
			email,
			password,
			props.history,
			setIsLoading,
			setError,
		)
	}
	const handleGoogleFailureResponse = async (googleData) => {
		console.log('-----------', JSON.stringify(googleData));
	}
	return (
		<Grid container className={classes.container}>
			<div className={classes.formContainer}>
				<div className={classes.form}>
					<Tabs
						value={activeTabId}
						onChange={(e, id) => setActiveTabId(id)}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="Login" classes={{ root: classes.tab }} />
						<Tab label="New User" classes={{ root: classes.tab }} />
					</Tabs>
					{activeTabId === 0 && (
						<React.Fragment>
							<GoogleLogin
								render={renderProps => (
									<Button size="large" onClick={renderProps.onClick} disabled={renderProps.disabled} className={classes.googleButton}>
										<img src={google} alt="google" className={classes.googleIcon} />
										&nbsp;Sign in with Google
									</Button>
								)}
								buttonText="Login"
								onSuccess={handleGoogleSuccessResponse}
								onFailure={handleGoogleFailureResponse}
								clientId="472472243625-v0ap7jnko2e6d21qpu1s6a05o6u4qlkj.apps.googleusercontent.com"
								cookiePolicy={'single_host_origin'}
							/>
							<div className={classes.formDividerContainer}>
								<div className={classes.formDivider} />
								<Typography className={classes.formDividerWord}>or</Typography>
								<div className={classes.formDivider} />
							</div>
							<Fade in={error}>
								<Typography color="secondary" className={classes.errorMessage}>
									Something is wrong with your login or password :(
								</Typography>
							</Fade>
							<TextField
								id="email"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={loginValue}
								onChange={e => setLoginValue(e.target.value)}
								margin="normal"
								placeholder="Email Address"
								type="email"
								fullWidth
							/>
							<TextField
								id="password"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={passwordValue}
								onChange={e => setPasswordValue(e.target.value)}
								margin="normal"
								placeholder="Password"
								type="password"
								fullWidth
							/>
							<div className={classes.formButtons}>
								{isLoading ? (
									<CircularProgress size={26} className={classes.loginLoader} />
								) : (
									<Button
										disabled={
											loginValue.length === 0 || passwordValue.length === 0
										}
										onClick={() =>
											loginUser(
												userDispatch,
												loginValue,
												passwordValue,
												props.history,
												setIsLoading,
												setError,
											)
										}
										variant="contained"
										color="primary"
										size="large"
									>
										Login
									</Button>
								)}
								<Button
									color="primary"
									size="large"
									className={classes.forgetButton}
								>
									Forget Password
								</Button>
							</div>
						</React.Fragment>
					)}
					{activeTabId === 1 && (
						<React.Fragment>
							<Typography variant="h1" className={classes.greeting}>
								Welcome!
							</Typography>
							<Typography variant="h2" className={classes.subGreeting}>
								Create your account
							</Typography>
							<Fade in={error}>
								<Typography color="secondary" className={classes.errorMessage}>
									Something is wrong with your login or password :(
								</Typography>
							</Fade>
							<TextField
								id="name"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={nameValue}
								onChange={e => setNameValue(e.target.value)}
								margin="normal"
								placeholder="Full Name"
								type="text"
								fullWidth
							/>
							<TextField
								id="email"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={loginValue}
								onChange={e => setLoginValue(e.target.value)}
								margin="normal"
								placeholder="Email Address"
								type="email"
								fullWidth
							/>
							<TextField
								id="password"
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={passwordValue}
								onChange={e => setPasswordValue(e.target.value)}
								margin="normal"
								placeholder="Password"
								type="password"
								fullWidth
							/>
							<div className={classes.creatingButtonContainer}>
								{isLoading ? (
									<CircularProgress size={26} />
								) : (
									<Button
										onClick={() =>
											loginUser(
												userDispatch,
												loginValue,
												passwordValue,
												props.history,
												setIsLoading,
												setError,
											)
										}
										disabled={
											loginValue.length === 0 ||
											passwordValue.length === 0 ||
											nameValue.length === 0
										}
										size="large"
										variant="contained"
										color="primary"
										fullWidth
										className={classes.createAccountButton}
									>
										Create your account
									</Button>
								)}
							</div>
							<div className={classes.formDividerContainer}>
								<div className={classes.formDivider} />
								<Typography className={classes.formDividerWord}>or</Typography>
								<div className={classes.formDivider} />
							</div>
							<GoogleLogin
								render={renderProps => (
									<Button size="large" onClick={renderProps.onClick} disabled={renderProps.disabled} className={classes.googleButton}>
										<img src={google} alt="google" className={classes.googleIcon} />
										&nbsp;Sign up with Google
									</Button>
								)}
								buttonText="Login"
								onSuccess={handleGoogleSuccessResponse}
								onFailure={handleGoogleFailureResponse}
								clientId="472472243625-v0ap7jnko2e6d21qpu1s6a05o6u4qlkj.apps.googleusercontent.com"
								cookiePolicy={'single_host_origin'}
							/>
						</React.Fragment>
					)}
				</div>
				<Typography color="primary" className={classes.copyright}>
					<div>{socialIcons('icon')}</div>
				</Typography>
			</div>
		</Grid>
	);
}

export default withRouter(Login);
