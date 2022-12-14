import React from 'react';
import '../css/NavBar.css';

const NavBar = ({
	cookies,
	removeCookie,
	removeChosenPokemon,
	removeStepCookie,
	setStep,
	setStepCookie,
	step,
}) => {
	let logged = cookies.user;

	const signOut = () => {
		// removes all cookies
		removeCookie('user', { path: '/' });
		removeChosenPokemon('pokemon', { path: '/' });
		removeStepCookie('step', { path: '/' });
		setStep(1);
		removeStepCookie('params', { path: '/' });
	};

	const bookMark = () => {
		setStepCookie(step);
	};

	return (
		<div className='navBar'>
			<nav onClick={signOut}>
				{logged ? <span>Restart</span> : <span>Sign Up</span>}
			</nav>
			<nav onClick={bookMark}>
				{logged ? <span>Save Progress</span> : null}
			</nav>
		</div>
	);
};

export default React.memo(NavBar);
