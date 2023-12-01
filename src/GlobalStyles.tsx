import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --color-brand-50:#FF385C;
    --color-brand-100:#E00B41;
    --color-brand-200:#92174D;
    --color-brand-300:460479;


    --color-gray-0:#FFFFFF;
    --color-gray-800:#222222;

    --font-family: "Roboto", sans-serif;

    --border:1px solid var(--color-gray-500);

    --border-radius:6px;
    --border-radius-lrg: 25px;


}

body {
    font-family: var(--font-family);
    color: var(--color-gray-800);
    background: var(--color-gray-0);
}

main {
    min-height: 100vh;
    font-size: 1.3rem;

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
