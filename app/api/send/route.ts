import { prisma } from "@/lib/prisma";
import { Favourite, Recommend, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const data = await prisma.options.findMany({
            select: {
            name: true,
            description: true
        }
    });
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const user = await request.json();

    const existingUser = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })

    if(existingUser){
        console.log("User already exists")
        return NextResponse.json({message: "User already exists."}, {status: 400})
    }

    const res = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            age: user.age,
            role: user.role,
            recommend: user.recommend,
            favourite: user.favourite,
            comment: user.comment
        }
    });

    if(user.improve){
        for(const option of user.improve){
            const optionId = await prisma.options.findFirst({
                where: {
                    name: option
                },
                select: {
                    id: true
                }
            });
            if(optionId){
                const improve_res = await prisma.improve.create({
                    data: {
                        userId: res.id,
                        optionId: optionId.id
                    }
                })
            }
        }
    }
    console.log("User: ", user);
    return NextResponse.json(res, {status: 200});
}

