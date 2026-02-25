"use client";

import { useState,} from "react";

export const useLoader = () => {
  const [loading, setLoading] = useState(true);

  const finishLoading = () => setLoading(false);

  return { loading, finishLoading };
};