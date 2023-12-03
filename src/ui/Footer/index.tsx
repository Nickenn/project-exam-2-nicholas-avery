import image from "../../assets/logo-color.png";
import styles from "./style.module.css";

import { Grid, Link } from "@mui/material";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <img src={image} alt="Holidaze logo" className={styles.logo} />
      </Link>
      <div>
        <p>&copy; Holidaze, inc.</p>
      </div>
      <Grid container>
        <Grid container display={"flex"} flexDirection={"column"}>
          <Grid item>
            <p>Support</p>
            <Link href="#">Help Center</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">AirCover</Link>
            <Link href="#">Disability support</Link>
            <Link href="#">Cancellation options</Link>
          </Grid>
        </Grid>
        <Grid item>
          <p>Hosting</p>
          <Link href="#">Hosting resources</Link>
          <Link href="#">Community forum</Link>
          <Link href="#">Hosting responsibly</Link>
        </Grid>

        <Grid item>
          <p>Holidaze</p>
          <a href="#">Newsroom</a>
          <a href="#">New features</a>
          <a href="#">Careers</a>
          <a href="#">Investors</a>
          <a href="#">Gift cards</a>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
