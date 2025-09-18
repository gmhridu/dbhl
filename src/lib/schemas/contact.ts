import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),

  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-\(\)]/g, "")),
      {
        message: "Please enter a valid phone number",
      },
    ),

  company: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 100, {
      message: "Company name must be less than 100 characters",
    }),

  department: z
    .enum(["sales", "support", "billing", "general", "partnership"])
    .refine((val) => !!val, "Please select a department"),

  subject: z
    .string()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),

  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),

  captchaAnswer: z
    .number()
    .or(z.string().transform((val) => parseInt(val, 10)))
    .refine((val) => !isNaN(val), "Please provide a valid CAPTCHA answer"),

  captchaTimestamp: z
    .number()
    .or(z.string().transform((val) => parseInt(val, 10)))
    .refine((val) => !isNaN(val), "Invalid CAPTCHA timestamp"),

  captchaHash: z.string().min(1, "CAPTCHA hash is required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Schema for the API response
export const contactResponseSchema = z.object({
  message: z.string(),
  contact: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    subject: z.string(),
    createdAt: z.date(),
  }),
});

// Schema for fetching contacts (admin use)
export const getContactsQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, "Page must be greater than 0"),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, "Limit must be between 1 and 100"),

  search: z.string().optional(),

  department: z
    .enum(["sales", "support", "billing", "general", "partnership"])
    .optional(),

  isRead: z
    .string()
    .optional()
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : undefined,
    ),
});

export type GetContactsQuery = z.infer<typeof getContactsQuerySchema>;
