import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import React from "react";


interface EmailTemplateProps {
  firstName: string;
  token: string;
  email: string;
  id: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  token,
  email,
  id,
}) => (
  <Html lang="en">
      <Tailwind >
    <Head>
    </Head>
    <Body>
      <Container>
        <Section>
         
          <Heading
          className="text-2xl text-[#00db80] font-bold "
          >Verify your email address</Heading>
          <Text
          className=" text-gray-800 font-semibold"
          >
            Hi {firstName}, <br /> 
          </Text>
          <Text>
            Thanks for signing up for our service. We're excited to have you on board. Before you can start using our service, please verify your email address by clicking the link below:
          </Text>
          <Link href={`http://localhost:3000/auth/verefication/${id}`} target="_blank">
              Verify your email address
            </Link>
          <Hr />
          <Text>
            If you have any questions, please don't hesitate to contact us.
          </Text>
          <Text className="w-full flex bg-[#00db80] justify-center text-white font-bold text-2xl items-center px-3 py-2 h-14">
            {token}
          </Text>
        </Section>
      </Container>
    </Body>
    </Tailwind>
  </Html>
);
