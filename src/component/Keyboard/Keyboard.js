import style from "./Keyboard.module.css";
import "./Keyboard.sass";

export default function Keyboard({ pressKey, phoneNumber }) {
	const handlerOnClick = (e) => {
		pressKey(e.target.value);
	};

	return (
		<ul className="callBtn">
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
				<input type="button" value="0" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="#" onClick={handlerOnClick} />
			</li>
		</ul>
	);
}
