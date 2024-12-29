import React, { ReactNode } from "react";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full p-3 xxs:p-6 flex flex-col items-center">
      {children}
    </main>
  );
};

export default LayoutWrapper;
