'use server';
import db from "@/(db)/secrets";
import { NextResponse, NextRequest } from "next/server";
import { Resend } from 'resend';

export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const usersWithProducts = await db.users.findMany({
            include: {
                products: {
                    where: {
                        OrderItem: {
                            some: {
                                quantity: {
                                    gt: 0
                                }
                            }
                        }
                    },
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        currency: true,
                        image: true,
                        stock: true,
                    },
                },
            },
        });

        for (const user of usersWithProducts) {
            if (user.products.length > 0) {
                const { data, error } = await resend.emails.send({
                    to: user.email, // Assuming there's an email field in the user object
                    from: 'zunder@dimach9.online',
                    subject: 'Products Report',
                    text: 'Here is your products report: ' + JSON.stringify(user.products),
                });
                
                if (error) {
                    console.error(`Error sending email to ${user.email}:`, error);
                } else {
                    console.log(`Email sent successfully to ${user.email}`);
                }
            } else {
                console.log(`No products to send to ${user.email}`);
            }
        }

        return Response.json({ status: 'success', message: 'Emails sent successfully for users with products' });
    } catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
