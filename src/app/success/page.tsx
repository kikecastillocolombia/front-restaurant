// pages/unauthorized.tsx
import SuccessComponent from "@/components/componentsPaypal/successComponent";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">
          No tienes permisos para acceder a esta página
        </h1>
        <SuccessComponent />
      </div>
    </div>
  );
}

