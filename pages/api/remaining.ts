import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../utils/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { auth } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';

export async function GET(res: any) {
  const {userId} = auth();

  // Check if user is logged in
  if(!userId){
    return res.status(500).json("Login to upload.");
  }
  const user = await currentUser();

  // Query the redis database by email to get the number of generations left
  const identifier = user?.primaryEmailAddressId;
  const windowDuration = 24 * 60 * 60 * 1000;
  const bucket = Math.floor(Date.now() / windowDuration);

  const usedGenerations =
    (await redis?.get(`@upstash/ratelimit:${identifier!}:${bucket}`)) || 0;

  // it can return null and it also returns the number of generations the user has done, not the number they have left

  // TODO: Move this using date-fns on the client-side
  const resetDate = new Date();
  resetDate.setHours(19, 0, 0, 0);
  const diff = Math.abs(resetDate.getTime() - new Date().getTime());
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60) - hours * 60;

  const remainingGenerations = 5 - Number(usedGenerations);

  return res.status(200).json({ remainingGenerations, hours, minutes });
}
