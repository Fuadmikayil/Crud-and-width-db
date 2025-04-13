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
    },
    {
        id:3,
        fullName:"Yasemen Memmedli",
        salary:3000,
        level:4
    }
]
 export async function GET(req) {
    return NextResponse.json({mes:"THIS IS GET METOD (USERS)",data:users},{status:200})
 }

 export async function POST(req) {
    const body = await req.json()
    const {id} = body
    console.log(id);
    const user = users.find(user=> user.id == id)
    
    if (!user) {
    return NextResponse.json({mes:"user not found"},{status:404})
        
    }
    return NextResponse.json({mes:"THIS IS POST (USERS)",data:user})
 }
 export async function DELETE(req) {
    const body = req.json()
    const {id} = body
    const findUser = users.find(user => user.id != id)
    if (!findUser) {
    return NextResponse.json({mes:"user not  found by id "},{status:404})
    }
    const newUsers = users.filter(user => user.id != id)

 }