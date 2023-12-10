import image from "../../assets/logo-color.png";
import styles from "./style.module.css";

import { Grid, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <Grid
      display={"flex"}
      justifyContent={"center"}
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
            <Typography
              component="h1"
              variant="h6"
              margin={1}
              sx={{
                fontSize: 15,
              }}
            >
              Support
            </Typography>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Help Center
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              FAQ
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              AirCover
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Disability support
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Cancellation options
            </Link>
          </Grid>
          <Grid item display={"flex"} flexDirection={"column"}>
            <Typography
              component="h1"
              variant="h6"
              margin={1}
              sx={{
                fontSize: 15,
              }}
            >
              Hosting
            </Typography>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Hosting resources
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Community forum
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Hosting responsibly
            </Link>
          </Grid>

          <Grid item display={"flex"} flexDirection={"column"}>
            <Typography
              component="h1"
              variant="h6"
              margin={1}
              sx={{
                fontSize: 15,
              }}
            >
              Holidaze
            </Typography>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Newsroom
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              New features
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Careers
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Investors
            </Link>
            <Link
              href="#"
              color="inherit"
              margin={1}
              sx={{
                fontSize: 13,
              }}
            >
              Gift cards
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"}>
          <Grid item display={"flex"} flexDirection={"column"}>
            <Typography
              component="h1"
              variant="h6"
              margin={1}
              sx={{
                fontSize: 15,
              }}
            >
              &copy; Holidaze, inc.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
