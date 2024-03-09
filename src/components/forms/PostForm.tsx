
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea";

import FileUploader from "../shared/FileUploader";

import { PostValidation as formSchema } from '@/lib/validations';
import { Models } from "appwrite";
import { useCreatePostMutation, useUpdatePostMutaion } from "@/lib/react-query/queryAndMutations";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";


type PostFormProps = {
  post?: Models.Document,
  action: "Create" | "Update";
}

const PostForm = ({ post, action }: PostFormProps) => {

  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { mutateAsync: createNewPost, isPending: isLoadingCreate } = useCreatePostMutation();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePostMutaion();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: (post) ? post?.caption : "",
      file: [],
      location: (post) ? post?.location : "",
      tags: (post) ? post?.tags.join(',') : ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {


    if (post && action === "Update") {

      console.log("Updating Post");

      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl
      })

      if (!updatedPost) {
        toast({
          title: "Update failed. Please try again!!"
        })
      } else {
        console.log("UpdatedPost", updatedPost);
        toast({
          title: "Post updated successfylly."
        })
        navigate(`/post/${post.$id}`);
      }

      return;
    }

    const newPost = await createNewPost({ ...values, userId: user.id });
    // await createNewPost({ ...values, userId: user.id });


    // console.log("new Post", newPost);
    if (newPost) {
      toast({ title: "Post created successfully." });
      navigate("/");
    } else {
      toast({ title: "Something wents wrong. Please try again!!" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea {...field} className="shad-textarea custom-scrollbar" />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add photo</FormLabel>
              <FormControl>
                <FileUploader

                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (saperated by comma " , ")</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="@melu, @harish, @jage, @ramraj" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-center items-center">

          <Button type="button" className="shad-button_dark_4">Cancel</Button>
          <Button type="submit" className="shad-button_primary whitespace-nowrap" disabled={isLoadingCreate || isLoadingUpdate}>
            {isLoadingCreate || isLoadingUpdate && "Loading..."}
            {action}    Post</Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm
