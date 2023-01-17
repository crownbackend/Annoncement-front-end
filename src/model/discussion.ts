import Ad from "@/model/ad";
import Message from "@/model/message";

export default interface Discussion {
    id: number;
    createdAt: string;
    ad: Ad
    messages: Message[]
}
