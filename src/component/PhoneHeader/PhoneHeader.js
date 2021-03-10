import style from "./PhoneHeader.module.css";

export default function PhoneHeader(params) {
	return (
		<div className={style.header}>
			<div className={style.statusDot} />
			Name
			<div>
				<input type="button" value="\/" />
				<input type="button" value="X" />
			</div>
		</div>
	);
}
