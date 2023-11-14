import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --font-family: "Nunito", sans-serif;
}

body {
    font-family: var(--font-family);
}

main {
    min-height: 100vh;

}

a {
    color: inherit;
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
}

`;

export default GlobalStyles;
