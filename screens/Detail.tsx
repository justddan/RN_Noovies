import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";

const Container = styled.ScrollView`
  background-color: ${(props: any) => props.theme.mainBgColor};
`;

const Detail = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}) => {
  useEffect(() => {
    setOptions({
      title: originalTitle,
    });
  }, []);
  return (
    <Container>
      <Text>{originalTitle}</Text>
    </Container>
  );
};

export default Detail;
