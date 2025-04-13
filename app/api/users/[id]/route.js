import { NextResponse } from "next/server";

const users =[
    {
        id:1,
        fullName:"Elxan Meheremli",
        salary:5000,
        level:6
    },
    {
        id:2,
        fullName:"Fuad Mikayilov",
        salary:3000,
        level:4
    }
]
 export async function GET(req,{params}) {
    const {id} = await params
    const user = users.find(item=> item.id == id)
    if (!user) {
        return NextResponse.json({mes:"user not found"},{status:404})

    }
    return NextResponse.json({mes:"THIS IS GET  BY ID METOD (USERS)",data:user},{status:200})
 }