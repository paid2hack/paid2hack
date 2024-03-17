import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Form } from "react-hook-form";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./Form/form";
import { Button } from "./button";
import { Input } from "./Form/input";

export const allocatePrizeFormSchema = z.object({
  amount: z.string(),
});

export function AddFundsForm({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof allocatePrizeFormSchema>) => void;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof allocatePrizeFormSchema>>({
    resolver: zodResolver(allocatePrizeFormSchema),
    defaultValues: {
      amount: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          amount="event"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add funds</FormLabel>
              <FormControl>
                <Input placeholder="No. of tokens" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add funds</Button>
      </form>
    </Form>
  );

  // // 1. Define your form.
  // const form = useForm<z.infer<typeof allocatePrizeFormSchema>>({
  //   resolver: zodResolver(allocatePrizeFormSchema),
  //   defaultValues: {
  //     amount: '',
  //   },
  // });

  // return (
  //   <Form {...form}>
  //     <form
  //       onSubmit={form.handleSubmit((data) => onSubmit(data))}
  //       className="space-y-8"
  //     >
  //       <FormField
  //         control={form.control}
  //         name="amount"
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Funding Amount</FormLabel>
  //             <FormControl>
  //               <Input
  //                 type="string"
  //                 placeholder="Enter the funding amount"
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormDescription>
  //               Specify the number of tokens to add as funds.
  //             </FormDescription>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />

  //       <Button type="submit">Add funds</Button>
  //     </form>
  //   </Form>
  // );
}
