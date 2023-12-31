
import {z} from 'zod'


export const zodUserSignupSchema = z.object({

    name            :z.string()
                    .trim()
                    .nonempty("Name Required")
                    .max(16,"Name should not exceed length 16")
                    .min(3,"Name should be atleast length 3"),

    email           : z.string()
                    .trim()
                    .nonempty("Email Required")
                    .email("Enter valid email"),

    password        : z.string()
                    .trim()
                    .nonempty("Password required")
                    .max(10,"Password should not exceed length 10")
                    .min(6,"Password should be atleast length 6"),
})

export const zodUserLogInSchema = zodUserSignupSchema.omit({ name: true });
export type UserSignUpFormType = z.infer<typeof zodUserSignupSchema>
export type UserLogInFormType = z.infer<typeof zodUserLogInSchema>
// export type UserSignInFormType = Omit<UserSignUpFormType,"name">