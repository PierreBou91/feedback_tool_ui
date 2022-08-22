import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const Company = (props: Props) => {
    const router = useRouter()
    const { id } = router.query

    const company = useQuery(["company"], async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/companys/" + id);
        return await response.json();
    })

    if (company.status === "success") {
        return (
            <div className='container'>
                <h1>{company.data.title}</h1>
                <h2>{company.data.createdAt}</h2>
                <h2>{company.data.status}</h2>
                <p>{company.data.description}</p>
            </div>
        )
    }
}

export default Company