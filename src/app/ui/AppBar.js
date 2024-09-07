"use client";
import { CgTerrain } from "react-icons/cg";
import { useState } from "react";

const AppBar = () => {
  return (
    <div className="ml-2 flex w-full items-center rounded-bl-[40px] bg-base-100 p-4">
      <div className="size-16 overflow-visible rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <CgTerrain className="size-full text-base-100" />
      </div>
      <h1 className="font-sans-serif ml-2 flex items-center text-2xl font-bold text-primary-content">
        Terrapps
      </h1>
    </div>
  );
};

export default AppBar;
