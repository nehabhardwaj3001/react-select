import React, { useRef, useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import './index.css';

const Select = ({ options }) => {

	const ref = useRef();
	const [text, setText] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onBodyClick = (event) => {
			if (ref.current.contains(event.target)) {
				return;
			}
			setOpen(false);
		}
		document.body.addEventListener('click', onBodyClick);
		return () => {
			document.body.removeEventListener('click', onBodyClick)
		};
	}, [])

	return (
		<div ref={ref} className='ui form'>
			<div className='field'>
				<div
					onClick={() => setOpen(!open)}
					className='ui selection visible active'
				>
					<div className='container'>
						<div className='input-text'>
							{
								text?.map((item) => {
									return <div className='text'>{item}</div>
								})
							}
						</div>
						<input
							type="text"
							placeholder="Search..."
						/>
						<div> <Icon name='close' size='large' color='grey' /> </div>
						<div> <Icon name='angle down' size='large' color='grey' /> </div>

					</div>
				</div>
				{
					open ?
						<div className='items'>
							{options.map((option) => {
								return (
									<div
										className='item'
										onClick={() => {
											setText(text ? [...text, option.label] : [option.label])
											setOpen(!open)
										}}
									>
										{
											text.includes(option.label) ? null : option.label
										}
									</div>
								)
							})}
						</div> :
						<div></div>
				}
			</div>
		</div>
	)
}

export default Select;