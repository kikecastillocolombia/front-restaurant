"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { createProduct } from "@/lib/products.api";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { IProduct, IProductCategory, IProductSubcategory } from "@/interfaces/interfaces";


const categories = [
  IProductCategory.PlatosPrincipales,
  IProductCategory.Pasteleria,
  IProductCategory.Postres,
  IProductCategory.Tragos,
];

const subcategories = [
  IProductSubcategory.Mediterranea,
  IProductSubcategory.Oriental,
  IProductSubcategory.Occidental,
  IProductSubcategory.LatinoAmericano,
  IProductSubcategory.Indio,
  IProductSubcategory.Tropical,
  IProductSubcategory.Bebidas,
];


export function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProduct>();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const uploadToServer = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/FormProduct/api", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir la imagen");
      const result = await response.json();
      return result.url; // URL de la imagen en Cloudinary
    } catch (error) {
      toast.error("Error al subir la imagen.");
      console.error(error);
      return null;
    }
  };

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    if (!file) {
      toast.error("Por favor selecciona una imagen antes de enviar.");
      return;
    }

    const uploadedUrl = await uploadToServer(file);
    if (!uploadedUrl) return;

    const formattedData = {
      ...data,
      images: uploadedUrl,
    };

    try {
      await createProduct(formattedData);
      toast.success("Producto creado exitosamente.");
      router.push("/Menu");
    } catch (error) {
      toast.error("Hubo un error al crear el producto.");
    }
  };

  useEffect(() => {
    // Mostrar errores en tiempo real
    Object.keys(errors).forEach((key) => {
      toast.error((errors as any)[key]?.message);
    });
  }, [errors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "500px", margin: "0 auto" }}
      className="space-y-4"
    >
      <ToastContainer />
      {/* Nombre del producto */}
      <div>
        <Label htmlFor="name">Nombre de Producto</Label>
        <Input
          id="name"
          {...register("name", { required: "Este campo es obligatorio" })}
          placeholder="Ingrese el nombre"
        />
      </div>

      {/* Precio */}
      <div>
        <Label htmlFor="price">Precio</Label>
        <Input
          id="price"
          type="number"
          {...register("price", {
            required: "Este campo es obligatorio",
            valueAsNumber: true,
            min: 0.01,
          })}
          placeholder="Ingrese el precio"
        />
      </div>

      {/* Imagen */}
      <div>
        <Label htmlFor="images">Imagen</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      {/* Duración */}
      <div>
        <Label htmlFor="duration">Duración</Label>
        <Input
          id="duration"
          {...register("duration", { required: "Este campo es obligatorio" })}
          placeholder="Ingrese la duración (en minutos)"
        />
      </div>

      {/* Descripción */}
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Input
          id="description"
          {...register("description", { required: "Este campo es obligatorio" })}
          placeholder="Ingrese la descripción"
        />
      </div>

      {/* Categoría */}
      <div>
        <Label htmlFor="category">Categoría</Label>
        <Select
          onValueChange={(value) => setValue("category", value as IProductCategory)}
          defaultValue=""
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subcategoría */}
      <div>
        <Label htmlFor="subcategory">Subcategoría</Label>
        <Select
          onValueChange={(value) => setValue("subcategory", value as IProductSubcategory)}
          defaultValue=""
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una subcategoría" />
          </SelectTrigger>
          <SelectContent>
            {subcategories.map((subcategory) => (
              <SelectItem key={subcategory} value={subcategory}>
                {subcategory}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Botón de envío */}
      <Button
        className={buttonVariants({ variant: "outline", size: "lg" })}
        type="submit"
      >
        Crear Producto
      </Button>
    </form>
  );
}
