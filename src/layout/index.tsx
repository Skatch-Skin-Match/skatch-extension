import type { NextPage } from "next";

import { LayoutErrorBoundary } from "./LayoutErrorBoundary";

export const Layout = (page: NextPage) => {
  return (
    <main>
      <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      {/* Loading Chrome scripts */}
      <script defer src="../content.js"></script>
      <script defer src="../background.js"></script>
      <script defer src="../auth.js"></script>
      <script defer src="../authFb.js"></script>
    </main>
  );
};
