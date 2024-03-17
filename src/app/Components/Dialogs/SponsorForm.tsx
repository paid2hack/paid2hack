import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../UI/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/app/Components/UI/Form/form';
import { Input } from '~/app/Components/UI/Form/input';

export const sponsorFormSchema = z.object({
  name: z.string().min(1).max(40, {
    message: 'Sponsor name must be between 1 and 40 characters.',
  }),
});

export function SponsorForm({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof sponsorFormSchema>) => void;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof sponsorFormSchema>>({
    resolver: zodResolver(sponsorFormSchema),
    defaultValues: {
      name: '',
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sponsor Name</FormLabel>
              <FormControl>
                <Input placeholder="Sponsor name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the sponsor.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Become a sponsor</Button>
      </form>
    </Form>
  );
}
