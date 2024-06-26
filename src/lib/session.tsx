"use server";
import { cookies } from "next/headers";

export const createSession= (token:string)=>{
    cookies().set('auth', token);
}


export const deleteSession= ()=>{
    cookies().delete('auth');
}
