"use client";
import React, { useEffect } from "react";
import Events from "./Events";
import Characters from "./Characters";
import Places from "./Places";
import Questions from "./Questions";

const Book = () => {
  return (
    <div>
      <h1>book Reader</h1>
      <Characters />
      <Places />
      <Events />
      <Questions />
    </div>
  );
};

export default Book;
