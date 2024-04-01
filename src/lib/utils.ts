import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { secret } from "@/(db)/secrets";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const proxyConfig = async () => {
  const usename = secret.secret_user_name_scraper?? 'username';
  const password = secret.secret_password_scraper?? 'password';
  const port = parseInt(secret.secret_port_scraper?? '22225');
  const session_id = (Math.random() * 1000000).toFixed(0);
  const options = {
      auth: {
          username: `${usename}-session-${session_id}`,
          password: password
      },
      host: 'brd.superproxy.io',
      port: port,
      rejectUnauthorized: false,
  };
  return options;
};