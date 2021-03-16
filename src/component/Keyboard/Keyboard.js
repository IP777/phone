import style from "./Keyboard.module.sass";

export default function Keyboard({ pressKey, phoneNumber }) {
	const handlerOnClick = (e) => {
		pressKey(e.target.value);
	};
	const handelNullClick = () => {
		pressKey([0]);
	};
	const handlerOnRightClick = (e) => {
		e.preventDefault();

		if (phoneNumber.length === 0) {
			pressKey(["+", "3", "8", "0"]);
		} else {
			pressKey("+");
		}
	};

	return (
		<ul className={style.callBtn}>
			<li>
				<input type="button" value="1" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="2" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="3" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="4" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="5" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="6" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="7" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="8" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="9" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="*" onClick={handlerOnClick} />
			</li>
			<li>
				<div
					onClick={handelNullClick}
					onContextMenu={handlerOnRightClick}
					value="0"
				>
					<span>0</span>
					<span>+</span>
				</div>
			</li>
			<li>
				<input type="button" value="#" onClick={handlerOnClick} />
			</li>
		</ul>
	);
}
