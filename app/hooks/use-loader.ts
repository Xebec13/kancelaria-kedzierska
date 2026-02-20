"use client";

import { useState, useEffect } from "react";

export const useLoader = () => {
  const [loading, setLoading] = useState(true);

  const finishLoading = () => setLoading(false);

  return { loading, finishLoading };
};