import City from '@/model/city'
import Category from "@/model/category";
import User from "@/model/user";
export default interface Ad {
    id: number;
    name: string;
    price: number;
    description: string;
    createdAt: Date
    city: City;
    category: Category;
    user: User
}
