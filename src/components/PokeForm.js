import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../css/PokeForm.css';

// input fields for form
const MyInput = React.forwardRef(({ name, type, label, ...rest }, ref) => {
	return (
		<div className='input'>
			<label htmlFor={name}>{label}</label>
			<input type={type} name={name} {...rest} ref={ref} />
		</div>
	);
});

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// error schema for form input values
const errorSchema = yup
	.object({
		firstName: yup.string().required('You mus enter a first name'),
		lastName: yup.string().required('You must enter a last name'),
		phoneNumber: yup
			.string()
			.matches(phoneRegExp, 'Phone number is not valid'),
		address: yup.string().required('You must enter an address'),
	})
	.required();

const PokeForm = ({ setCookie, setStep, setStepCookie }) => {
	const [isSafeToReset, setIsSafeToReset] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(errorSchema),
	});

	// on form submit
	const onSubmitconsole = data => {
		let stringdata = JSON.stringify(data);
		setCookie('user', stringdata, { path: '/' });
		setStep(2);
		setStepCookie('step', 2, { path: '/' });

		setIsSafeToReset(true);
	};

	useEffect(() => {
		// redux-form recommends this step to clear form after submit
		if (!isSafeToReset) return;

		reset();
	}, [reset, isSafeToReset]);

	return (
		<div className='pokeform'>
			<h1>PokeForm!</h1>
			<form onSubmit={handleSubmit(onSubmitconsole)} className='form'>
				<fieldset>
					<MyInput
						name='firstName'
						label='First name: '
						{...register('firstName')}
						type='input'
					/>
					<p className='errors'>{errors.firstName?.message}</p>
				</fieldset>
				<fieldset>
					<MyInput
						name='lastName'
						label='Last name: '
						{...register('lastName')}
						type='input'
					/>
					<p className='errors'>{errors.lastName?.message}</p>
				</fieldset>

				<fieldset>
					<MyInput
						name='phoneNumber'
						label='Phone number: '
						{...register('phoneNumber')}
						type='input'
					/>
					<p className='errors'>{errors.phoneNumber?.message}</p>
				</fieldset>

				<fieldset>
					<MyInput
						name='address'
						label='Address: '
						{...register('address')}
						type='input'
					/>
					<p className='errors'>{errors.address?.message}</p>
				</fieldset>

				<div className='buttonBoxForm'>
					<button className='btn'>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default PokeForm;
