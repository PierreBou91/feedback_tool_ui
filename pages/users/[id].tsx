import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const User = (props: Props) => {
    const router = useRouter()
    const { id } = router.query

    const user = useQuery(["user"], async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/users/" + id);
        return await response.json();
    })

    if (user.status === "success") {
        return (
            <div className='container'>
                <h1>{user.data.title}</h1>
                <h2>{user.data.createdAt}</h2>
                <h2>{user.data.status}</h2>
                <p>{user.data.description}</p>
            </div>
        )
    }
}

export default User