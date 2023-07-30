'use client'
import { useRouter } from 'next/navigation'
import { Alert, Button, Label, Select, TextInput } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi';
import { useState } from 'react'
import StopSelectors from '@/components/StopSelector'
import _ from 'lodash'

export default function Home() {
    const router = useRouter()
    const [stopIds, setStopIds] = useState<string[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const endpoint = '/api/connection/add'

        const data = {
            name: event.target.name.value,
            slug: _.kebabCase(event.target.name.value),
            stops: stopIds
        }

        const JSONdata = JSON.stringify(data)

        console.log(data)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        if (response.ok){
            router.push('/connections')
            return
        }

        setError('Server Error')
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                <div className='mt-10'>
                    {error != null &&
                        <Alert color="failure" icon={HiInformationCircle}>{error}</Alert>
                    }
                    <div className="m-2 block">
                        <Label
                            htmlFor="name"
                            value="Name of Connection"
                        />
                        <TextInput
                            id="name"
                            placeholder="eg To Work"
                            required
                            type="string"
                        />
                    </div>
                </div>
                <StopSelectors setStopIds={setStopIds} stopIds={stopIds} />
                <Button type="submit">
                    Save
                </Button>
            </form>
        </div>
    )
}