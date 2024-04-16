import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import FileUploader from '../shared/FileUploader'
import { PostValidation } from '@/lib/validate'
import { createNewPost } from '@/lib/appwrite/api'
import { useUserContext } from '@/context/AuthContext'
import { useCreateNewPost } from '@/lib/react-query/queryAndMutaion'
import { useNavigate } from 'react-router-dom'



function PostForm({post}:any) {

  const { user } = useUserContext();
  // Query

  const {mutateAsync : createNewPost} = useCreateNewPost();
  const formSchema = z.object({
    caption: z.string().min(2).max(50),
  })
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: "",
      file: [],
      location:"",
      tags:"",
      userId:user.id,
    },
  })
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(user.id);
    const newPost = await createNewPost({
      ...values,
      userId: user.id,
    });

    
  }
  return (

    
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-9 w-full  max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Caption</FormLabel>
            <FormControl>
              <Textarea
                className="shad-textarea custom-scrollbar"
                {...field}
              />
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
            <FormLabel className="shad-form_label">Add Photos</FormLabel>
            <FormControl>
              <FileUploader 

              fieldChange = {field.onChange}// th cha truyen du lieu xuong th con
              //postform -> data -> fileupload

            
              mediaUrl = {post?.imageUrl} />
               
              
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
            <FormLabel className="shad-form_label">
              Add Tags (separated by comma " , ")
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Art, Expression, Learn"
                type="text"
                className="shad-input"
                {...field}
              />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />

      <div className="flex gap-4 items-center justify-end">
        <Button
          type="button"
          className="shad-button_dark_4"
          onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="shad-button_primary whitespace-nowrap"
        > Post
        </Button>
      </div>
    </form>
  </Form>

    
  )
}

export default PostForm