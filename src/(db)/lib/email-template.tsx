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
      <Container
      className="bg-gray-100 w-full h-full flex justify-center items-center"
      >
        <Section
        className="bg-white w-full h-full flex flex-col justify-center items-center gap-4 p-4 shadow-lg rounded-lg"
        >
         
         <img src="https://i.pinimg.com/originals/0a/52/21/0a52215b663fbdf4781950b18b9473d7.png" alt="logo" className=' w-14 aspect-auto h-auto' />
          <Heading
          className="text-3xl flex justify-start items-start gap-2 text-slate-700 font-bold "
          >
            Verefiy your Squid account
          </Heading>
          <Text
          className=" text-gray-700  font-semibold"
          >
            Hi {firstName}
          </Text>
          <Text>
            Thanks for signing up for our service. We're excited to have you on board. Before you can start using our service, please verify your email address by clicking the link below:
          </Text>
          <Text className="w-full flex bg-blue-300 justify-center text-center text-white font-bold text-2xl items-center px-3 py-2 h-14">
            {token}
          </Text>
          <Link href={`http://localhost:3000/auth/verefication/${id}`} target="_blank">
              Verify your email address
            </Link>
          <Hr />
          <Text>
            If you have any questions, please don't hesitate to contact us.
          </Text>
        </Section>
      </Container>
    </Body>
    </Tailwind>
  </Html>
);
