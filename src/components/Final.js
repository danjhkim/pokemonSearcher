import { useState } from 'react';
import '../css/Final.css';

const Final = ({ chosenPokemon, cookies }) => {
	const [saving, setSaving] = useState(false);
	let user = cookies.user;
	let pokemon = chosenPokemon.pokemon;

	const saveAll = () => {
		setSaving(true);
		setTimeout(() => {
			setSaving(false);
			// potentially save info to backend database
			alert('Your info has been saved!');
		}, 1000);
	};
	return (
		<div className='finalBorder'>
			<h1>Hi {user.firstName}, Is everything correct?</h1>
			<h3>Address: {user.address}</h3>
			<h3>Phone Number: {user.phoneNumber}</h3>
			<h3>Address: {user.address}</h3>
			<h3>Chosen Pokemon: {pokemon}</h3>
			<div className='buttonBoxForm'>
				<button
					className={saving ? 'btn2 saving' : 'btn2'}
					onClick={saveAll}>
					{saving ? 'Saving..' : 'Finalize'}
				</button>
			</div>
		</div>
	);
};

export default Final;
