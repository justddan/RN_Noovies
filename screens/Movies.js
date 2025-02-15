import React from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? "red" : "black")};
  background-color: ${({ theme }) => theme.mainBgColor};
`;

const Header = styled.View``;

const Column = styled.View``;
const Footer = styled.View``;

const Movies = ({ navigation: { navigate } }) => {
  return (
    <Header>
      <Column>
        <TouchableOpacity
          onPress={() => navigate("Stack", { screen: "ScreenOne" })}
        >
          <Title selected={true}>Movies</Title>
        </TouchableOpacity>
      </Column>
      <Footer></Footer>
    </Header>
  );
};

export default Movies;
