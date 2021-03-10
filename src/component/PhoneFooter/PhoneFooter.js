import style from "./PhoneFooter.module.css";

export default function PhoneFooter(params) {
	return (
		<div className={style.footer}>
			<ul className={style.footer_list}>
				<li>Набор</li>
				<li>Последние</li>
				<li>Контакты</li>
			</ul>
		</div>
	);
}
