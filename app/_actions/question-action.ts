"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { ReplyQuestionForm, deleteQuestionFormSchema, replyQuestionFormSchema } from "@/_lib/form-schema"
import { IQuestion } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllQuestions = async () => {
    const res = await FETCH.get<IQuestion[]>(API_ROUTES.QUESTION.GET_QUESTIONS, {
        next: {
            tags: [CACHE_KEY.QUESTION.GET_ALL]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const replyQuestion = safeAction
    .metadata({
        actionName: "Reply Question"
    })
    .schema(replyQuestionFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put<ReplyQuestionForm>(
            API_ROUTES.QUESTION.REPLY_QUESTION.replace(":id", parsedInput._id),
            parsedInput,
            {
                cookies
            }
        )
        if (res.success) revalidateTag(CACHE_KEY.QUESTION.GET_ALL)
        return res
    })

export const deleteQuestion = safeAction
    .metadata({
        actionName: "Delete Question"
    })
    .schema(deleteQuestionFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.delete(API_ROUTES.QUESTION.DELETE_QUESTION.replace(":id", parsedInput), {
            cookies
        })
        if (res.success) revalidateTag(CACHE_KEY.QUESTION.GET_ALL)
        return res
    })
