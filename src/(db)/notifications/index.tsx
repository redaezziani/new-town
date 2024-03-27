'use server';
import db from "@/(db)/secrets";
import { ActionType, NotificationType } from "@prisma/client";

/*

  id        String    @id @default(uuid()) @db.VarChar(36)
  title     String
  message   String
  type      NotificationType @default(INFO)
  action    ActionType @default(NONE)
  userId    String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  user      users     @relation(fields: [userId], references: [id])
*/
export interface Notification {
    title : string
    message : string
    type : NotificationType
    action : ActionType
    userId : string
}

export const CreateNotification = async (data: Notification) => {
  try {
    const res = await db.notification.create({
        data
    });
    if (!res) {
      throw new Error("Failed to create notification");
    }
    return res;
  } catch (error) {
    console.error(error);
  }
}


export const GetNotifications = async (userId: string) => {
  try {
    const res = await db.notification.findMany({
        where: {
            userId
        }
    });
    if (!res) {
      throw new Error("Failed to fetch notifications");
    }
    return res;
  } catch (error) {
    console.error(error);
  }
}


