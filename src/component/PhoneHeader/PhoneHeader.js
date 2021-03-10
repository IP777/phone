import "./PhoneHeader.sass";
import angle_down_img_src from "../../assets/image/angle-down.svg";
import x_btn_img_src from "../../assets/image/x-btn.svg";

export default function PhoneHeader({ name }) {
    return (
        <div className="header">
            <div className="statusDot status_dot_active" />
            <span>{name}</span>
            <div>
                <img className="drop_dawn" src={angle_down_img_src} alt="\/" />
                <img className="close_btn" src={x_btn_img_src} alt="x" />
            </div>
        </div>
    );
}
