import {useParams} from "react-router-dom";

import DocumentList from "@/components/pages/user/documents/documentList/DocumentList.tsx";

function UserDocuments() {
    const { userId} = useParams();

    return (
        <DocumentList userId={userId} />
    );
}

export default UserDocuments;