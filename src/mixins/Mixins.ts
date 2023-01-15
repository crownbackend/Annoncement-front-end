export default {
    methods: {
        setDocumentTitle(str: string) {
            window.document.title = `${str}`;
        },
        formatDate(str: any) {
            const date = new Date(str);
            const dateStr =
                ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
                ("00" + date.getDate()).slice(-2) + "/" +
                date.getFullYear() + " à " +
                ("00" + date.getHours()).slice(-2) + ":" +
                ("00" + date.getMinutes()).slice(-2);
            return dateStr;
        }
    },
};
