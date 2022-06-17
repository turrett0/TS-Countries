import React from "react";
import {useState, useEffect} from "react";
import {IoMoon, IoMoonOutline} from "react-icons/io5";
import styled from "styled-components";
import {Theme} from "../types";
import {Container} from "./Container";
import {Link} from "react-router-dom";

const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: var(--color-ui-base);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;
const Title = styled(Link).attrs({
  to: "/",
})`
  color: var(--color-text);
  font-size: var(--fs-sm);
  text-decoration: none;
  font-weight: var(--fw-bold);
`;

const ModeSwitcher = styled.div`
  color: var(--color-text);
  font-weight: var(--fw-light);
  cursor: pointer;
  text-transform: capitalize;
`;

const Header = () => {
  const [theme, setTheme] = useState<keyof Theme>("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  });
  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title>Where is the world?</Title>
          <ModeSwitcher onClick={toggleTheme}>
            {theme === "light" ? (
              <IoMoonOutline size={"14px"} />
            ) : (
              <IoMoon size={"14px"} />
            )}

            <span
              style={{
                marginLeft: "0.75rem",
              }}
            >
              {theme} Theme
            </span>
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};

export default Header;
