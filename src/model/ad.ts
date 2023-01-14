import City from '@/model/city'
import Category from "@/model/category";
import User from "@/model/user";
import Image from "@/model/image";
export default interface Ad {
    id: number;
    name: string;
    price: number;
    description: string;
    telephone: string;
    createdAt: Date
    city: City;
    category: Category;
    user: User;
    images: Image[]
}
