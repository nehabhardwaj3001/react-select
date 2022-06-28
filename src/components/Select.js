import React, { useRef, useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import './index.css';

const Select = ({ options }) => {

	const ref = useRef();
	const [search, setSearch] = useState("");
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

	const onHandleClick = () => {
		setText([])
	}

  const handleClick = (event, key) => {
    console.log(event.target);
    console.log('key index: ', key);
		console.log(text[key])
		text.splice(key, 1)
		setText(text)
  };

	const onEnter = (e) => {
		options.map((option) => {
			// if(option?.label.toLowerCase().includes(search.toLowerCase())) {
			// 	return option
			// }
		console.log(option)
			setText(text ? [...text, option?.label] : [option.label])
			setSearch("")
		})
	}

	return (
		<div ref={ref} className='ui form'>
			<div className='field'>
				<div
					onClick={() => setOpen(!open)}
					className='ui selection visible active'
				>
					<div className='container'>
						<div className='input-text' >
							{
								text?.map((item, key) => {
									return (
										<div className='box'>
											<div className='input-text'>
												<div className='text'>{item}</div>
												<div className='cross' onClick={event => handleClick(event, key)} key={key}> 
													<Icon name='close' size='small' color='grey'/> 
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
						<input
							className='input-field'
							type="text"
							placeholder="Search..."
							onChange={(e) => {
								setSearch(e.target.value)
								setOpen(true)
							}}
							onKeyDown = {(e) => {if(e.keyCode === 8) {
								text.pop()
								setOpen(!open)
							} else if(e.keyCode === 13) {
									onEnter(e)
							}
							}}
						/>
						{text.length === 0 ? <div></div> :
						<div> <Icon name='close' size='large' color='grey' onClick={onHandleClick} /> </div> }
						<div> <Icon name='angle down' size='large' color='grey' /> </div>
					</div>
				</div>
				{open ?
					<div className='items'>
						{text.length === options.length ?
							<div className='items'> No Options </div>
							:
							options
							.filter((option) => {
								if(option?.label.toLowerCase().includes(search.toLowerCase())) {
									return option
								}
							})
							.map((option) => {
								return (
									<div
										className='item'
										onClick={() => {
											setText(text ? [...text, option.label] : [option.label])
											setSearch('');
											setOpen(!open);
										}}
									>
										{
											text.includes(option.label) ? null : option.label
											// setSearch('')
										}
									</div>
								)
							})
						}
					</div> :
					<div></div>
				}
			</div>
		</div>
	)
}

export default Select; 