/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { z } from "zod";

// Zod Schemas for Validation
const BudgetCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  amount: z.number().positive("Amount must be positive"),
  limit: z.number().positive("Limit must be positive").optional(),
});

const BudgetSchema = z.object({
  totalIncome: z.number().positive("Total income must be positive"),
  month: z.number().min(1).max(12),
  year: z.number().min(2000).max(2100),
  interestRate: z.number().min(0).max(100).optional().default(0),
  categories: z.array(BudgetCategorySchema),
});

// Server Action for Creating Budget
export async function createBudget(formData: z.infer<typeof BudgetSchema>) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Validate input
  const validatedData = BudgetSchema.parse(formData);

  // Calculate total category allocation
  const totalCategoryAllocation = validatedData.categories.reduce(
    (sum, category) => sum + category.amount,
    0
  );

  if (totalCategoryAllocation > validatedData.totalIncome) {
    throw new Error("Total category allocation cannot exceed total income");
  }

  try {
    const budget = await prisma.budget.create({
      data: {
        userId: session.user.id,
        totalIncome: validatedData.totalIncome,
        month: validatedData.month,
        year: validatedData.year,
        interestRate: validatedData.interestRate || 0,
        categories: {
          create: validatedData.categories.map((category) => ({
            name: category.name,
            amount: category.amount,
            limit: category.limit,
          })),
        },
      },
      include: {
        categories: true,
      },
    });

    return budget;
  } catch (error) {
    console.error("Budget creation error:", error);
    throw new Error("Failed to create budget");
  }
}

// Server Action for Retrieving Budget
export async function getBudgetByMonthAndYear(month: number, year: number) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const budget = await prisma.budget.findUnique({
      where: {
        userId_month_year: {
          userId: session.user.id,
          month,
          year,
        },
      },
      include: {
        categories: {
          include: {
            transactions: true,
          },
        },
      },
    });

    return budget;
  } catch (error) {
    console.error("Budget retrieval error:", error);
    throw new Error("Failed to retrieve budget");
  }
}

// Server Action for Updating Budget Category
export async function updateBudgetCategory(
  categoryId: string,
  updateData: Partial<z.infer<typeof BudgetCategorySchema>>
) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Partial validation
  const validatedData = BudgetCategorySchema.partial().parse(updateData);

  try {
    const updatedCategory = await prisma.budgetCategory.update({
      where: { id: categoryId },
      data: validatedData,
    });

    return updatedCategory;
  } catch (error) {
    console.error("Category update error:", error);
    throw new Error("Failed to update budget category");
  }
}

// Projection Calculation Function
export function calculateYearlyProjection(
  monthlyIncome: number,
  interestRate: number
) {
  const totalAnnualIncome = monthlyIncome * 12;
  const projectedTotal = totalAnnualIncome * (1 + interestRate / 100);

  return {
    totalAnnualIncome,
    projectedTotal,
    interestEarned: projectedTotal - totalAnnualIncome,
  };
}
