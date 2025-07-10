import DocumentList from "@/components/common/documentList/DocumentList.tsx";
import {useParams} from "react-router-dom";

function UserDocuments() {
    const { userId} = useParams();

    return (
        <DocumentList userId={userId} />
    );
}

export default UserDocuments;