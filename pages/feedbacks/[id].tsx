import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const Feedback = (props: Props) => {
    const router = useRouter()
    const { id } = router.query

    const feedback = useQuery(["feedback"], async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/feedbacks/" + id);
        return await response.json();
    })

    if (feedback.status === "success") {
        return (
            <div className='container'>
                <h1>{feedback.data.title}</h1>
                <h2>{feedback.data.createdAt}</h2>
                <h2>{feedback.data.status}</h2>
                <p>{feedback.data.description}</p>
            </div>
        )
    }
}

export default Feedback