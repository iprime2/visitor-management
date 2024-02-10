import { getAttendees } from "@/actions/getAttendees";
import BodyWrapper from "@/components/BodyWrapper";
import EntryForm from "@/components/EntryForm";
import FeedbackModal from "@/components/modal/FeedbackModal";

type attendeeType = {
  id: string;
  name: string;
};

const AdminVisitorsPage = async () => {
  const attendees: attendeeType[] | null | undefined = await getAttendees();

  return (
    <BodyWrapper>
      <FeedbackModal />
      <div>
        <EntryForm attendees={attendees} />
      </div>
    </BodyWrapper>
  );
};

export default AdminVisitorsPage;
