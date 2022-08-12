import { Flex, FlexProps, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import { FC } from "react";

export const Container: FC<FlexProps> = ({ title, ...props }) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "black", dark: "white" };

  const color = { light: "black", dark: "white" };

  return (
    <>
      <Head>
        <title>Zero Company</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex
        flexDirection={"column"}
        align={"center"}
        justify={"flex-start"}
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        {...props}
      />
    </>
  );
};
