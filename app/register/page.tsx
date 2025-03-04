import LayoutWrapper from "@/components/layout-wrapper";
import RegisterForm from "@/module/onboard/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <LayoutWrapper className="flex items-center flex-col gap-y-6">
      <RegisterForm />
    </LayoutWrapper>
  );
};

export default RegisterPage;
