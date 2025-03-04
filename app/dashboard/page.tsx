import LayoutWrapper from "@/components/layout-wrapper";
import { BudgetCreationForm } from "@/module/budget/budget-form";
import React from "react";

const DashboardPage = () => {
  return (
    <LayoutWrapper className="flex items-center flex-col gap-y-6">
      <BudgetCreationForm />
    </LayoutWrapper>
  );
};

export default DashboardPage;
