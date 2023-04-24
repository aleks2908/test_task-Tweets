import css from "./Card.module.css";
import logo from "../images/Logo.png";
import picture from "../images/picture2.png";

export const Card = ({ user, onCardChange }) => {
  const { avatar, followers, tweets, id, active } = user;

  return (
    <article className={css.card}>
      <img className={css.cardBackground} src={picture} alt="background" />
      <img className={css.logo} src={logo} alt="card logo" />
      <div className={css.userWrapper}>
        <div className={css.line}></div>
        <div className={css.userBlock}>
          <div className={css.userBlockBorder} />
          <img className={css.userAvatar} src={avatar} alt="user avatar" />
        </div>
      </div>
      <p className={css.counter}>{tweets} tweets</p>
      <p className={css.counter}>
        {new Intl.NumberFormat("en-En").format(followers)} Followers
      </p>

      <button
        className={`${css.button} ${css[active]}`}
        type="button"
        onClick={() => onCardChange(id, followers, active)}
      >
        {active === "active" ? "Following" : "Follow"}
      </button>
    </article>
  );
};
