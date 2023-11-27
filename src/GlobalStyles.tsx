import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --color-brand-50:#FF385C;
    --color-brand-100:#E00B41;
    --color-brand-200:#92174D;
    --color-brand-300:460479;


    --color-gray-0:#FFFFFF;
    --color-gray-800:#222222;

    --font-family: "Nunito", sans-serif;

    --border:1px solid var(--color-gray-500);

    --border-radius:6px;
    --border-radius-lrg: 25px;

    --gradiant-right-1:linear-gradient(to right,#E61E4D 0%,#E31C5F 50%,#D70466 100%);
    --gradiant-left-1:linear-gradient(to left,#E61E4D 0%,#E31C5F 50%,#D70466 100%);

    --gradiant-right-2:linear-gradient(to right,#BD1E59 0%,#92174D 50%,#861453 100%);
    --gradiant-left-2:linear-gradient(to left,#BD1E59 0%,#92174D 50%,#861453 100%);

    --gradiant-right-3:linear-gradient(to right,#59086E 0%,#460479 50%,#440589 100%);
    --gradiant-left-3:linear-gradient(to left,#59086E 0%,#460479 50%,#440589 100%);


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
