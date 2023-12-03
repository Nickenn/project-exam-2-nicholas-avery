import image from "../../assets/logo-color.png";
import styles from "./style.module.css";

import { Grid, Link } from "@mui/material";

function Footer() {
  return (
    <Grid
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      bgcolor={"#e9b384"}
    >
      <Grid container>
        <Grid
          container
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Grid item>
            <Link href="/">
              <img src={image} alt="Holidaze logo" className={styles.logo} />
            </Link>
          </Grid>
          <Grid item display={"flex"} flexDirection={"column"}>
            <p>Support</p>
            <Link href="#">Help Center</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">AirCover</Link>
            <Link href="#">Disability support</Link>
            <Link href="#">Cancellation options</Link>
          </Grid>
          <Grid item display={"flex"} flexDirection={"column"}>
            <p>Hosting</p>
            <Link href="#">Hosting resources</Link>
            <Link href="#">Community forum</Link>
            <Link href="#">Hosting responsibly</Link>
          </Grid>

          <Grid item display={"flex"} flexDirection={"column"}>
            <p>Holidaze</p>
            <a href="#">Newsroom</a>
            <a href="#">New features</a>
            <a href="#">Careers</a>
            <a href="#">Investors</a>
            <a href="#">Gift cards</a>
          </Grid>
        </Grid>
        <Grid item display={"flex"} flexDirection={"column"}>
          <p>&copy; Holidaze, inc.</p>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
