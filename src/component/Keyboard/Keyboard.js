import style from "./Keyboard.module.sass";

export default function Keyboard({ pressKey, phoneNumber }) {
	const handlerOnClick = (e) => {
		pressKey(e.target.value);
	};
	const handlerOnDoubleClick = () => {
		pressKey(0);
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
					onClick={handlerOnClick}
					onDoubleClick={handlerOnDoubleClick}
				>
					<span>0</span>
					<span>+</span>
				</div>
			</li>
			<li>
				<input type="button" value="#" onClick={handlerOnDoubleClick} />
			</li>
		</ul>
	);
}
