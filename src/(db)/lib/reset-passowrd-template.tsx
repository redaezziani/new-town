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

interface ResetPasswordTemplateProps {
  name: string;
  email: string;
  secret : string;
}

export const ResetPasswordTemplate: React.FC<Readonly<ResetPasswordTemplateProps>> = ({
  name,
  email,
  secret,
}) => (
  <Html lang="en">
    <Tailwind>
      <Head></Head>
      <Body>
        <Container>
          <Section>
            <Heading className="text-2xl text-[#00db80] font-bold">
              Reset your password
            </Heading>
            <Text className="text-gray-800 font-semibold">
              Hi {name}, <br />
            </Text>
            <Text>
              We have received a request to reset your password. To proceed with the password reset, please click the link below:
            </Text>
            <Link
              href={`http://localhost:3000/auth/reset-password/${secret}`}
              target="_blank"
            >
              Reset your password: {email}
            </Link>
            <Hr />
            <Text>
              If you did not request a password reset, please ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
