import AdminDashboard from "@/components/admin-dashboard/admin";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";



export default function AdminPage () {
    return (
        <div className="  bg-amber-50">
            <div className="flex justify-end mb-4">
            <Link 
            href="/FormProduct"
            className={buttonVariants({ variant: "outline", size: "lg",  })}
            >Crear Producto</Link>
            </div>
            <AdminDashboard/>
        </div>
    )
}