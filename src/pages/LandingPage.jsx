import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Wrapper, Content } from "../styledComponents/NologinComponents";

export const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Wrapper>
      <Content>
        <Header data-aos="fade-up">Welcome to Movie Mates</Header>
        <Description data-aos="fade-up" data-aos-delay="200">
          The best website to find friends based on shared movie interests and
          their ratings.
        </Description>
      </Content>
    </Wrapper>
  );
};

const Header = styled.h1`
  color: #fff;
  font-size: 3.5rem;
  margin: 0;
`;

const Description = styled.h2`
  color: #d1c4c4;
  font-size: 1.5rem;
`;
