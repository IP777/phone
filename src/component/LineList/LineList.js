import style from "./LineList.module.css";

export default function LineList(params) {
	return (
		<ul className={style.line}>
			<li>1 Line</li>
			<li>2 Line</li>
			<li>3 Line</li>
			<li>4 Line</li>
		</ul>
	);
}
