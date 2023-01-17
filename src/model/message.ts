export default interface Message {
    id: number;
    content: string;
    createdAt: string;
    readAt?: string;
    senderId: number

}
