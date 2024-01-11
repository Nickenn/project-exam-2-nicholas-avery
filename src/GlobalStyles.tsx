import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --color-brand-50:#FF385C;
    --color-brand-100:#E00B41;
    --color-brand-200:#92174D;
    --color-brand-300:460479;


    --color-gray-0:#FFFFFF;
    --color-gray-50:#F7F6F2;
    --color-gray-100:#FFF8F6;
    --color-gray-200:#F7F7F7;
    --color-gray-300:#F5F1EA;
    --color-gray-400:#EBEBEB;
    --color-gray-500:#DDDDDD;
    --color-gray-600:#B0B0B0;
    --color-gray-700:#717171;
    --color-gray-800:#222222;
    --color-gray-900:#000000;

    --font-family: "Roboto", sans-serif;

    --border:1px solid var(--color-gray-500);

    --border-radius:8px;
    --border-radius-lg:40px;

    --border-radius:6px;
    --border-radius-lrg: 25px;


}


body {
    min-height: 100vh;
    font-family: var(--font-family);
    color: var(--color-gray-800);
    background: var(--color-gray-0);
}

main {
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
