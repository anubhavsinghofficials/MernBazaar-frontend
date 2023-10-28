
import {z} from 'zod'


export const zodSellerSignupSchema = z.object({

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

    description     : z.string()
                    .trim()
                    .nonempty("Description required")
                    .max(200,"Description should not exceed length 70")
                    .min(10,"Description should be atleast length 10"),

    address         : z.string()
                    .trim()
                    .nonempty("Address required")
                    .max(100,"Address should not exceed length 70")
                    .min(10,"Address should be atleast length 10"),
})

export const zodSellerLogInSchema = zodSellerSignupSchema.pick({ email: true, password:true });
export type SellerSignUpFormType = z.infer<typeof zodSellerSignupSchema>
export type SellerLogInFormType = z.infer<typeof zodSellerLogInSchema>
// export type SellerSignInFormType = Omit<SellerSignUpFormType,"name">