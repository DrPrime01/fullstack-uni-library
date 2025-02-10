"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "../../ui/form";
import { Input } from "../../ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";
import { createBook } from "@/lib/admin/actions/book";

interface Props extends Partial<BookListProps> {
  type: "create" | "update";
}

export default function BookForm(props: Props) {
  const { type, ...book } = props;

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values);

    if (result.success) {
      toast({
        title: "Success",
        description: "Book created successfully",
      });

      router.push(`/admin/books/${result.data.id}`);
    } else {
      toast({
        title: "Error",
        description: result?.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Book Title</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book Title"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Author</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book author"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Genre</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book genre"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Rating</FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Book rating"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Total Copies</FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  max={10000}
                  placeholder="Total copies"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Book Image</FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a book cover"
                  variant="light"
                  folder="books/covers"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Primary Color</FormLabel>
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onPickerChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book description"
                  className="book-form_input"
                  rows={10}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Book Trailer</FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/*"
                  placeholder="Upload a book trailer"
                  variant="light"
                  folder="books/videos"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500">Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book summary"
                  className="book-form_input"
                  rows={5}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="book-form_btn text-white">
          Add Book to Library
        </Button>
      </form>
    </Form>
  );
}
