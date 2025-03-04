"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Zod Schema for Budget Creation
const budgetSchema = z.object({
  totalIncome: z.coerce
    .number()
    .positive("Total income must be a positive number"),
  month: z.coerce.number().min(1, "Month is required").max(12, "Invalid month"),
  year: z.coerce
    .number()
    .min(2000, "Year must be 2000 or later")
    .max(2100, "Invalid year"),
  interestRate: z.coerce
    .number()
    .min(0, "Interest rate cannot be negative")
    .max(100, "Interest rate cannot exceed 100")
    .default(0),
  categories: z
    .array(
      z.object({
        name: z.string().min(1, "Category name is required"),
        amount: z.coerce.number().positive("Category amount must be positive"),
        limit: z.coerce.number().positive("Limit must be positive").optional(),
      })
    )
    .refine(
      (categories) => {
        const totalCategoryAmount = categories.reduce(
          (sum, category) => sum + category.amount,
          0
        );
        return totalCategoryAmount > 0;
      },
      { message: "At least one category is required" }
    ),
});

const defaultCategory = {
  name: "",
  amount: 0,
  limit: undefined,
};

export function BudgetCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with React Hook Form and Zod resolver
  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      totalIncome: undefined,
      month: new Date().getMonth() + 1, // Default to current month
      year: new Date().getFullYear(), // Default to current year
      interestRate: 0,
      categories: [defaultCategory],
    },
  });

  // Manage dynamic categories
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof budgetSchema>) => {
    setIsSubmitting(true);

    try {
      // Total category validation
      const totalCategoryAmount = data.categories.reduce(
        (sum, category) => sum + category.amount,
        0
      );
      if (totalCategoryAmount > data.totalIncome) {
        toast.error("Total category allocation cannot exceed total income");
        return;
      }

      const budgetData = {
        ...data,
        interestRate: data.interestRate ?? 0,
      };
      console.log("budgetdata", budgetData);

      const response = await fetch("/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(budgetData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      if (result) {
        toast.success("Budget created successfully!");
        form.reset(); // Reset form after successful submission
      }
    } catch (error) {
      console.error("Budget creation error:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Months array for dropdown
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Total Income */}
          <FormField
            control={form.control}
            name="totalIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Monthly Income</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter total monthly income"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Month Selector */}
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Year Input */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interest Rate */}
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Optional interest rate"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional: Interest rate for investment projection
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dynamic Categories Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Budget Categories</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append(defaultCategory)}
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Add Category
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
              <FormField
                control={form.control}
                name={`categories.${index}.name`}
                render={({ field: categoryField }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Groceries" {...categoryField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`categories.${index}.amount`}
                render={({ field: amountField }) => (
                  <FormItem>
                    <FormLabel>Allocated Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Amount"
                        {...amountField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name={`categories.${index}.limit`}
                  render={({ field: limitField }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Optional Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Limit"
                          {...limitField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="mt-6"
                    onClick={() => remove(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submission Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating Budget..." : "Create Budget"}
        </Button>
      </form>
    </Form>
  );
}
