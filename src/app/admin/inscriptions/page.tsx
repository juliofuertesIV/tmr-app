import { getCollection } from "@/lib/fetch/get"
import { IContest } from "@/types"
import Link from "next/link"
import { ArrowRight } from "../_layout/design/icons/components/ArrowRight"

export default async function InscriptionsPage() {

    const { data: contests } = await getCollection('contests') as { data: IContest[] }

    return (
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-neutral-950">
            <section className="flex flex-col gap-2 w-full max-w-2xl">
                <header className="py-8">
                    <h1 className="capitalize">INSCRIPCIONES</h1>
                </header>
                <div>
                    {
                        contests.map((contest, index) => {
                            return (
                                <Link 
                                    className="flex w-full justify-center items-center gap-2 bg-neutral-200 text-neutral-800 hover:bg-green-500" 
                                    key={ index }
                                    href={ `/admin/inscriptions/${contest.id.toString()}` }
                                >
                                    <span>{ contest.name } ({ contest.year })</span>
                                    <span><ArrowRight/></span>
                                </Link>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}
