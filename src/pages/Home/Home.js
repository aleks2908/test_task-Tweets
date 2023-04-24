import css from "./Home.module.css";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";

export default function Home() {
  return (
    <>
      <Header>
        <Link className={css.navLink} to="/tweets">
          Tweets
        </Link>
      </Header>
      <main>
        <h1 className={css.title}>Welcome to our application!</h1>
        <p className={css.greeteng}>
          It will help you keep track your favorite bloggers.
        </p>
      </main>
    </>
  );
}
