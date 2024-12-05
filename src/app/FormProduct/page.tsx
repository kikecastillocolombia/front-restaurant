import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "../../components/product-form/product-form"

function ProductsNewPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
            <CardTitle>
                Nuevo Producto
            </CardTitle>
        </CardHeader>
        <CardContent>
            <ProductForm/>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductsNewPage
