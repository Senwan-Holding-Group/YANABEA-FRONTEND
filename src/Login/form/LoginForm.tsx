import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginRequest } from "@/lib/formsValidation";

import { useAuth } from "@/api/Auth/useAuth";
import { login } from "@/api/client";
import { useNavigate } from "react-router-dom";
import {
  faSpinner,
  faLockKeyhole,
  faLockKeyholeOpen,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import loginLogo from "/LoginLogo.svg"
 
const LoginForm = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (values: LoginRequest) => {
    return login(values, setToken, navigate, form);
  };

  return (
    <div className="bg-white shadow h-[40rem] drop-shadow-2xl  drop-shadow-[#8D8D8E24] w-[25rem] rounded-xl pt-3.5 pb-6 px-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col  justify-between h-full">
          <div className="space-y-10">
            <div className="flex  justify-center">
              <img src={loginLogo} alt="YB Logo" />
            </div>
            <div className="flex flex-col  gap-y-6">
              <Label className="text-base  leading-[100%] font-semibold text-Primary-500 ">
                Welcome to Yanabea collecting app
              </Label>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel className="text-sm pl-2 leading-[100%] flex text-Black gap-x-1 font-bold ">
                      Username
                      <FormMessage className="leading-[100%]" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="username"
                        placeholder="Write your Username"
                        className="h-10  w-[22rem] border bg-Primary-25 placeholder:text-Gray-800 placeholder:font-normal placeholder:text-sm placeholder:leading-[100%] px-4 py-2 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel className="flex pl-2  leading-[100%] text-Black text-sm gap-x-1 font-bold">
                      Password
                      <FormMessage className="leading-[100%]"/>
                    </FormLabel>
                    <FormControl>
                      <div className="flex relative ">
                        <Input
                          autoComplete="current-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Write your Password"
                          className="h-10 mb-6 w-[22rem] border bg-Primary-25 placeholder:text-Gray-800 placeholder:font-normal placeholder:text-sm placeholder:leading-[100%] px-4 py-2 rounded-xl"
                          {...field}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute cursor-pointer right-4 flex text-Primary-400 items-center justify-center  top-0.5 size-9  ">
                          <FontAwesomeIcon
                            icon={
                              showPassword ? faLockKeyholeOpen : faLockKeyhole
                            }
                          />
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {form.formState.errors.root && (
            <div className="text-center w-full text-sm h-32 rounded-lg border text-Error-600 overflow-scroll border-Error-500 bg-Error-100  p-2">
              {form.formState.errors.root.message}
            </div>
          )}
          <Button
            disabled={form.formState.isSubmitting}
            className="w-[22rem] disabled:opacity-50  hover:bg-Primary-600 rounded-2xl bg-Primary-500">
            {form.formState.isSubmitting && (
              <FontAwesomeIcon className="" icon={faSpinner} spin />
            )}
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
