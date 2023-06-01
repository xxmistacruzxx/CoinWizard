import { Card, Row, Col, Text, Button } from "@nextui-org/react";

export default function AboutCard({
  title1,
  title2,
  backgroundImage,
  buttonText,
  buttonLink,
}) {
  return (
    <Card isHoverable css={{ w: "200px", h: "300px", margin: "10px" }}>
      <Card.Header
        css={{
          position: "absolute",
          zIndex: 1,
          top: -1,
        }}
      >
        <Col>
          <Text
            style={{ marginBottom: "0px" }}
            size={12}
            weight="bold"
            transform="uppercase"
            color="#ffffffAA"
          >
            {title1}
          </Text>
          <Text
            style={{ marginTop: "2px", marginBottom: "0px" }}
            h3
            color="white"
          >
            {title2}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={backgroundImage}
          width="100%"
          height="100%"
          objectFit="cover"
          alt={`${title1} Background`}
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <a
          href={`${buttonLink}`}
          title={`${title2}`}
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: "none", width: "100%", marginRight: "24px" }}
        >
          <Button
            style={{
              backgroundColor: "rgba(255,255,255,.5)",
              width: "100%",
            }}
            flat
            auto
            rounded
          >
            <Text
              css={{ color: "black" }}
              size={12}
              weight="bold"
              transform="uppercase"
            >
              {buttonText}
            </Text>
          </Button>
        </a>
      </Card.Footer>
    </Card>
  );
}
