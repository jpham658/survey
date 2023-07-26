import Link from "next/link";

export default function Thanks() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-48">
                <div className="flex flex-col items-center justify-between">
                    <p className="bg-red-200">Thanks for submitting the form!<br/></p>
                    <Link href="/form" className="text-blue-500">Click here to submit another form</Link>
                </div>
            </main>
        </>
    );
}