import { css } from "styled-components";

export const breakpoints = {
  small: "@media (max-width: 599px)",
  medium: "@media (min-width: 600px) and (max-width: 1023px)",
  large: "@media (min-width: 1024px)",
};

const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (first, ...interpolations) => css`
      ${value} {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {});

export default media;
