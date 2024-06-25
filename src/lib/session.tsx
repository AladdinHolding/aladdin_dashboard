"use server";
import { SignJWT, jwtVerify } from "jose"
import { cookies, headers } from "next/headers";

export const createSession= (token:string)=>{
    cookies().set('auth', token);
}
