import React from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${({ selected }: { selected: boolean }) =>
    selected ? "red" : "black"};
  background-color: ${({ theme }: { theme: any }) => theme.mainBgColor};
`;

const Header = styled.View``;

const Column = styled.View``;
const Footer = styled.View``;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation,
}) => {
  return (
    <Header>
      <Column>
        <TouchableOpacity
          onPress={() => navigation.navigate("Stack", { screen: "ScreenOne" })}
        >
          <Title selected={true}>Movies</Title>
        </TouchableOpacity>
      </Column>
      <Footer></Footer>
    </Header>
  );
};

export default Movies;
