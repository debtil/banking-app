'use server';

import { parseStringify } from "../utils";
import { createSessionClient, createAdminClient } from '@/lib/server/appwrite';
import { ID } from "node-appwrite";
import { cookies } from "next/headers";

export const signIn = async () => {
  try {

  } catch (error) {
    console.log(error);
  }
}

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData

  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true
    });

    return parseStringify(newUserAccount);

  } catch (error) {
    console.log(error);
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.log(error)
    return null;
  }
}