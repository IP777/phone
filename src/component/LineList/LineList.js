import style from "./LineList.module.sass";

export default function LineList(params) {
	return (
		<ul className={style.line_list}>
			<li className={style.isActive}>1 Линия</li>
			<li>2 Линия</li>
			<li>3 Линия</li>
			<li>4 Линия</li>
		</ul>
	);
}
