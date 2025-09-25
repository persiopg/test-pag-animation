"use client";

import { useEffect } from "react";

function BootstrapClient() {
  useEffect(() => {
    // Carrega Bootstrap JS apenas no client sem usar require proibido pelo lint
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => {
      // Falha silenciosa: não crítico para renderização básica
    });
  }, []);

  return null;
}

export default BootstrapClient;