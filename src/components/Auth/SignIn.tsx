"use client";
import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import Image from "next/image";
import { useLoginMutation } from "../../../global/api/authApi";
import axios from "axios";
import { createSession } from "@/lib/session";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LogIn: React.FC = () => {
  const router = useRouter()
  const [LogIn] = useLoginMutation();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      LogIn(values).then((value) => {
        createSession(value.data.token.accessToken);
        axios.defaults.headers.common['auth'] = `Bearer ${value.data.token.accessToken}`;
        localStorage.setItem('auth',value.data.token.accessToken)
        let token = localStorage.getItem('auth')
        console.log(token);
        toast.success(`Welcome ${values.userName}`);
        router.push('/')      
      });

    },
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-6 py-4 text-center">
            <Link href="/">
              <Image
                src="/images/logos/logo.png"
                width={100}
                height={100}
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="w-full px-6 py-4 xl:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="text-gray-700 mb-2 block text-sm font-bold"
                htmlFor="userName"
              >
                Username
              </label>
              <input
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                id="userName"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                value={values.userName}
              />
            </div>
            <div className="mb-6">
              <label
                className="text-gray-700 mb-2 block text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="text-gray-700 focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="******************"
                onChange={handleChange}
                value={values.password}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
