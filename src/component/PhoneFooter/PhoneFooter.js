import style from "./PhoneFooter.module.sass";

export default function PhoneFooter(params) {
	return (
		<div className={style.footer_wrapper}>
			<ul className={style.footer_list}>
				<li className={style.active}>Набор</li>
				<li>Последние</li>
				<li>Контакты</li>
			</ul>
		</div>
	);
}
